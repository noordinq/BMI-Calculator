const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});

app.set('views', 'views');
app.set('view engine', 'hbs');
app.set(express.static('public'));

app.get('/', function (request, response) {
    response.render('home');
})

app.get('/contacts', function (request, response) {
    response.render('contact_us');
});

app.get('/bmii', function (request, response) {
    response.render('bmi');
})

app.post('/process-contacts', urlEncodedParser, function (request, response) {
    response.end('Thankyou ' + request.body.first_name + ' ' + request.body.last_name);
});

app.post('/process-bmi', urlEncodedParser, function (request, response) {
    weight = request.body.weight;
    height = request.body.height;
    bmi = weight / (height * height);
    finalbmi = bmi * 10000;
    response.end('Your BMI is: ' + finalbmi);
    if (finalbmi <= 18.4) {
        response.end('According to your BMI, you are Underweight')
    } else if (finalbmi >= 18.5 && finalbmi <= 24.9) {
        response.end('According to your BMI, you are in Healthy weight')
    } else if (finalbmi >= 25.0 && finalbmi <= 29.9) {
        response.end('According to your BMI, you are Overweight')
    } else if (finalbmi >= 30.0) {
        response.end('According to your BMI, you are Underweight')
    }
    
})

app.listen(port);
console.log('server is listening on port ${port}');