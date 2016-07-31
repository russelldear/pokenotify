var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var pokemon = JSON.parse(fs.readFileSync('required_pokemon.json', 'utf8'));
var request = require('request');

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var server = require('http').Server(app);
var port = process.env.PORT || 9876;

server.listen(port, function (err) {
  console.log('Running server on port ' + port);
});

app.post('/', function(req, res) {

    if (pokemon[req.body.message.pokemon_id]){

        var pokemonName = pokemon[req.body.message.pokemon_id].name;

        console.log(pokemonName);

        request.post(
            'https://maker.ifttt.com/trigger/PokemonGoWebhook/with/key/p8wzbrpgsYRe0TBOu2V3e',
            { json: { "value1" : pokemonName, "value2" : "", "value3" : "" } },
            function (error, response, body) {
                if (error && response.statusCode != 200) {
                    console.log(body)
                }
            }
        );
    }
    else {
        console.log("Pokemon #" + req.body.message.pokemon_id + " not required.");
    }
});