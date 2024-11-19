const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const super_admin_router = require("./routes/superAdminOrganizationRoutes");
const admin_router = require("./routes/adminEmployeeRoutes");
const auth_router = require("./routes/authRoutes");
const employee_router = require("./routes/organizationEmployeeRoutes");

require("./config/database");
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", async (req, res) => {
    res.send("HELLO FROM THE SERVER !");
});

// APIs 
app.use("/api/v1/superadmin", super_admin_router);
app.use("/api/v1/admin", admin_router);
app.use("/api/v1/auth", auth_router);
app.use("/api/v1/employee", employee_router);


const port = parseInt(process.env.PORT) || 5000;

server.listen(port, () => {
    console.log(`sever is listening on main port: ${port}`);
});
