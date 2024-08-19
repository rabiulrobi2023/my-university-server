import express, { NextFunction, Request, Response } from "express";
const app = express();
const port: number = 3000;

//=====================Parser===================
app.use(express.json());
app.use(express.text());

//=====================Middleware===============
const middleware1 = (req: Request, res: Response, next: NextFunction) => {
  console.log("This is a middleware");
  next();
};

//=====================Operations===============
app.get("/", middleware1, (req: Request, res: Response) => {
  res.send("Hello my university");
  console.log("Data is founded");
});

app.post("/", middleware1, (req, res) => {
  res.send("Take your data");
  console.log("Data added successfull");
});
export default app;
