
//  AFFICHAGE MENU

$('.index-button').magnificPopup({
  type:'inline',
  mainClass:'table',
  midClick: true
});

var magnificPopup = $.magnificPopup.instance;
$('.white-popup a').click( function () {
  magnificPopup.close();
});


// Print menu change

// $( ".formats-menu" )
//   .change(function () {
//     var str = "<style media='print'>@page{size:";
//     $( "select option:selected" ).each(function() {
//       str += $( this ).attr('data-width') +
//         " " + $( this ).attr('data-height') +
//         ";}</style>";
//     });
//     $( "head" ).append(str);
//   }).change();


  // lazyload
