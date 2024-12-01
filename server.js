const express = require('express');
const cors = require("cors");

const app = express();

// var corsOption = {
//     origin: "http://localhost:3001/"
// };

app.use(cors());
app.options('*',cors());
app.use(express.json());

const db = require("./models");
db.mongoose
.connect(db.url, {
    useNewUrlParser : true,
    useUnifiedTopology: true
})
.then(()=> {
    console.log("Connected to the database!");
})

.catch(err =>{
    console.log("Cannot connect to the database!", err);
    process.exit();
});

require("./routes/notes.routes")(app);

app.get('/', (req, res) =>{
    res.json({message: 'Sans le raha hu '});
});

const port = process.env.PORT ||3000;
app.listen(port, () =>{
console.log(`Server is running on port ${port}`);
});