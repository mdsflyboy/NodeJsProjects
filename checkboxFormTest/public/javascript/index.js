$(document).ready(function() {
    let selectedImages = {};
    $('#myBtn').click(() => {
        $('#myBtn').toggleClass("border-0");
        $('#myBtn').toggleClass("border-primary");
        selectedImages['myBtn'] = $('#myBtn').hasClass("border-primary");
        $('#selectedImages').html(JSON.stringify(selectedImages));
    });
});