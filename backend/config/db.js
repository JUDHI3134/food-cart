import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://judhistirbehera532:9090161171@cluster0.xqrej3a.mongodb.net/food-cart")
    .then(()=>{
        console.log("DB connected")
    })
}