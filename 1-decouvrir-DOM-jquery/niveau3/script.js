var listOfMovie = [];

$(document).ready(function(){

      // completer le code ici
      $('#refresh').click(function() {

        $('#list ul').html('');
        
        $.get('./playlist.txt', function(playlist) {
           
           playlist = splitFile(playlist);

           listOfMovie.forEach(e => {
             $('#list ul').append(htmlDivElement(e));
           });
        });
  
     });

});


function htmlDivElement(movie){

  var html = "<div class='divFilm'><div class='divIndex'>"+movie.index+"</div><div class='divTitle'>"+movie.name+" durée : "+movie.length+"</div>";
// completer le code ici
  return html;

}

function createMovie(i, n, d){

  var movie = {
    index: i,
    name: n,
    length: d
  };

// completer le code ici
  return movie;
}

function splitFile(data){
  // completer le code ici
  data = data.split('\n');

  data.forEach(e => {

    movie = e.split(',');

    
    addMovie(createMovie(movie[0], movie[1], movie[2]));
    
  });
  
}

function addMovie(m){

  listOfMovie.push(m);

}
    






