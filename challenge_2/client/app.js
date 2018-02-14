
// this file will hold all of the functionality for the client side

//use jquery 

//submit button on click will submit a post request using ajax

$('.submitBtn').on('click', () => {
  let message = $('.inputField').val();
  if (message.length > 0) {
    if(message.slice(-1) === ';') {
      message = message.slice(0, -1);
    }
    post(message);
  }
});

const post = (message) => {
    $.ajax({
    url: 'http://localhost:3000/',
    type: 'POST',
    header: {
      'content-type': 'application/json'
    },
    async: true,
    crossDomain: true,
    data: message,
    // data: message,
    success: (data) => {
      $('.inputField').val('');
      $('.formBox').prepend('<div class="csvData"><p class="csvRow"></p></div>')
      data.forEach((subArr) => {
        $('.csvRow').append(subArr + '<br>');
      })
    },
    error: (error) => {
      console.log('error - post did not work', error)
    }
  })
}