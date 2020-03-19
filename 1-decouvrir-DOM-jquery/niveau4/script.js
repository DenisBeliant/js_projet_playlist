var listOfMovie = [];
let play = false;
let visible = false;

$(document).ready(function(){

      // completer le code ici
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
              
                    $('h1').html('Film en cours : '+e.name);
                    $('#duree').html(e.length); 
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

       if(play) $('#play').attr('class', 'fas fa-pause');
        else $('#play').attr('class', 'fas fa-play');

        console.log(play);
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




