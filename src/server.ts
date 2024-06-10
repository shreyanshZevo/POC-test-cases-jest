const express = require("express");
import { Request, Response } from "express";
import appRouter from "./router/CRUD";
import "./config/paths";
import { Client } from "pg";
// const { Client } = require("pg");

const app = express();

app.use(express.json());
// console.log(require.resolve("@controller/Delete/Delete.controller"));

const client = new Client({
  user: "ZevoAdmin2024",
  host: "dev-dbsrv.cmjkuhgflwrj.ap-south-1.rds.amazonaws.com",
  database: "appsettingdb",
  password: "Zevo2024100",
  port: 5432, // default PostgreSQL port
  ssl: {
    rejectUnauthorized: false,
  },
});

// var conString =
//   "pg://ZevoAdmin2024:Zevo2024100@dev-dbsrv.cmjkuhgflwrj.ap-south-1.rds.amazonaws.com:5432/appsettingdb";
// var client = new pg.Client(conString);
client.connect().then(() => console.log("hello"));

app.use("/users", appRouter);
app.get("/", (req: Request, res: Response) => res.send("hello"));

export default app;

app.listen(3000, () => console.log("gello"));
