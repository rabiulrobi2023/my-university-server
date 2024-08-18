import express, { Request, Response } from "express";
const app = express();
const port: number = 3000;

//========Parser=========
app.use(express.json());
app.use(express.text());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello my university");
});

app.post("/", (req, res) => {
  const bodyData = req.body;
  console.log(bodyData);
  res.send("Data added successfull");
});
export default app;
