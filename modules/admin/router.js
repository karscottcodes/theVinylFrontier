const { MongoClient, ObjectId } = require("mongodb");
var express = require("express");
var router = express.Router(); //Stores Page Paths

const model = require("./functions");

//JSON Parsing
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//Page Routes for Admin Pages
//Admin Routing; When GET to "/menu/admin"
router.get("/", async (request, response) =>{
    // Do this
    let links = await model.getLinks();
    response.render("admin/admin-home", { title: "Admin | Home Menu", menu: links });
});

//Admin Routing; When GET to "/menu/admin/nav"
router.get("/nav", async (request, response) =>{
    // Do this
    let links = await model.getLinks();
    response.render("admin/menu-list", { title: "Admin | Home Menu", menu: links });
});

//Admin Routing; When GET to "/menu/admin/nav/add"
router.get("/nav/add", async (request, response) =>{
    // Do this
    let links = await model.getLinks();
    response.render("admin/menu-add", { title: "Admin | Add Menu Link", menu: links });
});

//Admin Routing; When GET to "/admin/menu/nav/edit"
router.get("/nav/edit", async (request, response) =>{
    if (request.query.linkId) {
        let linkToEdit = await model.getSingleLink(request.query.linkId);
        let links = await model.getLinks();
        response.render("admin/menu-edit", {title: "Admin | Edit Menu Link", menu: links, editLink: linkToEdit });
    } else {
        response.redirect("../nav");
    }
});

//Admin Routing; When GET to "/admin/menu/nav/delete"
router.get("/nav/delete", async (request, response) =>{
    // Do this
    let id = request.query.linkId; //REQUEST.QUERY SINCE ITS A GET REQUEST
    await model.deleteLink(id);
    response.redirect("../nav");
});

//RECORDS ADMIN
//Admin Routing; When GET to "/admin/menu/records"
router.get("/records", async (request, response) => {
    let links = await model.getLinks();
    let records = await model.getRecords();
    response.render("admin/record-list", { title: "Admin | Record List", menu: links, records} );
});

//Admin Routing; When GET to "/admin/menu/records/add"
router.get("/records/add", async (request, response) =>{
    // Do this
    let links = await model.getLinks();
    let records = await model.getRecords();
    response.render("admin/record-add", { title: "Admin | Add New Record", menu: links, records });
});

//Admin Routing; When GET to "/admin/menu/records/edit"
router.get("/records/edit", async (request, response) =>{
    if (request.query.linkId) {
        let recordToEdit = await model.getSingleRecord(request.query.linkId);
        let links = await model.getLinks();
        response.render("admin/record-edit", {title: "Admin | Edit Record", menu: links, editRecord: recordToEdit });
    } else {
        response.redirect("../records");
    }
});

//Admin Routing; When GET to "/admin/menu/records/delete"
router.get("/records/delete", async (request, response) =>{
    // Do this
    let id = request.query.linkId; //REQUEST.QUERY SINCE ITS A GET REQUEST
    await model.deleteRecord(id);
    response.redirect("../records");
});

//Products Admin Routing
//Admin Routing; When GET to "/admin/menu/products"
router.get("/products", async (request, response) => {
    let links = await model.getLinks();
    let products = await model.getProducts();
    response.render("admin/product-list", { title: "Admin | Products List", menu: links, products} );
});

//Admin Routing; When GET to "/admin/menu/products/add"
router.get("/products/add", async (request, response) =>{
    // Do this
    let links = await model.getLinks();
    let products = await model.getProducts();
    response.render("admin/product-add", { title: "Admin | Add New Product", menu: links, products });
});

//Admin Routing; When GET to "/admin/menu/products/edit"
router.get("/products/edit", async (request, response) =>{
    if (request.query.linkId) {
        let productToEdit = await model.getSingleProduct(request.query.linkId);
        let links = await model.getLinks();
        response.render("admin/product-edit", {title: "Admin | Edit Product", menu: links, editProduct: productToEdit });
    } else {
        response.redirect("../products");
    }
});

//Admin Routing; When GET to "/admin/menu/products/delete"
router.get("/products/delete", async (request, response) =>{
    // Do this
    let id = request.query.linkId; //REQUEST.QUERY SINCE ITS A GET REQUEST
    await model.deleteProduct(id);
    response.redirect("../products");
});

//Form Processing
//Add Link Form
router.post("/nav/add/submit", async (request, response) => {
    //GET FORM DATA
    let weight = request.body.weight; //Get value for name="weight"
    let path = request.body.path; // REQUEST.BODY FOR POST DATA
    let name = request.body.name;

    var newLink = { "weight":weight, "path":path, "name":name};

    await model.addLink(newLink);
    response.redirect("/admin/menu/nav"); //REDIRECT TO ADMIN PAGE
});

//Edit Link Form
router.post("/nav/edit/submit", async (request, response) => {
    let id = request.body.linkId; //POST DATA = REQUEST.BODY
    //FILTER
    let idFilter = { _id: new ObjectId(id) };
    
    let updatedLink = {
        weight: request.body.weight, //POST
        path: request.body.path, //POST
        name: request.body.name, //POST
    };
    await model.editLink(idFilter, updatedLink);
    response.redirect("/admin/menu/nav"); //REDIRECT
});

//Add Record Form
router.post("/records/add/submit", async (request, response) => {
    //GET FORM DATA
    let title = request.body.title; //GET VALUE
    let artist = request.body.artist; // REQUEST.BODY FOR POST DATA
    let released = request.body.released;
    let art_src = request.body.art_src;
    let inv = request.body.inv;
    let price = request.body.price;
    let genre = request.body.genre;

    var newRecord = { "title":title, "artist":artist, "released":released, "art_src":art_src, "inv":inv, "price":price, "genre":genre };

    await model.addRecord(newRecord);
    response.redirect("/admin/menu/records"); //REDIRECT TO RECORD ADMIN PAGE
});

//Edit Record Form
router.post("/records/edit/submit", async (request, response) => {
    let id = request.body.recordId; //POST DATA = REQUEST.BODY
    //FILTER
    let idFilter = { _id: new ObjectId(id) };
    let updatedRecord = {
        title: request.body.title, //GET VALUE
        artist: request.body.artist, // REQUEST.BODY FOR POST DATA
        released: request.body.released,
        art_src: request.body.art_src,
        inv: request.body.inv,
        price: request.body.price,
        genre: request.body.genre
    };
    await model.editRecord(idFilter, updatedRecord);
    response.redirect("/admin/menu/records"); //REDIRECT
});

//Add Products Form
router.post("/products/add/submit", async (request, response) => {
    //GET FORM DATA
    let name = request.body.name;
    let desc = request.body.desc; // REQUEST.BODY FOR POST DATA
    let price = request.body.price;
    let category = request.body.category;
    let img_src = request.body.img_src;
    let inv = request.body.inv;

    var newProduct = { "name":name, "desc":desc, "price":price, "category":category, "img_src":img_src, "inv":inv};

    await model.addProduct(newProduct);
    response.redirect("/admin/menu/products"); //REDIRECT TO ADMIN PAGE
});

//Edit Products Form
router.post("/products/edit/submit", async (request, response) => {
    let id = request.body.productId; //POST DATA = REQUEST.BODY
    //FILTER
    let idFilter = { _id: new ObjectId(id) };
    let updatedProduct = {
        name: request.body.name, //GET VALUE
        desc: request.body.desc, // REQUEST.BODY FOR POST DATA
        price: request.body.price,
        category: request.body.category,
        img_src: request.body.img_src,
        inv: request.body.inv,
    };
    await model.editProduct(idFilter, updatedProduct);
    response.redirect("/admin/menu/products"); //REDIRECT
});


module.exports = router;