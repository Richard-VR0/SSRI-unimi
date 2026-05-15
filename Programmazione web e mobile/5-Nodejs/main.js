const express = require('express');
const app = express();
const port = 3000;

const myLogger = function (req, res, next) {
    var api_key = req.query.api_key;

    if (api_key == '3bbea602f73996d48033d9c569bb8b1f') {
        console.log('LOGGED');
        
        next();
    }
    else {
        res.send('Errore: chiave API errata');
    }
}

app.use(myLogger);

app.get('/', (req, res) => {
    res.send('Benvenuto!');
})

app.get('/pwm/:id', (req, res) => {
    const id = req.params.id;
    const lang = req.query.lang;

    res.send('Lezione n. ' + id + "<br>Lingua: " + lang);
})

app.listen(port, () => {
    console.log('App listening on port ' + port + "\n");
})