const express = require('express');
const router = express.Router();

const con = require('../../databse/db');

router.get('/viewAllSuggestions', (req, res) => {
    var sql = "select * from Suggestions";
    var suggestions = [];

    con.query(sql, (err, result) => {
        if(err){
            res.json({
                suggestions: null
            });
        }
        else{
            for(var i=0; i<result.length; i++){
                suggestion[i] = {
                    ID: result[i].SuggestionID,
                    Sender: result[i].Sender,
                    Date: result[i].Date,
                    Content: result[i].Content
                }
            }

            res.json({
                suggestions: suggestions
            });
        }
    })
})

router.get('/mySuggestions', (req, res) => {
    var role = req.body.role;
    var email = req.body.email;
})

module.exports = router;