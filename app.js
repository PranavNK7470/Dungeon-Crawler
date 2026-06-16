const express = require('express');
const _ = require('lodash');
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded());
app.use((req,res,next) => {
    res.locals.path = req.path;
    next();
});

app.get('/', (req,res) => {
    res.sendFile('titlePage.html', { root : './views'});
});

app.get('/game', (req,res) => {
    res.sendFile('game.html', { root: './views'});
})


app.listen(3000);