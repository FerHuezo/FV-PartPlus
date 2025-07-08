// Importo todo lo de la libreria de Express
import express from "express";
import clientRoutes from "./src/routes/clientRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import cookieParser from "cookie-parser";

import cors from "cors";

import swaggerUi from "swagger-ui-express"
import fs from "fs"
import path from "path"

const app = express();

const corsOptions = {
    origin: "*",  
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
  app.use(cors(corsOptions));

//Que acepte datos en json
app.use(express.json());
app.use(cookieParser());

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./partplusdoc.json"), "utf-8")
);

app.use("/api/client", clientRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
