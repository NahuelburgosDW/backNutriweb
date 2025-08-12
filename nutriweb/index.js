const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const recetas = [
  {
    nombre: "Fideos con tuco",
    ingredientes: ["fideos", "tomate", "ajo", "aceite", "sal"],
  },
  {
    nombre: "Ensalada caprese",
    ingredientes: ["tomate", "mozzarella", "albahaca", "aceite", "sal"],
  },
  {
    nombre: "Omelette",
    ingredientes: ["huevo", "queso", "sal", "pimienta"],
  },
  {
    nombre: "Arroz con pollo",
    ingredientes: ["arroz", "pollo", "cebolla", "morron", "aceite", "sal"],
  },
];

app.get("/buscar-recetas", (req, res) => {
  res.send(
    "Bienvenido a la búsqueda de recetas. Usá método POST con ingredientes para buscar."
  );
});

app.post("/buscar-recetas", (req, res) => {
  const { ingredientes } = req.body;
  if (!ingredientes || !Array.isArray(ingredientes)) {
    return res.status(400).json({ error: "Formato de ingredientes inválido" });
  }
  const resultados = recetas.filter((receta) =>
    ingredientes.every((ing) => receta.ingredientes.includes(ing))
  );
  res.json(resultados);
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
