const express = require('express');
const app = express();

app.use(express.static('public'));

const PORT = 8080;

const loginCred = [
    {
        username: 'tschultz',
        password: 'test',
        voterId: '1'
    },
    {
        username: 'urotolo',
        password: 'test1',
        voterId: '2'
    }]

const voters = [

    {
        id: '1',
        name: 'Todd_Schultz',
        voted: false
    },
    {
        id: '2',
        name: 'Ulisse_Rotolo',
        voted: false
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
    var flag = false;
    voters.forEach((element) => {
        if (element.id == voterId) {
            flag = true;
        }
    });
    if (flag) {
        res.status(200).send(true);
    } else {
        res.status(404).send(false);
    }
});

app.post('/voter/:id/:name', (req, res, next) => {
    var voterId = req.params.id;
    var name = req.params.name;
    const voter = {
        id: req.params.id,
        name: req.params.name,
        voted: false
    }
    if (voters[voter.id]) {
        res.status(400).send();
    } else {
        voters.push(voter);
        res.status(200).send(voter);
    }
});

app.put('/voter/vote/:id', (req, res, next) => {
    var voter = getVoterById(req.params.id);
    if (voter) {
        voters[voter.id - 1].voted = true;
        res.status(200).send(voters[voter.id - 1]);
    } else {
        res.status(404).send('Not Found');
    }
});

app.post('/login/:username/:password',(req, res, next) => {
    var user = req.params.username;
    var pwd = req.params.password;
    var flag = false;
    loginCred.forEach(function(element){
        if(element.username == user && element.password == pwd){
            flag = true;
        }
    });
    if(flag){
        res.status(200).send(true);
    } else{
        res.status(404).send(false);
    }
});

function getVoterById(id) {
    var voter;
    voters.forEach(function (element) {
        if (element.id === id) {
            voter = element;
        }
    });
    return voter;
};
