// import DBBuilder from "./server/builder/DBBuilder.js";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import News from "./server/models/news.js"
import * as AdminJSSequelize from '@adminjs/sequelize'
import sequelize from "./server/models/index.js";


AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
})

const PORT = 3000;

const start = async () => {
  const app = express();
  await sequelize.sync();

  const admin = new AdminJS({
    resources : [News]
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();

// app.get("/build", (req, res) => {
//   try {
//     const data = {
//       models: [
//         {
//           User: {
//             columns: [
//               {
//                 name: "d2username1",
//                 type: "char",

//                 properties: {
//                   null: true,
//                   blank: true,
//                   default: "ss",
//                   max_length: 22,
//                   choices: ["ss", "Aa"],
//                   related_name: "S",
//                 },
//               },
//               {
//                 name: "car",
//                 type: "foreign_key",
//                 foreign_key: {
//                   to: "Car",
//                   on_delete: "CASCADE",
//                 },
//               },
//               {
//                 name: "car2",
//                 type: "one_to_one",
//                 one_to_one: {
//                   to: "Car",
//                   on_delete: "CASCADE",
//                 },
//               },{
//                 name: "car3",
//                 type: "many_to_many",
//                 many_to_many: {
//                   to: "Car",
//                 },
//               },
//             ],
//             timestambed:true,
//             isuser:true,
//             meta: {
//               db_table: "my_user_table",
//               ordering: "-created",
//               verbose_name: "asdasd",
//               verbose_name_plural: "asdasd",
//               abstract: false,
//             },
//           },
//         },
//         {
//           Car: {
//             columns: [
//               {
//                 name: "model",
//                 type: "char",
//               },
//             ],
//           },
//         },
//       ],
//     };
//     for (d of DBBuilder.build(data)){
//       console.log(d.code);
//     }
      
//     res.status(200).json({ result: DBBuilder.build(data) });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });