const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const colors = require("colors");

const app = require("./app");

// console.log(process.env);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}`.yellow.bold);
});
