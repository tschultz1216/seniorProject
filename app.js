const express = require('express');
const app = express();

app.use(express.static('public'));

const PORT = 8080;

const voters = [

    {
        id: '1',
        name: 'Todd Schultz'
    },
    {
        id: '2',
        name: 'Ulisse Rotolo'
    }
];

app.use((req, res, next) => {
    console.log(`${req.method} Request Received`);
    next();
});

app.listen(PORT, () => console.log(`API listening on ${PORT}`));

app.get('/voters', (req, res, next) => {
    res.status(200).send(voters);
});

app.get('/voters/:id', (req, res, next) => {
    var voterId = req.params.id;
    var flag = voters.forEach((element) => {
        if (element.id === voterId) {
            return true;
        } else {
            return false;
        }
    });
    if (flag) {
        res.status(200).send(element);
    } else {
        res.status(404).send();
    }
})
