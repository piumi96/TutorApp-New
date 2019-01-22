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
})

module.exports = router;