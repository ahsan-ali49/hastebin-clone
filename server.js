const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))

const Document = require("./models/Document");

mongoose.connect(process.env.DATABASE_URL,)



app.get("/", (req, res)=>{
const code = `Welcome to Wastebin!

Use the commands in the top right corner
to create a new file to share with others.`
    res.render("code-display", {code, language: "plaint  ext" })
});

app.get("/new", (req, res)=>{
    res.render("new");
})

app.post("/save", async (req, res)=>{
    const value = req.body.value;
    try{
        const document = await Document.create({value})
        res.redirect(`/${document.id}`);
    } catch(err){
        res.render("new", {value})
    }
    console.log(value);
})

app.get("/:id/duplicate", async (req, res)=>{
    const id = req.params.id;
    try{
        const document = await Document.findById(id);
        res.render("new", {value: document.value})
    }catch(err){
        res.redirect("/")
    }
})

app.get("/:id", async (req, res)=>{
    const id = req.params.id;
    try{
        const document = await Document.findById(id);
        res.render("code-display", {code: document.value, id})
    }catch(err){
        res.redirect("/")
    }
})

app.listen(process.env.PORT || 5000);