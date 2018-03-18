$(function(){

  Stripe.setPublishableKey('pk_test_1Mxb2g2oro7E0pyqmpBYeIUu');

  $('#search').keyup(function(){
  	 var search_term = $(this).val();

  	 $.ajax({
        method: 'POST',
        url: '/api/search',
        data: {
        	search_term
        },
        dataType: 'json',
        success: function(results){
           var data = results.hits.hits.map(function(hit) {
              return hit;
           });
           
           $('#searchResults').empty();
           for(var i=0;i<data.length;i++){
           	   var html = "";
               html += '<div class="col-md-4">';
               html += '<a href="/product/' + data[i]._id + '">';
               html += '<div class="thumbnail">';
               html += '<img src="' + data[i]._source.image + '">';
               html += '<div class="caption">';
               html += '<h3>' + data[i]._source.name + '</h3>';
               html += '<p>Rs.' + data[i]._source.price + '</p>';
               html += '</div>';
               html += '</div>';
               html += '</a>';
               html += '</div>';
               $('#searchResults').append(html);
           }
        },
        error: function(err){
        	console.log(err);
        }
  	 });
  })


$(document).on('click','#plus',function(e){
     e.priventDefault;
     var priceval = parseFloat($('#priceHidden').val());
     var totalPrice = parseFloat($('#priceValue').val()) + priceval;
     var quantity = parseInt($('#quantity').val());
     quantity += 1;
     $('#priceValue').val(totalPrice.toFixed(2));
     $('#quantity').val(quantity);
     $('#total').html(quantity);
});

$(document).on('click','#minus',function(e){
     e.priventDefault;
     var priceval = parseFloat($('#priceHidden').val());
     var quantity = parseInt($('#quantity').val());
     if(quantity === 1){
      var totalPrice = parseFloat($('#priceHidden').val());
      quantity = 1;
     }else{
      var totalPrice = parseFloat($('#priceValue').val()) - priceval;
      quantity -= 1;
     }
     $('#priceValue').val(totalPrice.toFixed(2));
     $('#quantity').val(quantity);
     $('#total').html(quantity);
});


  function stripeResponseHandler(status, response) {
    var $form = $('#payment-form');

    if (response.error) {
      // Show the errors on the form
      $form.find('.payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {
      // response contains id and card, which contains additional card details
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      $form.get(0).submit();
    }
  };


  $('#payment-form').submit(function(event) {
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });











});