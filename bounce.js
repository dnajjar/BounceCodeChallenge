jQuery(".price").text()

jQuery(window).scroll(function () { 
  if (jQuery(window).scrollTop() > jQuery('body').height()*0.5) {
    if (jQuery("#overlay").length == 0){
    create_background();
    create_overlay();
  } 
    jQuery( ".close" ).click(function() {
    jQuery( this ).parent().remove();
    jQuery("#background").remove();
    });
  }
});

function create_background() {
  var d = document.createElement('div');
  jQuery(d).css({
  background: 'black',
  opacity: '0.5',
  width: '100%',
  height: '2420px',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 100000
          
  }).attr('id', 'background');

  jQuery('body').append(d);
}

function create_overlay(){
var d = document.createElement('div');
jQuery(d).css({
  background: '#CF5300',
  opacity: '1',
  top: "20%",
  left: '40%',
  width: '20%',
  height: '300px',
  position: 'fixed',
  zIndex: '1000000'
  }).attr('id', 'overlay');
  jQuery('body').append(d);
  jQuery("<input type='button' value='Close' class='close' />").appendTo(jQuery("#overlay"));

  // jQuery("#overlay").prepend('<div class="close" style="color: white">close</div>');
}
// jQuery( ".close" ).click(function() {
//   jQuery( this ).parent().remove();
//   jQuery("#background").remove();
// });

