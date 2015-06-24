
// number of items in cart
var cart_items = jQuery(".amount").text().match(/\d+/);

// item counts in an array 
var item_counts = jQuery(".product-details").find("strong");

// item costs 
var item_prices = jQuery(".product-details").find(".price");

// number of unique items: 
var unique_items = jQuery(".product-details").find("strong").length;

// count of each item
var item_count = parseInt(jQuery(".product-details").first().find("strong").text())

// text to insert in overlay
var count_text = ["Items in your cart:", cart_items[0]].join(" ");

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
  left: '37%',
  width: '26%',
  height: '300px',
  position: 'fixed',
  zIndex: '1000000'
  }).attr('id', 'overlay');
  jQuery('body').append(d);
  jQuery("<input type='button' value='Close' class='close' />").appendTo(jQuery("#overlay"));
  jQuery('<a href="https://www.prana.com/checkout/onepage/" style="text-decoration:none;">CHECKOUT</a>').appendTo(jQuery("#overlay"));
  jQuery('<p>'+count_text+'</p>').appendTo(jQuery("#overlay"));
  // jQuery("#overlay").prepend('<div class="close" style="color: white">close</div>');
}

jQuery(window).scroll(function () { 
  if ((jQuery(window).scrollTop()+ jQuery(window).height()) >= (jQuery('body').height()*0.9)) {
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

// jQuery( ".close" ).click(function() {
//   jQuery( this ).parent().remove();
//   jQuery("#background").remove();
// });

