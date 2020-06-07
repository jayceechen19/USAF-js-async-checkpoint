


var pokemonProcess = (file) => {
    //Read the file
    var data = fs.readFileSync(file);
    //Change the Names to a string
    var pokemonNames = data.toString()
    //Create an array of strings 
    pokemonNames = pokemonNames.split('\n')

    //Promise.all fulfills when all the promises for each pokemon Name have been fulfilled
    Promise.all(pokemonNames)
    .then(nameArray => {
        //nameArray is th entire array of pokemon names, we wan't to go through and process each name
        nameArray.forEach(pokemonName => {
            fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonName+'/')
            .then(response => response.json())
            .then(data => {
                //The string that's going to be printed at the end
                var printStr = ''

                //Format the name correctly
                var name = data.name
                name = name[0].toUpperCase() + name.slice(1,name.length)
                printStr += name + ": "

                var typeStr = ''
                //For each array in types, push the type name
                for (var type in data.types){
                    typeStr += data.types[type].type.name + ','
                }
                //Getting rid of the comma
                typeStr = typeStr.slice(0, typeStr.length -1)
                //Add the types to the string we're returning
                printStr += typeStr
                //Print the string with the data
                console.log(printStr)
            })//Allows us to print error message elegantly
            .catch(error => console.log(error.message))
        })
    })
    .catch(
        //Elegantly allows us to return errors
        error => console.log(error.message)
    )
}

//TESTING
const fs = require('fs')
const fetch = require("node-fetch");
//Test code
fs.writeFileSync('pokemonList.txt', 'charizard\npikachu\nbeedrill', function (err) {
    if (err) throw err;
    console.log('Written!')})
pokemonProcess('pokemonList.txt');
   