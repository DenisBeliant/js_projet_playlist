var listOfMovie = [];

$(document).ready(function(){

      // completer le code ici
      $('#refresh').click(function() {

        $('#list').empty();
        listOfMovie = [];
        
        $.get('./playlist.txt', function(playlist) {
           
           playlist = splitFile(playlist);

           listOfMovie.forEach(e => {
             $('#list').append(htmlDivElement(e));

             // Callback quand on clique sur le bouton play d'un film
             $('#'+e.index).click(function() {
                  console.log(e.name);
                  $('h1').html('Film en cours : '+e.name);
                  $('#duree').html(e.length); 
             });  

           });
        });

  
     });

});

// Fonction pour convertir la durée en nombre de secondes :
function timeToDecimal(t) {

  var arr = t.split('h');
  var dec = parseInt((arr[1]/6)*10, 10);

  return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec) * 60;

}   

// fonction de gestion de la barre de progression :
function progress(value, max) {

}

function rank(star) {
  
  var html = '<i class="fas fa-star"></i>';
  for(i = 0; i < star /2;i++) {
    html += html;
  }
  return html;
}

function htmlDivElement(movie){

  var html = "<div class='divFilm'><i class='fas fa-play underFilm' id='"+movie.index+"'></i><div class='divIndex'>"+movie.index+"</div><div class='divTitle'>"+movie.name+" durée : "+movie.length+"</div><div class='rank'>"+rank(movie.rank)+"</div></div>";
// completer le code ici
  return html;

}

function createMovie(i, n, d, r){

  var movie = {
    index: i,
    name: n,
    length: d,
    rank: r
  };

// completer le code ici
  return movie;
}

function splitFile(data){
  // completer le code ici
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
    
function createPlayCallback(movie) {

}




