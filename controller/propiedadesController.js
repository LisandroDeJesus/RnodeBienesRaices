import { validationResult } from "express-validator";
import Precio from "../models/Precio.js";
import Categoria from "../models/Categoria.js";

const obtenerCategoriasYPrecios = async () => {
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll()
  ]);
  return { categorias, precios };
};

const admin = (req, res) => {
  res.render("propiedades/admin", {
    pagina: "mis propiedades",
    barra: true
  });
};

const crear = async (req, res) => {
  const { categorias, precios } = await obtenerCategoriasYPrecios();
  res.render("propiedades/crear", {
    pagina: "Ingrese su Propiedad",
    barra: true,
    csrfToken: req.csrfToken(),
    categorias,
    precios
  });
};

const guardar = async (req, res) => {
  const resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    const { categorias, precios } = await obtenerCategoriasYPrecios();
    return res.render("propiedades/crear", {
      pagina: "Ingrese su Propiedad",
      barra: true,
      categorias,
      precios,
      errores: resultado.array()
    });
  } else {
    // Manejar el caso en el que resultado.isEmpty() es true
    // Por ejemplo, redirigir a una página de éxito o mostrar un mensaje de éxito
    res.redirect("/propiedades/admin");
  }
};

export { admin, crear, guardar };