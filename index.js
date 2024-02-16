//Imports
const express = require("express");
const path = require("path");

//Local Environment Variables
const dotenv = require("dotenv");
dotenv.config();

//Import Page Routes
const pageRouter = require("./modules/pages/router");
const adminMenuRouter = require("./modules/admin/router");

//Set Up Express Object and Port
const app = express();
const port = process.env.PORT || "8888";

//Set Directories
app.set("views", path.join(__dirname, "views")); //Views
app.use(express.static(path.join(__dirname, "public"))); //Add Public to Project

//Set Template Engine to PUG
app.set("view engine", "pug");

//Use Page Routing
app.use("/", pageRouter);
app.use("/admin/menu", adminMenuRouter); //Anything through adminMenuRouter starts with /admin/menu


//SET UP SERVER LISTENING
app.listen(port, () => {
    console.log( `Listening on http://localhost:${port}`);
});