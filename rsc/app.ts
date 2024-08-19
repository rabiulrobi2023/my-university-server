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
  try {
    const user = req.body;
    res.send("User created successfull");
    console.log(user);
  } catch {
    res.json({
      success: false,
      message: "Something error happened",
    });
  }
});

studentRouter.get("/", (req: Request, res: Response) => {
  try {
    const student = req.body;
    res.send("Student fatched successfull");
  } catch {
    res.json({
      success: true,
      message: "Something error happened",
    });
  }
});
export default app;
