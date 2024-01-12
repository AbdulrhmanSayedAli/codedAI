// import DBBuilder from "./server/builder/DBBuilder.js";
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import News from './server/models/news.js';
import User from './server/models/user.js';
import Project from './server/models/project.js';
import Result from './server/models/result.js';
import Plan from './server/models/plan.js';
import InviteToCompany from './server/models/inviteToCompany.js';
import InviteToWorkSpace from './server/models/inviteToWorkSpace.js';
import WorkSpace from './server/models/workSpace.js';
import WorkSpaceCopy from './server/models/workSpaceCopy.js';
import * as AdminJSSequelize from '@adminjs/sequelize';
import sequelize from './server/models/index.js';
import usersRouter from './server/routes/users/router.js';
import projectsRouter from './server/routes/projects/router.js';
import workspacesRouter from './server/routes/workspaces/router.js';
import cors from 'cors';
import Association from './server/models/assocations/assocations.js';
import bodyParser from 'body-parser';
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database
});

Association.associate();
const PORT = 3000;

const start = async () => {
  const app = express();
  app.use(bodyParser.json());
  const corsOpts = {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
  };

  app.use(cors(corsOpts));
  await sequelize.sync();

  const admin = new AdminJS({
    resources: [News, User, InviteToWorkSpace, WorkSpace, Project, Result, Plan, InviteToCompany, WorkSpaceCopy]
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.use('/api/users', usersRouter);
  app.use('/api/projects', projectsRouter);
  app.use('/api/workspaces', workspacesRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
