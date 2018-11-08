var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Observations' });
});
router.get('/observe', function(req, res, next) {
    res.redirect('/');
});

router.get('/observe/submit', function(req, res, next) {
    var today = new Date();
    msg = '% Make sure to include the tabularx package and the booktabs package\n' +
        '\\subsubsection{Test from ' + today.toDateString() + '}\n' +
        '\\begin{tabularx}{\\textwidth}{X X}\n\\toprule\n' +
        '\ninterface type & ' + req.query.interface + '\\\\\n\\midrule\n' +
        'time taken & ' + req.query.time + 'mins \\\\\n\\midrule\n' +
        'The tester felt & ' + req.query.expression + '\\\\\n\\midrule\n' +
        'The tester thought the system would be useful for & ' + req.query.testerAction + '\\\\\n\\midrule\n' +
        'The tester commented & ' + req.query.testerComment + '\\\\\n\\midrule\n' +
        'Other observations & ' + req.query.otherComment +
        '\\\\\n\\bottomrule\n\\end{tabularx}';
    console.log(msg);
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
            } else {
                console.log(`Failed ${i} times, it seems something is wrong with the emailing service`);
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
