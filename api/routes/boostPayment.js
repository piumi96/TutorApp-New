const express = require('express');
const router = express.router();
const con = require('../../databse/db');

//payHere API integration
/*<?php

$merchant_id         = $_POST['merchant_id'];
$order_id             = $_POST['order_id'];
$payhere_amount     = $_POST['payhere_amount'];
$payhere_currency    = $_POST['payhere_currency'];
$status_code         = $_POST['status_code'];
$md5sig                = $_POST['md5sig'];

$merchant_secret = 'XXXXXXXXXXXXX'; //

$local_md5sig = strtoupper (md5 ( $merchant_id . $order_id . $payhere_amount . $payhere_currency . $status_code . strtoupper(md5($merchant_secret)) ) );

if (($local_md5sig === $md5sig) AND ($status_code == 2) ){
        res.json({
            success:true,
            allowed:true,
            response:'payment successful!'
        })
}

?>
*/


module.exports = router;