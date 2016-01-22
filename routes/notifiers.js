var express = require('express');
var router = express.Router();
var notifier = require('../models/notifier.js');

var mailer = require('nodemailer');
var transporter = mailer.createTransport('smtps://hipchatemailbot%40gmail.com:winlikecharliesheen@smtp.gmail.com');
transporter.debug = true;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

router.get('/', function (req, res) {
  notifier.find(function (err, notifiers) {
  	if (err) {
  	  res.json({ error: err });
  	}

  	res.json({ notifiers: notifiers });
  });
});

router.post('/', function (req, res) {
  var newNotifier = new notifier(req.body);
  newNotifier.save(function (err) {
  	if (err) {
  	  res.json({ error: err });
  	}

  	res.json({});
  });
});

router.post('/:id', function (req, res) {
  notifier.findById(req.params.id, function (error, noti) {
    if (error) {
      res.json({ error: error });
    }

    var mailOptions = {
      from: 'NotifyBot@quickenloans.com',
      to: noti.recipients,
      subject: 'You Have Been Notified',
      text: 'This is a test.'
    }

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
      	res.json({ error: err });
      }
      else {
      	res.json({ info: info });
      }
    });

  });
});

router.delete('/:id', function (req, res) {
  notifier.findByIdAndRemove(req.params.id, function (err) {
  	if (err) {
  	  res.json({ error: err });
  	}

  	res.json({});
  });
});

module.exports = router;