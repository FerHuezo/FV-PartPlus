import clientModel from "../models/Client.js";

const clientsController = {};

clientsController.getAllClients = async (req, res) => {
    try {
    const clients = await clientModel.find();
    res.status(200).json(clients);    
    } catch (error) {
        console.log("error: " + error);
        res.status(500).json({ message: "internal server error" });
    }
};

clientsController.getClientsById = async (req, res) => {
    try {
    const client = await clientModel.findById(req.params.id);
    res.status(200).json(client);    
    } catch (error) {
        console.log("error: " + error);
        res.status(500).json({ message: "internal server error" });
    }

};

clientsController.postClients = async (req, res) => {
    try {
      const { name, email, password, phone, age } = req.body;
  
      if (!name || !email || !password || !phone || !age) {
        return res.status(400).json({
          message: "Asegúrate de que todos los campos solicitados estén llenos",
        });
      }
  
      const existingClient = await clientModel.findOne({ email });
      if (existingClient) {
        return res.status(409).json({
          message: "Ya existe un cliente registrado con ese correo",
        });
      }
  
      const newClient = new clientModel({ name, email, password, phone, age });
      await newClient.save();
  
      res.status(201).json({
        message: "Cliente insertado exitosamente",
        client: newClient,
      });
    } catch (error) {
      console.error("error: " + error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };  

clientsController.deleteClients = async (req, res) => {
    try {
    const selectedClient = await clientModel.findByIdAndDelete(req.params.id);
    if (!selectedClient) {
        return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted" });
    } catch (error) {
        console.log("error: " + error);
        res.status(500).json({ message: "internal server error" });  
    }
};

clientsController.putClients = async (req, res) => {
    try {
    const { name, email, password, phone, age } = req.body;
    
    if(!name, !email, !password, !phone, !age){
        res.status(400).json({ message: "Asegurate que todos los campos solicitados esten llenos"});
    }

  await clientModel.findByIdAndUpdate(
    req.params.id,
    { name, email, password, phone, age },
    { new: true }
  );
  res.status(200).json({ message: "Client updated"});  
} catch (error) {
      console.log("error: " + error);
      res.status(500).json({ message: "internal server error" });
    }  
};

export default clientsController;
