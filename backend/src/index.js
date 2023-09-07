const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const app = express();
const server = http.createServer(app);
// Connect to database
const path = require("path");
app.use(cookieParser());
const connection = require("./app/models/db"); // Đảm bảo đường dẫn đúng đến tệp connection
connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");

  // Thực hiện các truy vấn SQL hoặc thao tác với cơ sở dữ liệu ở đây
});
// Kết nối tới MQTT broker
const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
const route = require("./routes");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("combined"));

// template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// Route init
route(app);

server.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
