import express, {urlencoded} from "express";
import helmet from "helmet";
import cors from 'cors';
import { mainRouter } from "./routers/userRouts.js";

const server = express();

server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.disable('x-powered-by');
server.use(express.json());

server.use(mainRouter)

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`O server está rodando em http://localhost:${port}`);
})


