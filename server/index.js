/* Dependencies 
- express js = as backend
- body parser
- mysql
- nodemon = to run server automatically without re-ren after changes
*/

//Create express server
const express = require('express');

//Create map through express server
const app = express();

//Create connection to mysql
const mysql = require('mysql');
//Call our database
const db = mysql.createPool({
    host: '35.238.53.202',
    user: 'root',
    password: 'AAdni007',
    database : 'pertaminacontractdb'
});

//Bodyparser : Middleware to format everything related to JSON format
const bodyParser = require('body-parser');

const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(cors());


//Post contract
app.post("/api/insert", (req, res) => {

    /*const sqlInsert = "INSERT INTO Contract (companyName, contractStart, contractEnd, PIC) VALUES ('ITB', '2021-01-17', '2021-08-17', 'Ahmad');";
    db.query(sqlInsert, (err, result) => {
        if(err){
            throw err;
        } else{
            res.send("Hello World!");
        }
    });*/

    var dateFormat = require("dateformat");
    //var newDate = dateFormat("Wed May 05 2021 00:00:00 GMT+0700 (Western Indonesia Time)", "yyyy-MM-dd");
    //console.log(newDate);


    const companyName = req.body.companyName; 
    const contractStart = dateFormat(req.body.contractStart, "yyyy-mm-dd");
    const contractEnd = dateFormat(req.body.contractEnd, "yyyy-mm-dd");
    const contractFile = req.body.contractFile;
    const PIC = req.body.PIC;
    
    const sqlInsert = "INSERT INTO Contract (companyName, contractStart, contractEnd, contractFile, PIC) VALUES (?, ?, ?, ?, ?);";
    db.query(sqlInsert, [companyName, contractStart, contractEnd, contractFile, PIC], (err, result) => {
        if(err){
            throw err;
        } else{
            res.send("Success!");
        }
    });
});

//Get contract data
app.get("/api/get", (req, res) => {

    //Query
    const sqlGet = "SELECT *, DATE_FORMAT(contractStart, '%d %M %Y') AS contractStart, DATE_FORMAT(contractEnd, '%d %M %Y') AS contractEnd FROM Contract;";
    db.query(sqlGet, (err, result) => {
        if(err){
            throw err;
        } else{
            //Before pass it to front-end. We need to get the remaining days of contracts

            let listContracts = [...result]; //Create new variable instead of change the original result data
            var date = new Date(); //Get current Date
            var currentDate = Date.parse(date); //Parse the date
            var i;
            for (i=0; i<listContracts.length; i++){

                let contract = {...listContracts[i]}; //Get one row of data
                var endDate = Date.parse(contract.contractEnd); //Get the end date of contract and parse it to INT

                //Get contract remaining days (1 days = 1000ms * 60second * 60minutes * 24days)
                var differenceDays = Math.round((endDate-currentDate)/(1000*60*60*24));
                var remainingDays = "remainingDays"
                
                contract[remainingDays] = differenceDays; //Create new attribute for contract object

                listContracts[i] = contract; //Pass the contract data with new attribute to listContracts
                
            }
            //console.log(listContracts);
            res.send(listContracts);
        }
    });
})

//Get contract detail
app.get("/api/getDetail/:companyName", (req, res) => {

    const compName = req.params.companyName;
    //Query
    const sqlGet = "SELECT *, DATE_FORMAT(contractStart, '%d %M %Y') AS contractStart, DATE_FORMAT(contractEnd, '%d %M %Y') AS contractEnd FROM Contract WHERE companyName = ?;";
    db.query(sqlGet, [compName], (err, result) => {
        if(err){
            throw err;
        } else{
            //Before pass it to front-end. We need to get the remaining days of contracts
            let contract = {...result[0]};
            var date = new Date(); //Get current Date
            var currentDate = Date.parse(date); //Parse the date
            var endDate = Date.parse(contract.contractEnd); //Get the end date of contract and parse it to INT

            //Get contract remaining days (1 days = 1000ms * 60second * 60minutes * 24days)
            var differenceDays = Math.round((endDate-currentDate)/(1000*60*60*24));
            var remainingDays = "remainingDays"
            
            contract[remainingDays] = differenceDays; //Create new attribute for contract object

            res.send(contract);
            
        }
    });
});

//Post contract
app.post("/api/delete", (req, res) => {

    const companyName = req.body.companyName;
    const PIC = req.body.PIC;
    
    const sqlDelete = "DELETE FROM Contract WHERE companyName = ? AND PIC = ?";
    db.query(sqlDelete, [companyName, PIC], (err, result) => {
        if(err){
            throw err;
        } else{
            console.log(result);
            res.send("Delete Success");
        }
    });
});


//Create listen(port,function)
app.listen(3001, () => {
    console.log('running on port 3001');
});