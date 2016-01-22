/*var express = require('express');
var router = express.Router();
var notifier = require('../models/notifier.js');
var mailer = require('nodemailer');
var transporter = mailer.createTransport('smtps://hipchatemailbot%40gmail.com:winlikecharliesheen@smtp.gmail.com');
transporter.debug = true;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

router.post('/', function (req, res) {
  notifier.findOne({ name: /*req.message.notiname*//* }, function (error, noti) {
    var mailOptions = {
      from: 'NotifyBot@quickenloans.com',
      to: noti.recipients,
      subject: 'You Have Been Notified!',
      text: req.item.from.name + ' wanted to notify you: ' + req.item.message.message
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
      	res.json({
      	  color: 'red',
          message: err,
          notify: false,
          message_format: 'text'
      	});
      }
      else {
        res.json({
          color: 'green',
          message: /*recipient*//* + ' has been notified!',
          notify: false,
          message_format: 'text'
        });
      }
    })
  });
});*/