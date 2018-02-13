
// this file will hold all of the functionality for the client side

//use jquery 

//submit button on click will submit a post request using ajax

$('.submitBtn').on('click', () => {
  $.ajax({
    'url': '/',
    'method': 'POST',
    'content-type': 'application/json',
    'data':,
    success: (data) => {
      console.log('successfully sent', data);
    },
    error: (error) => {
      console.log('this shit didn\'t work!!', error)
    }
  })
});