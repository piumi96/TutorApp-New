const express = require('express');
const router = express.Router();

const con = require('../../databse/db');

router.get('/viewAllSuggestions', (req, res) => {
    var sql = "select * from Suggestions";
    var suggestion = [];

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
                suggestions: suggestion
            });
        }
    })
})

router.get('/mySuggestions', (req, res) => {
    var email = req.body.email;
    var suggestion = [];
    var sql="select*from Suggestions where Sender='"+email+"'";

    con.query(sql, (err, result) => {
        if(err){
            res.json({
                suggestions: null
            });
        }
        else{
            for (var i = 0; i < result.length; i++) {
                suggestion[i] = {
                    ID: result[i].SuggestionID,
                    Sender: result[i].Sender,
                    Date: result[i].Date,
                    Content: result[i].Content
                }
            }

            res.json({
                suggestions: suggestion
            });
        }
    })
})

router.post('/makeSuggestion', (req, res) => {
    var email = req.body.email;
    var content = req.body.content;

    var sql = "insert into Suggestions(Sender, Date, Content) values('"+email+"', CURDATE(), '"+content+"')";

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false
            });
        }
        else{
            res.json({
                success: true
            });
        }
    })
})

module.exports = router;