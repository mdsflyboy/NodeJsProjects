$(function () {
    let selectedImages = {};

    $('#imageScroller').on('click', '.image' ,function(){
        let id = $(this).attr("id");
        // id = $(this);
        $(this).toggleClass('emptyBorder');
        $(this).toggleClass('border-primary');
        let val = $(this).hasClass('border-primary');
        selectedImages[id] = val;
        // console.log($(this), id);
        $('#textHolder').html(JSON.stringify(selectedImages));
    });

    $('#load').click(function(){
        let imageArray = [];
        for(let key in selectedImages){
            if(selectedImages[key]){
                imageArray.push(key);
            }
        }
        // console.log(imageArray);
        let data = {label:'rando', imageArray};
        $.ajax({
            url: '/ajax/photos/setLabel',
            dataType: 'text',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $('#imageScroller').scroll(() => {
        let imgScroll = $('#imageScroller');
        const scrolled = imgScroll.scrollTop();
        const totalScroll = imgScroll.prop('scrollHeight') - imgScroll.prop('clientHeight');
        // console.log(scrolled, totalScroll);

        const percentScroll = scrolled/totalScroll;
        // console.log(percentScroll);

        if(percentScroll == 1){
            // alert(`You've reached the bottom! `);
            let albumId = window.location.href.split('/')[5];
            // console.log(albumId);
            let url = `/ajax/photos/${albumId}/${nextPageToken}`;
            console.log(nextPageToken,url);
            const settings = {
                url,
                contentType: 'application/json',
                success: function(res){
                    nextPageToken = res.nextPageToken;
                    let output = imgScroll.html();
                    let counter = 0;
                    res.images.forEach((image, index, array) => {
                        output += `
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <button type="button" id="${image.id}" class="image btn border emptyBorder">
                                <img src="${image.baseUrl + '=w500-h200'}" height="100" id="${image.id}" class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
                            </button>
                        </div>
                        `;
                        counter++;
                        if(counter === array.length){
                            imgScroll.html(output);
                            bindButtons();
                        }
                    });
                }
            }
            $.ajax(settings);
        }
    });
})
