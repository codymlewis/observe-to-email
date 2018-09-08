var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'HLA9000 - Observations' });
});
router.get('/observe', function(req, res, next) {
    res.redirect('/');
});

router.post('/observe', function(req, res, next) {
    var nodemailer = require('nodemailer');
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log("PArsing form");
        var today = new Date();
        var photo = files.photo.path;
        msg = '\\subsubsection{Test from ' + today.toDateString() + '}\n' +
            '\\begin{center}\n\\begin{tabular}{| c | c |}\n\\hline\n' +
            '\ninterface type & ' + fields.interface +
            '\\\\\\hline\ntime taken & ' + fields.time + 'mins' +
            '\\\\\\hline\nThe tester felt & ' + fields.expression +
            '\\\\\\hline\nThe tester thought the system would be useful for & ' + fields.testerAction +
            '\\\\\\hline\nThe tester commented & ' + fields.testerComment +
            '\\\\\\hline\nOther observations & ' + fields.otherComment +
            '\\\\\n\\hline\n\\end{tabular}\n\\end{center}';
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'seng2260efg@gmail.com',
                pass: 'seng2260hla9000'
            }
        });
        var mailOptions = {
            from: 'seng2260efg@gmail.com',
            to: 'seng2260efg@gmail.com',
            subject: 'HLA9000 - Observations: ' + today.toDateString(),
            text: msg,
            attachments: [{
                path: photo,
                contentType: "image/png"
            }]
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }

        });
    });
    res.redirect('/success');
});
router.get('/success', function(req, res, next) {
    res.render('success', { title: 'HLA9000 - Success' });
});
module.exports = router;
