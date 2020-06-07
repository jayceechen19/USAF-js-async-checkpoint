var pokemonProcess = (file) => {
    //Read the file
    var data = fs.readFileSync(file);
    //Change the Names to a string
    var pokemonNames = data.toString()
    //Create an array of strings 
    pokemonNames = pokemonNames.split('\n')
    //Create an object to store the data
    var pokemonObject= {}
    pokemonNames.forEach(pokemonName => {
        
        //pulling the data for each pokemonNames specifically
        //GET https://pokeapi.co/api/v2/pokemon/{id or name}/
        fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName+'/')
            .then(response => response.json())
            .then(json => {
                console.log(json.types)
                //Add pokemon name (json) to object
                for (var name in json.name){
                    pokemonObject[name] = []
                    //For each pokemon that's getting returned in types
                    for (var pokemon in json.types){
                        //Fetch the API
                        console.log(name)
                        /*
                        fetch( 'https://pokeapi.co/api/v2/type/'+name+'/')
                        .then(response => response.json()) //turn the response into json
                        .then(json => {
                            //console.log(json)
                            pokemonObject[name].push(json.type)
                        })*/
                    }
                }
                
            
            })
            
    })
    for(var pokemon in pokemonObject){
        console.log(pokemon + ":" + pokemonObject[pokemon])
    }
}
const fs = require('fs')
const fetch = require("node-fetch");
//Test code
fs.writeFileSync('pokemonList.txt', 'charizard\npikachu', function (err) {
    if (err) throw err;
    console.log('Written!')})
pokemonProcess('pokemonList.txt');


/* Documentation from API to get the pokemon id
GET https://pokeapi.co/api/v2/pokemon/{id or name}/
*/