const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://vshruti983:Sarthak06@lazyluggage.3qfpjpe.mongodb.net/?retryWrites=true&w=majority&appName=LazyLuggage").then((res)=>{
    console.log("DB CONNECTED SUCCESSFULLY")
})
.catch((err)=>{
    console.log("DB CONNECTION ERROR")
})