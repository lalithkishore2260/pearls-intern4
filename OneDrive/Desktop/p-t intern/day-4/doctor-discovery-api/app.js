const express = require("express");
const sequelize = require("./config/database");

const doctorRoutes = require("./routes/doctorRoutes");

const app = express();

app.use(express.json());

app.use("/doctor", doctorRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});