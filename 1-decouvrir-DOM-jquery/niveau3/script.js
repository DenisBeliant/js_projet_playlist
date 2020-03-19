var listOfMovie = [];

$(document).ready(function(){

      // completer le code ici
      $('#refresh').click(function() {

        $('#list ul').html('');
        
        $.get('./playlist.txt', function(playlist) {
           
           playlist = splitFile(playlist);
  
           let listOfMovie = [];
  
           playlist.forEach(element => {
              listOfMovie.push(element);
           });
  
           listOfMovie.forEach(e => {
                 htmlDivElement(e);
           });
  
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
    e.split(',');
  });

  return data;
  
}

function addMovie(m){

  listOfMovie.push(m);

}
    






