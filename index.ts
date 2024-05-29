import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { useErrorHandler, useNotFound } from "./middlewares/";
import corsOptions from "./utils/corsOptions";
import logger from "./utils/logger";
import accessLogStream from "./utils/accessLog";
dotenv.config();

const PORT = process.env.PORT || 2800;
const app = express();
const morganConfig =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json({}));
app.use(morgan(morganConfig, { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(useNotFound);
app.use(useErrorHandler);

export const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
