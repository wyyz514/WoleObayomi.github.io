$(document).ready(function(){
  $('#payment-form').card({container:".card-wrapper",
                          formSelectors:{
                            "expiryInput":"input[name='expiry-month'],input[name='expiry-year']"
                          }
                          });

var glex = (function(){
    function createToken()
    {
      console.log("Creating token");
      var form = $("#payment-form");
      $('.transmit').attr("disabled",true);
      $('.transmit').html("Processing");
      Stripe.card.createToken({
        number: $('input[name="number"]').val().trim(),
        cvc: $('input[name="cvc"]').val().trim(),
        exp_month: $('input[name="expiry-month"]').val().trim(),
        exp_year: parseInt($('input[name="expiry-year"]').val().trim()) + 2000
      },stripeResponseHandler);
      
      return false;
    }
    
  function stripeResponseHandler(status, response) 
  {
    var form = $("#payment-form");

    if(response.error)
    {
      switch(response.error.code)
      {
          case "invalid_number":
            $('.errors').text("Your card number is invalid or incorrect.");
          break;
          
          case "invalid_expiry_year":
            $('.errors').text("Your card expiration year is invalid or incorrect.");
          break;
          
          case "invalid_expiry_month":
            $('.errors').text("Your card expiration month is invalid or incorrect.");
          break;
          
          case "invalid_cvc":
            $('.errors').text("Your card security code is incorrect.");
          break;
          
          default:
            $('.errors').text("Sorry, an unknown error was encountered");
          break;
      }
        $(".transmit").attr("disabled",false);
        $(".transmit").html("Transmit and Pay");
        $(".errors").fadeIn("slow").delay(3000).fadeOut("slow");
    } //ali is the man
    else 
    {
      var token = response.id;
      console.log(token);
      var total = ((parseFloat($('input[name="amount"]').val()) * 1.029) + 0.37).toFixed(2);
      console.log("Total:",total);
      form.append($('<input type="hidden" name="stripeToken" />').val(token));
      var cardholder = $('input[name="name"]').val();
      var email = $('input[name="email"]').val();
      $.ajax({
        type:"POST",
        url:"assets/lib/stripe-php-1.16.0/lib/payment.php",
        data:{
          "stripeToken":token,
          "amount":total,
          "cardholder":cardholder,
          "email":email
        },
        success:function()
        {
          $('input').val("");
          showModal();
        },
        error:function(error)
        {
          document.querySelector(".transmit").removeAttribute("disabled");
          document.querySelector(".transmit").innerHTML = "Transmit and Pay";
          console.log(error);
        }
      });
    }
  };

  function showModal()
  {
    $(".modal").fadeIn("fast");
  }
  
  function hideModal()
  {
    $(".modal").fadeOut("fast");
  }
  
  $("#modal-close").click(function(){
    hideModal();
  });
  
  return {
    createToken:createToken
  }
  })();
  
  $("#payment-form").submit(function(ev){
    glex.createToken();
    ev.preventDefault();
  });

});