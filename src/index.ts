import express, { Router } from "express";
import http from "http";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import connect from "./connectDb";
import add from "./routes/add"
import allot from "./routes/allot"
import cancel from "./routes/cancel"
const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
connect();
app.use("/add/", add)
app.use("/allot", allot)
app.use("/cancel",cancel)

const server = http.createServer(app);
server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

