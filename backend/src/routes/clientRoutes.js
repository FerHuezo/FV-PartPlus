import express from "express";
import clientController from "../controllers/clientController.js";

const router = express.Router();

router
  .route("/")
  .get(clientController.getAllClients)
  .post(clientController.postClients);

router
  .route("/:id")
  .get(clientController.getClientsById)
  .put(clientController.putClients)
  .delete(clientController.deleteClients);

export default router;
