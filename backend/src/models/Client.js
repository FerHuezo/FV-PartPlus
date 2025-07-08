/*
    Campos:
        name : string,
        email : string,
        password : string,
        phone : string,
        age : number
*/

import { Schema, model } from "mongoose";

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [4, "El nombre debe tener al menos 4 caracteres"],
      match: [/^[A-Za-zÁÉÍÓÚÑáéíóúñ]+$/, "El nombre solo puede contener letras"],
      trim: true,
    },

    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },

    phone: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{4}$/, "El teléfono debe tener el formato 1234-5678"],
    },

    age: {
      type: Number,
      required: true,
      min: [18, "Debe tener al menos 18 años"],
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("client", clientSchema);
