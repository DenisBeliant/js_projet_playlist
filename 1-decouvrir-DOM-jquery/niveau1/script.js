$(document).ready(function() {

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

   $('#list ul').click(function() {
      let titre = $('li').html();
      console.log(titre);
   });

});


function htmlDivElement(name) {

   console.log(name);
   $('#list ul').append('<div class="divFilm"> <li> '+name+'</li></div>');

}

function splitFile(data) {

   return data.split('\n');

}


// $.ajax({
//     type: "GET",
//     url: "playlist.txt",
//     error:function(msg){
//              // message en cas d'erreur :
//              alert( "Error !: " + msg );
//              },
//     success:function(data){
//              // affiche le contenu du fichier dans le conteneur dédié :
//              $('#list').text(data);
//              }
//     });
