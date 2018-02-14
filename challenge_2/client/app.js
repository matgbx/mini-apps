
// this file will hold all of the functionality for the client side

//use jquery 

//submit button on click will submit a post request using ajax

$('.submitBtn').on('click', () => {
  let message = $('.inputField').val();
  $.ajax({
    url: 'http://127.0.0.1:3000/',
    method: 'POST',
    'content-type': 'application/json',
    data: message,
    // data: message,
    success: (data) => {
      console.log('successfully sent', message);
    },
    error: (error) => {
      console.log('error - post did not work', error)
    }
  })
  console.log($('.inputField').val());
});