var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'HLA9000 - Observations' });
});
router.get('/observe', function(req, res, next) {
    res.redirect('/');
});

router.get('/observe/submit', function(req, res, next) {
    var today = new Date();
    msg = '\\subsubsection{Test from ' + today.toDateString() + '}\n' +
        '\\begin{center}\n\\begin{tabular}{| c | c |}\n\\hline\n' +
        '\ninterface type & ' + req.query.interface +
        '\\\\\\hline\ntime taken & ' + req.query.time + 'mins' +
        '\\\\\\hline\nThe tester felt & ' + req.query.expression +
        '\\\\\\hline\nThe tester thought the system would be useful for & ' + req.query.testerAction +
        '\\\\\\hline\nThe tester commented & ' + req.query.testerComment +
        '\\\\\\hline\nOther observations & ' + req.query.otherComment +
        '\\\\\n\\hline\n\\end{tabular}\n\\end{center}';
    var subject = 'HLA9000 - Observations: ' + today.toDateString();
    email(subject, msg, 0);
    res.redirect('/success');
});

function email(subject, msg, i) {
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
        subject: subject,
        text: msg
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            if(i < 5) {
                console.log("Trying again");
                email(subject, msg, i + 1);
            }
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
router.get('/success', function(req, res, next) {
    res.render('success', { title: 'HLA9000 - Success' });
});
module.exports = router;
