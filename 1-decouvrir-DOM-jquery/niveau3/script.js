var listOfMovie = [];

$(document).ready(function(){

      // completer le code ici
      $('#refresh').click(function() {

        $('#list ul').html('');
        
        $.get('./playlist.txt', function(playlist) {
           
           playlist = splitFile(playlist);
  
        });
  
     });

});


function htmlDivElement(movie){

  var html = "";
// completer le code ici
  return html;

}

function createMovie(i, n, d){

  var movie = {};

// completer le code ici
  return movie;
}

function splitFile(data){
  // completer le code ici
  data = data.split('\n');

  data.forEach(e => {

    movie = e.split(',');

    listOfMovie.push({
      index: movie[0],
      name: movie[1],
      length: movie[2]
    });
    
  });
  
  console.log(listOfMovie);
}

function addMovie(m){

  listOfMovie.push(m);

}
    






