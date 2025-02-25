const morgan = require("morgan");
const express = require("express");
const expressEJSLayout = require("express-ejs-layouts");

const usersRoute = require("./routes/usersRoute");
const carsRoute = require("./routes/carsRoute");
const sparepartsRoute = require("./routes/sparepartsRoute");
const driverRoutes = require("./routes/driverRoute");
const dashboardRoutes = require("./routes/dashboardRoute");

const app = express();
const port = 3000;

// Reading json from body (client)
app.use(express.json());
// middleware : agar dari form kebaca
app.use(express.urlencoded({ extended: false }));

// logging || third party package
app.use(morgan());

// contoh middleware yang dibuat sendiri
app.use((req, res, next) => {
  console.log("incoming request ....");
  // better logging dibawahnya
  next();
});

// logging basic
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // better logging dibawahnya
  next();
});

// middleware : bisa membuat express application kita membuat static file
app.use(express.static(`${__dirname}/public`));

// panggil view engine
app.set("view engine", "ejs");
app.use(expressEJSLayout);
app.set("layout", "layout");

app.get("/dashboard/admin", async (req, res) => {
  try {
    res.render("index", { greeting: "hello fsw 2" });
  } catch (error) {
    console.log(error);
  }
});

// Health Check
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Succeed",
      message: "Ping successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Ping failed",
      isSuccess: false,
      error: error.message,
    });
  }
});

// Dashboard Route
app.use("/dashboard/admin", dashboardRoutes);

// Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/spareparts", sparepartsRoute);
app.use("/api/v1/drivers", driverRoutes);

// Middleware to handle page not found
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
