$(function(){

    let contactForm = $('#contact');
    let messageBox = $('errorBox');
    let formData = $(contactForm).serialize();
    $.ajax({
        type: 'POST',
        url: $(contactForm).attr('action'),
        data: formData
    })
    .done(function(response) {
        $(messageBox).text(response);
    })
    .fail(function(data) {
        if(data.responseText !== '') {
            $(messageBox).text(data.responseText);
        } else {
            $(messageBox).text('It went wrong. Oops');
        }
    });
});
