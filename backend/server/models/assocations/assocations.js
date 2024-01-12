import WorkSpace from '../workSpace.js';
import User from '../user.js';
import Plan from '../plan.js';
import InviteToWorkSpace from '../inviteToWorkSpace.js';
import InviteToCompany from '../inviteToCompany.js';
import WorkSpaceCopy from '../workSpaceCopy.js';
import Project from '../project.js';
import Result from '../result.js';
import CheckPoints from '../checkPoints.js';

class Assocation {
  static associate () {
    WorkSpace.belongsTo(User);
    User.hasMany(WorkSpace);

    User.hasMany(InviteToCompany);
    InviteToCompany.belongsTo(User);

    InviteToWorkSpace.belongsTo(WorkSpace);
    WorkSpace.hasMany(InviteToWorkSpace);

    User.belongsToMany(WorkSpace, { through: WorkSpaceCopy });
    WorkSpace.belongsToMany(User, { through: WorkSpaceCopy });

    WorkSpace.hasMany(Project);
    Project.belongsTo(WorkSpace);

    Project.hasMany(Result);
    Result.belongsTo(Project);
    CheckPoints.belongsTo(Project);

    Plan.hasMany(User, { foreignKey: 'planId' });
    User.belongsTo(Plan, { foreignKey: 'planId' });
  }
}

export default Assocation;
