// import DBBuilder from "./server/builder/DBBuilder.js";
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import News from './server/models/news.js';
import * as AdminJSSequelize from '@adminjs/sequelize';
import sequelize from './server/models/index.js';
import usersRouter from './server/routes/users/router.js';
import projectsRouter from './server/routes/projects/router.js';
import workspacesRouter from './server/routes/workspaces/router.js';
import bodyParser from 'body-parser';
AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database
});

const PORT = 3000;

const start = async () => {
  const app = express();
  app.use(bodyParser.json());
  await sequelize.sync();

  const admin = new AdminJS({
    resources: [News]
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
