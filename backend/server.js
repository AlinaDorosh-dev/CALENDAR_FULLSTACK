require("dotenv").config();
const cors = require("cors");
const express = require("express");
const colors = require("colors")
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
//Importar controladores
const events = require("./controllers/eventController");
const logins = require("./controllers/loginController");
const {errorHandler} = require("./middleware/errorMiddleware")
//Obtener la info del archivo env

//almacenar la cadena de conexion
const mongoString = process.env.DATABASE_URL;
console.log(mongoString);

//Conectar db
mongoose.connect(mongoString, { useNewUrlParser: true });
//Guardar la conexion
const db = mongoose.connection;
console.log();
//Verificar si la conexion exitosa
db.on("error", (err) => {
  console.log(err.message);
});

//Ejecuta una vez, cuando se conecta a la db

db.once("connected", () => {
  console.log("Succesfully connected");
});

//Recibir la notifición, cuando la coxexion se haya cerrado
db.on("disconnected", () => {
  console.log("Mongoose default connection is lost");
});
const PORT = 8001;
const app = express();
app.use(cors());
//Analizar archivos json

app.use(express.json());

//Analizar urlencoded

app.use(express.urlencoded({ extended: false }));

app.use("/calendar", require("./routes/eventRoutes"));
app.use("/auth", logins);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});