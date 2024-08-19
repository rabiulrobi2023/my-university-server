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
userRouter.post("/create-user",(req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      res.send("User created successfull");
      console.log(user);
    } catch (error) {
      next(error);
    }
  }
);

studentRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = req.body;
    res.send("Student fatched successfull");
  } catch (error) {
    next(error);
  }
});

//=====================Wrong API Error Handler===============
app.all("*", (req:Request, res:Response)=>{
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});



//=====================Global Error Handler===============
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default app;
