listOfMovie = [];
let play = true;
let visible = false;

//NE PAS TOUCHER
var port = new osc.WebSocketPort({
    url: "ws://localhost:8081"
});


// Cette fonction est appelée lorsqu'un message provenant du logiciel vidéo est arrivé
port.on("message", function (oscMessage) {

    
    switch (oscMessage.address) {
        case "/addMovie":
            // Ajouter 1 film à la playlist. Les films sont envoyés un par un
            // Normalement tout est écrit 

                console.log("Recu addMovie", oscMessage);
                var movie = createMovie(oscMessage.args);
        
                listOfMovie.push(movie);

                $('#list').append(htmlDivElement(movie));

                $('#'+movie.index).click(function() {
        
                    createPlayCallback(movie);
                });
   
    
            break;
        case "/playIndex":
            console.log("Recu playIndex", oscMessage); 
            // A COMPLETER   

            
            let indexBoutonBack = oscMessage.args[0] - 1;
            let indexBoutonNext = oscMessage.args[0] + 1;

            if(indexBoutonBack < 0) indexBoutonBack = listOfMovie.length - 1;
            if(indexBoutonNext > listOfMovie.length - 1) indexBoutonNext = 0;

            console.log(indexBoutonBack + ' ' + indexBoutonNext);
            
            $('#back').attr('value', indexBoutonBack);
            $('#next').attr('value', indexBoutonNext);
            afficheLecture(listOfMovie[oscMessage.args[0]]);
            

            break;

        case "/playPercentage":
            // A COMPLETER   
            // Changer la valeur de la barre de progression :
            progress(oscMessage.args);
            break;

        default:
            break;
        }
    

});


//NE PAS TOUCHER
port.open();

var createMovie = function(m){
   
    console.log(m);
    var movie = {
        index: m[1],
        name: m[0],
      };
    
      return movie;
 
};

//NE PAS TOUCHER - permet d'envoyer un message au logiciel vidéo
var sendOscMessage = function (oscAddress, arg) {
    port.send({
        address: oscAddress,
        args: [arg]
    });

    console.log("message OSC envoyé "+oscAddress+arg);
};


$(document).ready(function(){

// A COMPLETER

        // Gestion des boutons suivant et précédent :
        $('#back').click(function (val) {
            console.log(val.target.attributes.value.value);
            let i = parseInt(val.target.attributes.value.value);
            console.log(i);
            sendOscMessage("/player/playIndex", i);
        });

        $('#next').click(function (val) {
            console.log(val.target.attributes.value.value);
            let i = parseInt(val.target.attributes.value.value);
            console.log(i);
            sendOscMessage("/player/playIndex", i);
        });

        // Gestion de la config :
        $('input').change(function(value) {
            
            if(value.target.type == 'checkbox') valeur = value.target.checked;
            else if (value.target.type == 'range') valeur = parseInt(value.target.value);
            else valeur = String (value.target.value);
            console.log(value.target.value);
            sendOscMessage(value.target.name, valeur);
        });
        
      // Fonction de chamgement de thèmes :
      $('select').change(function () {

        val = $('select option:checked').val();
        $('body').css('background-color', val);

      });


      $('#refresh').click(function() {

        listOfMovie = [];
        $('#list').html('');
        

    // Envoit un message au logiciel video pour demander un actualisation de la playlist

    sendOscMessage("/player/refreshPlaylist", 1);

    });


     // Gestion du bouton de lecture 
     $('#play').click(function() {

      play = transform(play);

       if(play) {

        sendOscMessage("/player/pause", 1);
        $('#play').attr('class', 'fas fa-play');
       } 
      else {
          sendOscMessage("/player/play", 1);
          $('#play').attr('class', 'fas fa-pause');
        } 

      });

      sendOscMessage("/player/refreshPlaylist", 1);

});

// Fonction pour mettre true et false d'une boolean sans se faire C. 
function transform(bool) {

    if(bool) return false;
    else return true;
  
  }
// Fonction pour convertir la durée en nombre de secondes :
function timeToDecimal(t) {

    var arr = t.split('h');
    var dec = parseInt((arr[1]/6)*10, 10);
  
    return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec) * 60;
  
}   

// Fonction d'actualisation toutes les 5 secondes :
function actu(){
    
    sendOscMessage("/player/Percentage");
    refreshPlayslist();
    setTimeout('actu()', 5000);

}

// fonction de gestion de la barre de progression :
function progress(value) {

    $('progress').attr('value', value);
}

function addMovie(m){

    listOfMovie.push(m);
  
} 

function htmlDivElement(movie){

    var html = `<div class='divFilm' id='${movie.index}'><div class='divIndex'>${movie.index}</div><div class='divTitle'>${movie.name}</div>`;
    // completer le code ici

      return html;
  
}

function createPlayCallback(movie){
  
    // La fonction callback doit désormais envoyé un message au lecteur vidéo
    afficheLecture(movie);


    // La fonction suivante permet de réaliser l'envoi du message.  
    sendOscMessage("/player/playIndex", movie.index);

}

function afficheLecture(movie) {


    $('.divFilm').css('background-color', 'whitesmoke');
    $('.divFilm').css('color', 'teal');
    $('.divFilm').css('margin-left', '0');
  
    $('#'+movie.index).css('background-color', 'teal');
    $('#'+movie.index).css('color', 'white');
    $('#'+movie.index).css('margin-left', '0.2em');
  
    $('#movieOnPlay').html('Film en cours : '+movie.name);
    $('#duree').html(movie.length); 
    $('title').html(movie.name);

  
    console.log('Name : '+movie.name+' Index : '+movie.index);
}



