$(function () {
  var $form = $('#mc-embedded-subscribe-form');

  $('#mc-embedded-subscribe').unbind('click').on('click', function(e) {
    if(e) event.preventDefault();
    register($form);
  });
});

function register($form) {
  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache: false,
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    error: function(err) {
      errorMessage('Yikes. Something went wrong :( ');
    },
    success: function(data) {
      if (data.result != "success") {
        errorMessage(data.msg.substring(4));
      }
      else {
        successMessage("Almost done, please confirm your email.");
        $('#mce-EMAIL').val('');
      }
    }
  });
}

// Messaging Function
function showMessage($message, $color, $delay) {
  var $msg = $(document.createElement('span'))
  .addClass('mce-message')
  .css('background-color', $color)
  .html($message);

  $('#mce-response-container').html($msg);
  setTimeout(function() { $('.mce-message').fadeOut(1000); }, $delay);
}
function successMessage($message) { showMessage($message, 'rgba(0,118,61,.8)', '6000'); }
function errorMessage($message)   { showMessage($message, 'rgba(139,0,0,.8)', '2000'); }
