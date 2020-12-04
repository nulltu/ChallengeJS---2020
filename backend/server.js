const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Welcome Api - TEST
app.get("/", (req, res) => {
    res.json({message: "API OK"});
});

require("./routes/operationRoutes")(app);

const PORT = process.env.PORT || 4800;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})