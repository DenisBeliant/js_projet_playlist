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
            afficheLecture(movie);

            break;

        case "/playPercentage":
            // A COMPLETER   
            // Changer la valeur de la barre de progression :
            progress(ocsMessage.args);
            break;
    
        default:
            break;
    }
});

//NE PAS TOUCHER
port.open();

var createMovie = function(m){
   
    var movie = {
        index: m[0],
        name: m[1],
        length: m[2],
        rank: m[3]
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

        // Gestion de la config :
        $('input').change(function(value) {
            
            if(value.target.type == 'checkbox') valeur = value.target.checked;
            else valeur = value.target.value;
            console.log(valeur);
            sendOscMessage(value.target.name, valeur);

        });
      // Fonction de chamgement de thèmes :
      $('select').change(function () {

        val = $('select option:checked').val();
        $('body').css('background-color', val);

      });


      $('#refresh').click(function() {

        visible = transform(visible);
        console.log(visible);

        if(visible) {
          
          $('#list').empty();
          listOfMovie = [];
          
          $.get('./playlist.txt', function(playlist) {
             
             playlist = splitFile(playlist);
  
             listOfMovie.forEach(e => {
  
               $('#list').append(htmlDivElement(e));
  
               // Callback quand on clique sur le bouton play d'un film
               $('#'+e.index).click(function() {
              

                createPlayCallback(e);
               });  
  
             });
          });

          $('#list').show('slow');

        }

        else $('#list').hide('slow');

     });

     // Gestion du bouton de lecture 
     $('#play').click(function() {

      play = transform(play);

       if(play) {

        sendOscMessage("/player/pause", 1);
        $('#play').attr('class', 'fas fa-pause');
       } 
      else {
          sendOscMessage("/player/play", 1);
          $('#play').attr('class', 'fas fa-play');
        } 

      });

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

// Fonction d'actualisation toutes les secondes :
function actu(){
    
    sendOscMessage("/playPercentage");
    setTimeout('actu()', 1000);

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

function splitFile(data){

    data = data.split('\n');
  
    data.forEach(e => {
  
      movie = e.split(',');
      console.log(movie);
      addMovie(createMovie(movie[0], movie[1], movie[2], movie[3]));
      
    });
    
}
 
function addMovie(m){

    listOfMovie.push(m);
  
} 

function htmlDivElement(movie){

    var html = "<div class='divFilm' id='"+movie.index+"'><i class='fas fa-play underFilm'></i><div class='divIndex'>"+movie.index+"</div><div class='divTitle'>"+movie.name+" :"+movie.length+"</div><div class='rank'>"+rank(movie.rank)+"</div></div>";
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
    $('#'+movie.index).css('margin-left', '0.8em');
  
    $('#movieOnPlay').html('Film en cours : '+movie.name);
    $('#duree').html(movie.length); 
    $('title').html(movie.name);
  
    console.log('Name : '+movie.name+' Index : '+movie.index);
}

function refreshPlayslist(){

    console.log("Refresh playlist");  
    // A COMPLETER
    
    // Envoit un message au logiciel video pour demander un actualisation de la playlist
    sendOscMessage("/player/refreshPlaylist", 1);
}



