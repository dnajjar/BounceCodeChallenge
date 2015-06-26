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
  jQuery('<a title="Close" class="close fancybox-item fancybox-close" href="javascript:;"></a>').appendTo(jQuery("#overlay"));
  jQuery('<div id="lightbox-tagline" style="font-size: 18px">Forget Something?</div><br><br>').appendTo(jQuery("#overlay"));
  jQuery('<h3 style="font-size: 16px">'+count_text+'</h3>').appendTo(jQuery("#overlay"));
  jQuery('<h3 style="font-size: 16px">'+total_text+'</h3>').appendTo(jQuery("#overlay"));
  item_images.each(function( index ) {
   jQuery("#overlay").append(this);
  });
  jQuery("#overlay").append('<br><br>');
  jQuery('<a href="https://www.prana.com/checkout/onepage/" target="_parent"><button type="submit" class="button btn-cart v-center orange"><span><span>Checkout</span></span></button></a><br>').appendTo(jQuery("#overlay"));
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
    jQuery(this).parent().remove(); 
    jQuery("#background").remove();
    });
  }
});


