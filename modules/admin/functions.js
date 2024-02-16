const { MongoClient, ObjectId } = require("mongodb");

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/`;
const client = new MongoClient(dbUrl);

//Database Functions
//Return recordstore as database
async function connection() {
    db = client.db("recordstore");
    return db;
}

//Return All Documents from menuLinks collection
async function getLinks() {
    db = await connection();
    var results = db.collection("menuLinks").find({});
    res = await results.toArray();
    return res;
}

//Insert one document into menuLinks
async function addLink(link){
    db = await connection();
    var status = await db.collection("menuLinks").insertOne(link);
    console.log("Link Added!")
}

//Delete one document from menuLinks by _id.
async function deleteLink(inputId) {
    db = await connection();
    const deleteId = { _id: new ObjectId(inputId) };
    const result = await db.collection("menuLinks").deleteOne(deleteId);
    if (result.deletedCount == 1)
        console.log("Link Deleted Successfully")
}

//Select one document by _id.
async function getSingleLink(inputId) {
    db = await connection();
    const editId = { _id: new ObjectId(inputId)};
    const result = await db.collection("menuLinks").findOne(editId);
    return result;
}

//Edit one document of menuLink
async function editLink(idFilter, updatedLink){
    db = await connection();
    let updateSet = { $set: updatedLink } //SETS UPDATE DATA TO JSON
    let result = await db.collection("menuLinks").updateOne(idFilter, updateSet); //Updates Link based on Filter
    if (result.modifiedCount === 1) {
        console.log("Link Updated!");
    } else {
        console.log("Link NOT Updated.")
    }
}

//Return All Documents from recordInventory collection
async function getRecords() {
    db = await connection();
    var results = db.collection("recordInventory").find({});
    recordResult = await results.toArray();
    return recordResult;
}

//Insert one document into recordInventory
async function addRecord(record){
    db = await connection();
    var status = await db.collection("recordInventory").insertOne(record);
    console.log("Record Added!")
}

//Delete one document from recordInventory by _id.
async function deleteRecord(inputId) {
    db = await connection();
    const deleteId = { _id: new ObjectId(inputId) };
    const result = await db.collection("recordInventory").deleteOne(deleteId);
    if (result.deletedCount == 1)
        console.log("Record Deleted Successfully")
}

//Select one document from recordInventory by _id.
async function getSingleRecord(inputId) {
    db = await connection();
    const editId = { _id: new ObjectId(inputId)};
    const result = await db.collection("recordInventory").findOne(editId);
    return result;
}

//Edit one document of recordInventory
async function editRecord(idFilter, updatedRecord){
    db = await connection();
    let updatedSet = { $set: updatedRecord } //SETS UPDATE DATA TO JSON
    console.log("idFilter:", idFilter);
    console.log("updatedSet:", updatedSet);
    let result = await db.collection("recordInventory").updateOne(idFilter, updatedSet); //Updates Record based on Filter
    if (result.modifiedCount === 1) {
        console.log("Record Updated!");
    } else {
        console.log("Record NOT Updated.")
    }
}

//Return All Documents from productInventory collection
async function getProducts() {
    db = await connection();
    var results = db.collection("productInventory").find({});
    productResult = await results.toArray();
    return productResult;
}

//Insert one document into productInventory
async function addProduct(product){
    db = await connection();
    var status = await db.collection("productInventory").insertOne(product);
    console.log("Product Added!")
}

//Delete one document from productInventory by _id.
async function deleteProduct(inputId) {
    db = await connection();
    const deleteId = { _id: new ObjectId(inputId) };
    const result = await db.collection("productInventory").deleteOne(deleteId);
    if (result.deletedCount == 1)
        console.log("Product Deleted Successfully")
}

//Select one document from productInventory by _id.
async function getSingleProduct(inputId) {
    db = await connection();
    const editId = { _id: new ObjectId(inputId)};
    const result = await db.collection("productInventory").findOne(editId);
    return result;
}

//Edit one document of productInventory
async function editProduct(idFilter, updatedProduct){
    db = await connection();
    let updatedSet = { $set: updatedProduct } //SETS UPDATE DATA TO JSON
    let result = await db.collection("productInventory").updateOne(idFilter, updatedSet); //Updates Record based on Filter
    if (result.modifiedCount === 1) {
        console.log("Product Updated!");
    } else {
        console.log("Product NOT Updated.")
    }
}

module.exports = {
    getLinks,
    addLink,
    deleteLink,
    getSingleLink,
    editLink,
    getRecords,
    addRecord,
    deleteRecord,
    getSingleRecord,
    editRecord,
    getProducts,
    addProduct,
    deleteProduct,
    getSingleProduct,
    editProduct,
};