const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary');
const con = require('../../databse/db');
const keys = require('../../config/keys');

cloudinary.config({
    cloud_name: keys.cloudinary.cloud_name,
    api_key: keys.cloudinary.api_key,
    api_secret: keys.cloudinary.api_secret
});

router.post('/uploadImg', (req, res) => {
    
})