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
    User.hasMany(WorkSpace, { onDelete: 'CASCADE' });

    User.hasMany(InviteToCompany, { onDelete: 'CASCADE' });
    InviteToCompany.belongsTo(User);

    InviteToWorkSpace.belongsTo(WorkSpace);
    WorkSpace.hasMany(InviteToWorkSpace, { onDelete: 'CASCADE' });

    User.belongsToMany(WorkSpace, { through: WorkSpaceCopy });
    WorkSpace.belongsToMany(User, { through: WorkSpaceCopy });

    WorkSpace.hasMany(Project, { onDelete: 'CASCADE' });
    Project.belongsTo(WorkSpace);

    Project.hasMany(Result, { onDelete: 'CASCADE' });
    Project.hasMany(CheckPoints, { onDelete: 'CASCADE' });
    Result.belongsTo(Project);
    CheckPoints.belongsTo(Project);

    CheckPoints.hasMany(Result, { onDelete: 'CASCADE' });
    Result.belongsTo(CheckPoints);

    Plan.hasMany(User, { foreignKey: 'planId', onDelete: 'CASCADE' });
    User.belongsTo(Plan, { foreignKey: 'planId' });
  }
}

export default Assocation;
