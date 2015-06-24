
// number of items in cart
var cart_items = jQuery(".amount").text().match(/\d+/);
// calculate cart total, allowing for case where there is more than one of each item

//get individual item counts and push into an array 
var item_counts = jQuery(".product-details").find("strong");
var counts_array = [];
item_counts.each(function(){
  counts_array.push(parseInt((jQuery(this).text())));
})

// get individual item costs and push into an array
var item_prices = jQuery(".product-details").find(".price");
var price_array = [];
item_prices.each(function(){
  price_array.push(parseInt(jQuery(this).text().replace("$", "")));
})

// multiply each individual item count by its cost to get total
var total = 0;
for(var i=0; i< price_array.length; i++) {
    total += price_array[i]*counts_array[i];
}

// number of unique items: 
var unique_items = jQuery(".product-details").find("strong").length;

// text to insert in overlay
var count_text = ["Items in your cart:", cart_items[0]].join(" ");
var total_text = ["Your total is: $", total].join("");
// item images

var item_images = jQuery(".product-image");

// functions to call on scroll to bottom 10%
// semi transparent black background
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

// overlay with cart details

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
  jQuery('<p>'+total_text+'</p>').appendTo(jQuery("#overlay"));
  item_images.each(function( index ) {
   jQuery("#overlay").append(this);
  });
}
// scroll listener 

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

