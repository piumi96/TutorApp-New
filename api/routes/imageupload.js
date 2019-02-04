const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const con = require('../../databse/db');
const keys = require('../../config/keys');
const imageUpload = require('../../config/cloudinary-setup');

router.post('/uploadImage', (req, res, next) => {
    console.log("uploadUserImage");
    const image = req.body.image;
    const email = req.body.email;
    const role = req.body.role;
    //console.log(image);

    cloudinary.uploader.upload(image, (result) => {
            //console.log(result);
            var imageSecureURL = result.secure_url;
            console.log(imageSecureURL);
            if (imageSecureURL == 'undefined') {
                res.json({
                    success: false
                });
            }
            if (role == 'tutor') {
                var sql = "update Tutor set ImgUrl = '" + imageSecureURL + "' where email='" + email + "'";
            }
            else if (role == 'student') {
                var sql = "update Student set ImgUrl = '" + imageSecureURL + "' where email='" + email + "'";
            }
            con.query(sql, (err, response) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        url: null
                    });
                }
                console.log(response);
                res.json({
                    success: true,
                    url: imageSecureURL
                });
            })
    });

});

router.post('/uploadAchievementImage', imageUpload.userImageUpload.single('image'), (req, res, next) => {
    console.log("uploadUserImage");
    const id = req.body.id;

    cloudinary.uploader.upload(req.file.path, (result) => {
        console.log(req.file.path);
        console.log(result);
        imageSecureURL = result.secure_url;
        console.log(imageSecureURL);
        if (imageSecureURL == 'undefined') {
            res.json({
                success: false
            });
        }
        else {
            var sql = "update Achievements set ImgUrl = '" + imageSecureURL + "' where achievementID = '" + id + "'";
            con.query(sql, (err, response) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false
                    });
                }
                else {
                    res.json({
                        success: true
                    });
                }
            })
        }
    })
});

/* router.post('/uploadImage', imageUpload.userImageUpload.single('image'), (req, res, next) => {
    console.log("uploadUserImage");
    const email = req.body.email;
    const role = req.body.role;

    cloudinary.uploader.upload(req.file.path, (result) => {
        console.log(result);
        imageSecureURL = result.secure_url;
        console.log(imageSecureURL);
        if (imageSecureURL == 'undefined') {
            res.json({
                success: false
            });
        }
        if (role == 'tutor') {
            var sql = "update Tutor set ImgUrl = '" + imageSecureURL + "' where email='" + email + "'";
        }
        else if (role == 'student') {
            var sql = "update Student set ImgUrl = '" + imageSecureURL + "' where email='" + email + "'";
        }
        con.query(sql, (err, response) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    url: null
                });
            }
            //console.log(response);
            res.json({
                success: true,
                url: imageSecureURL
            });
        })

    });

}); */


module.exports = router;