<?php include 'Stripe.php';
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here https://dashboard.stripe.com/account
  //Stripe::setApiKey("sk_test_lCsx2TDOdGEWKHmjO6xuKGV1");
  Stripe::setApiKey("sk_live_mMROAU3aTk1UPFVuWDLmP7o7");
  // Get the credit card details submitted by the form
  $token = $_POST['stripeToken'];
  $amount = $_POST['amount'];
  $cardholder = $_POST['cardholder'];
  $email = $_POST["email"];
  // Create the charge on Stripe's servers - this will charge the user's card
  try {
    $charge = Stripe_Charge::create(array(
    "amount" => $amount * 100, // amount in cents, again
    "currency" => "cad",
    "card" => $token,
    "description" => $cardholder,
    "receipt_email" => $email)
    );
  } catch(Stripe_CardError $e) {
  // The card has been declined
}
?>