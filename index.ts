import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { useErrorHandler, useNotFound, useRateLimiter } from "./middlewares/";
import corsOptions from "./utils/corsOptions";
dotenv.config();

const PORT = process.env.PORT || 2800;
const app = express();


app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(useRateLimiter);



app.use(useNotFound);
app.use(useErrorHandler);


export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
