// var script = document.createElement('script');
// script.src = "https://ajax.googleapis.com/ajax/libs/jQuery/1.6.3/jQuery.min.js";
// document.getElementsByTagName('head')[0].appendChild(script);

// number of items in cart
var cart_items = jQuery(".amount").text().match(/\d+/);

  // calculate cart total, allowing for case where there is more than one of each item
//first, get individual item counts and push into an array 
var item_counts = jQuery(".product-details").find("strong");
var counts_array = [];
item_counts.each(function(){
  counts_array.push(parseInt((jQuery(this).text())));
})

//second, get individual item costs and push into an array
var item_prices = jQuery(".product-details").find(".price");
var price_array = [];
item_prices.each(function(){
  price_array.push(parseInt(jQuery(this).text().replace("$", "")));
})

//last, multiply each individual item count by its cost to get total
var total = 0;
for(var i=0; i< price_array.length; i++) {
    total += price_array[i]*counts_array[i];
}

// text to insert in overlay
var count_text = ["Items in your cart:", cart_items[0]].join(" ");
var total_text = ["Your total is: $", total].join("");

// item images
var item_images = jQuery(".product-image");

  // functions to call when user scrolls to bottom 10% of page
// function that creates semi-transparent black background
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

// function that creates overlay with cart details
function create_overlay(){
var d = document.createElement('div');
jQuery(d).css({
  background: 'white',
  'border-style': 'solid',
  'border-color': '#c6631d ',
  'border-width': '10px',
  padding: '10px',
  opacity: '1',
  top: "30%",
  left: '37%',
  width: '26%',
  height: '300px',
  position: 'fixed',
  zIndex: '1000000'
  }).attr('id', 'overlay');
  jQuery('body').append(d);
  // jQuery("<input type='button' value='Close' class='close' />").appendTo(jQuery("#overlay"));
  jQuery('<h3><a href="#" style="text-decoration:none; font-size: 10px, font-family:  ‘Crimson Text’. serif, right: 5px;" class="close">x</a></h3>').appendTo(jQuery("#overlay"));
  jQuery('<h3><p>'+count_text+'</p></h3>').appendTo(jQuery("#overlay"));
  jQuery('<h3><p>'+total_text+'</p></h3>').appendTo(jQuery("#overlay"));
  
jQuery('<div id="quicklook-addToWishlist"><a href="#" class="close link-wishlist feature feature-icon-hover first v-centered-content wishshlist-button"><span class="close v-center">No Thanks</span></a></div>').appendTo(jQuery("#overlay"));
jQuery('<div><a href="https://www.prana.com/checkout/onepage/" class="link-wishlist feature feature-icon-hover first v-centered-content wishshlist-button"><span class="button-cart orange v-center">Checkout</span></a></div>').appendTo(jQuery("#overlay"));

// jQuery('</h3><a href="https://www.prana.com/checkout/onepage/" style="text-decoration:none; font-size: 20px" class="button btn-cart v-center orange">Checkout</a></h3>').appendTo(jQuery("#overlay"));
  item_images.each(function( index ) {
   jQuery("#overlay").append(this);
  });

}
// function that returns true if user is logged in and false otherwise
function logged_in(){
var text = jQuery(".myAcct").text();
if (text.substring(95,102)=="Sign In"){
  return false;
}else {
  return true;
  }
}

// Window scroll listener that triggers overlay and black background if user is signed in and they haven't already been triggered 
jQuery(window).scroll(function () { 
  if ((logged_in()==false) && ((jQuery(window).scrollTop()+ jQuery(window).height()) >= (jQuery('body').height()*0.9))) {
    if (jQuery("#overlay").length == 0){
    create_background();
    create_overlay();
  } 
    jQuery( ".close" ).click(function() {
    jQuery(this).parent().parent().parent().remove(); 
    jQuery("#background").remove();
    });
  }
});


