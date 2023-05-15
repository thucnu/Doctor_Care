import express from "express";

//arrow function
let configViewEngine = (app) =>{
    app.use(express.static("./src/public"));
    app.set("view engine","ejs");
    app.set("views","./src/views");
};

module.exports = configViewEngine;