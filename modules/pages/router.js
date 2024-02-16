// Public Pages
const express = require("express");
const pageRouter = express.Router(); //Stores Page Paths
const admin = require("../admin/functions"); //Includes menuLink Functions

//Index Routing; When GET to "/"
pageRouter.get("/", async (request, response) => {
    //Do this
    //response.status(200).send("Test Page"); //Test Message
    links = await admin.getLinks();
    records = await admin.getRecords();
    products = await admin.getProducts();
    response.render("index", { title: "Home", menu: links, records, products });
});

//Albums Routing: When GET to "/albums/"
pageRouter.get("/albums", async (request, response) => {
    let links = await admin.getLinks();
    let records = await admin.getRecords();
    response.render("album-index", {title: "Albums | Vinyl Frontier", menu: links, records})
});

//Albums Routing; When GET to "/albums/view${id}"
pageRouter.get("/albums/view", async (request, response) =>{
    // Do this
    if (request.query.linkId) {
        let recordToSee = await admin.getSingleRecord(request.query.linkId);
        let links = await admin.getLinks();
        response.render("album-details", {title:"Album Details", menu: links, record: recordToSee});
    } else {
        response.redirect("/");
    }
});

//View Details Link Form
pageRouter.post("/albums/view", async (request, response) => {
    let id = request.body.linkId; //POST DATA = REQUEST.BODY
    //FILTER
    response.redirect("/albums/${id}"); //REDIRECT TO DETAILS
});

//Albums Routing: When GET to "/products/"
pageRouter.get("/products", async (request, response) => {
    let links = await admin.getLinks();
    let products = await admin.getProducts();
    response.render("product-index", {title: "Products | Vinyl Frontier", menu: links, products})
});

//Albums Routing; When GET to "/products/view${id}"
pageRouter.get("/products/view", async (request, response) =>{
    // Do this
    if (request.query.linkId) {
        let productToSee = await admin.getSingleProduct(request.query.linkId);
        let links = await admin.getLinks();
        response.render("product-details", {title:"Product Details", menu: links, product: productToSee});
    } else {
        response.redirect("/");
    }
});

//View Details Link Form
pageRouter.post("/products/view", async (request, response) => {
    let id = request.body.linkId; //POST DATA = REQUEST.BODY
    //FILTER
    response.redirect("/products/${id}"); //REDIRECT TO DETAILS
});

module.exports = pageRouter;