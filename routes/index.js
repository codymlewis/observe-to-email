var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'HLA9000 - Observations' });
});
router.get('/observe', function(req, res, next) {
    res.redirect('/');
});

router.post('/observe', function(req, res, next) {
    var nodemailer = require('nodemailer');
    var today = new Date();
    console.log("Started creating message");
    msg = '\\subsubsection{Test from ' + today.toDateString() + '}\n' +
        '\\begin{center}\n\\begin{tabular}{| c | c |}\n\\hline\n' +
        '\ninterface type & ' + req.body.interface +
        '\\\\\\hline\ntime taken & ' + req.body.time + 'mins' +
        '\\\\\\hline\nThe tester felt & ' + req.body.expression +
        '\\\\\\hline\nThe tester thought the system would be useful for & ' + req.body.testerAction +
        '\\\\\\hline\nThe tester commented & ' + req.body.testerComment +
        '\\\\\\hline\nOther observations & ' + req.body.otherComment +
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
        text: msg
    };
    console.log("Sending mail");
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }

    });
    res.redirect('/success');
});
router.get('/success', function(req, res, next) {
    res.render('success', { title: 'HLA9000 - Success' });
});
module.exports = router;
