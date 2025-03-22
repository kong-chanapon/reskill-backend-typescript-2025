import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./config   /swagger.options";
import router from "./routers";
import "reflect-metadata";



const app = express();
const specs = swaggerJsdoc(swaggerOptions);

// middlewares
app.use(cors());
app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api", router);

export default app;
