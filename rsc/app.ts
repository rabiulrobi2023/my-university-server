import express, { NextFunction, Request, Response } from "express";
const app = express();

//=====================Parser===================
app.use(express.json());
app.use(express.text());

//=====================Middleware===============
const middleware1 = (req: Request, res: Response, next: NextFunction) => {
  console.log("This is a middleware");
  next();
};

//=====================Routers==================
const userRouter = express.Router();
const studentRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);

//=====================Operations===============
userRouter.post("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "User created sucessfull",
    data: user,
  });
});

studentRouter.get("/", (req: Request, res: Response) => {
  const student = req.body;
  console.log(student);
  res.json({
    success: true,
    message: "Student fetched sucessfull",
    data: student,
  });
});
export default app;
