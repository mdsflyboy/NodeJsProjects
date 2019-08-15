$(document).ready(function() {
    let selectedImages = {};
    $('.image').click(function(){
        let id = $(this).attr('id');
        // console.log(id);
        // console.log(this);
        // $(this).toggleClass("border-0");
        $(this).toggleClass("emptyBorder");
        $(this).toggleClass("border-primary");
        let val = $(this).hasClass("border-primary")
        selectedImages[id] = val;
        $('#selectedImages').html(JSON.stringify(selectedImages));
    });
});