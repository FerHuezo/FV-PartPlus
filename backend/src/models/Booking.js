/*
    Campos:
        clientId : objectId
        vehicle : string,
        service : string,
        status : string
*/

import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "client", 
      required: true,
    },

    vehicle: {
      type: String,
      required: true,
      minlength: [3, "El nombre del vehículo debe tener al menos 3 caracteres"],
      trim: true,
    },

    service: {
      type: String,
      required: true,
      minlength: [3, "El servicio debe tener al menos 3 caracteres"],
      match: [/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/, "El servicio solo puede contener letras y espacios"],
      trim: true,
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["pendiente", "en_proceso", "completado"],
        message: "Estado no válido: debe ser 'pendiente', 'en_proceso' o 'completado'",
      },
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("booking", bookingSchema);