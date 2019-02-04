const express = require('express');
const router = express.Router();

const con = require('../../databse/db');

router.get('/tutorDash', (req, res) => {
    var tutor = req.body.tutor;
    var sql = "select * from Requests where tutor='"+tutor+"' and (status='ACCEPTED' or status='SENT')";
    var requestNum = 0;
    var studentNum = 0;

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                requestNum: null,
                studentNum: null
            });
        }
        else{
            console.log(result);
            for(var i=0; i<result.length; i++){
                if(result[i].status=='SENT'){
                    requestNum++;
                }
                else{
                    studentNum++;
                }

            }
            res.json({
                success: true,
                requestNum: requestNum,
                studentNum: studentNum
            });
        }
    })
});

router.post('/graph', (req, res) => {
    var tutor = req.body.tutor;
    var subject = req.body.subject;
    var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var sql = "select email, subject, DistrictID from Tutor, District where Subject='"+subject+"' and Tutor.Location = District.name";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                count: null
            });
        }
        else{
            console.log(result);
            
            for(var i=0; i<result.length; i++){
                for(var j=1; j<26; j++){
                    if(result[i].DistrictID==j){
                        count[j-1]++;
                    }
                }
            }
            res.json({
                success: true,
                count: count
            });
        }
    })
})

module.exports = router;