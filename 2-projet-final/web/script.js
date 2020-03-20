listOfMovie = [];
let play = false;
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
            $("#list").append(htmlDivElement(movie));
            createPlayCallback(movie);

            break;
        case "/playIndex":
            console.log("Recu playIndex", oscMessage); 
            // A COMPLETER           
            break;

        case "/playPercentage":
            // A COMPLETER   
            // Changer la valeur de la barre de progression :

            break;
    
        default:
            break;
    }
});

//NE PAS TOUCHER
port.open();

var createMovie = function(i, n, d, r){
   
    var movie = {
        index: args.i,
        name: args.n,
        length: args.d,
        rank: args.r
      };
    
      return movie;
 
};

//NE PAS TOUCHER - permet d'envoyer un message au logiciel vidéo
var sendOscMessage = function (oscAddress, arg) {
    port.send({
        address: oscAddress,
        args: [arg]
    });

    console.log("message OSC envoyé");
};



$(document).ready(function(){

// A COMPLETER
    $('#refresh').click(function() {

    visible = transform(visible);
    console.log(visible);

    if(visible) {
        
        $('#list').empty();
        listOfMovie = [];
        
        playlist = refreshPlayslist();
            
            playlist = splitFile(playlist);
            

            listOfMovie.forEach(e => {

            $('#list').append(htmlDivElement(e));

            // Callback quand on clique sur le bouton play d'un film
            $('#'+e.index).click(function() {
            
            $('progress').attr('max', e.length);
            createPlayCallback(e);
            });  

        });

        $('#list').show('slow');

    }

    else $('#list').hide('slow');

    });

    // Gestion du bouton de lecture 
    $('#play').click(function() {

    play = transform(play);

    if(play) $('#play').attr('class', 'fas fa-pause');
    else $('#play').attr('class', 'fas fa-play');

    });

});
// Fonction pour convertir la durée en nombre de secondes :
function timeToDecimal(t) {

    var arr = t.split('h');
    var dec = parseInt((arr[1]/6)*10, 10);
  
    return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec) * 60;
  
}   

// fonction de gestion de la barre de progression :
function progress(value) {

    $('progress').attr('value', value);
}

// Fonction affichage des étoiles :
function rank(star) {

var html = '<i class="fas fa-star"></i>';

    for(i = 0; i < star-1;i++) {
        html += '<i class="fas fa-star"></i>';
    }

return html;
}


function htmlDivElement(movie){

    var html = "<div class='divFilm'><i class='fas fa-play underFilm' id='"+movie.index+"'></i><div class='divIndex'>"+movie.index+"</div><div class='divTitle'>"+movie.name+" :"+movie.length+"</div><div class='rank'>"+rank(movie.rank)+"</div></div>";
    // completer le code ici
      return html;
  
}

function createPlayCallback( movie){
  
    // La fonction callback doit désormais envoyé un message au lecteur vidéo
    $('h1').html('Film en cours : '+movie.name);
    $('#duree').html(movie.length); 
    // La fonction suivante permet de réaliser l'envoi du message.  
    sendOscMessage("/player/playIndex", movie.index);

}

function refreshPlayslist(){

    console.log("Refresh playlist");  
    // A COMPLETER

    
    // Envoit un message au logiciel video pour demander un actualisation de la playlist
    sendOscMessage("/player/refreshPlaylist", 1);
}



