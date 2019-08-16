let labels = [];
let clicked = {};

let addClickEvents = function(){
    $('.clickableLabels').click(function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            clicked[$(this).attr('id')] = $(this).attr('id');
        }else{
            delete clicked[$(this).attr('id')];
        }
        $('#clicked').html(JSON.stringify(clicked));
    });
}

let loadLabels = function(){
    $('.imageLabels').each(function(index){
        const id = $(this).attr('id');
        // console.log(`index: ${index}`);
        fetch(`/ajax/labels/${id}`).then(
        function(res) {
            return res.json();
        }).then((data) => {
            $(this).html('');
            let itemsProcessed = 0;
            data.forEach((label, index, array)=>{
                console.log(label);
                if(!labels.includes(label)){
                    labels.push(label);
                }
                $(this).append(`
                    <li class="list-group-item disabled">${label}</li>
                `);
                itemsProcessed++;
                if(itemsProcessed === array.length){
                    $('#labelTracker').html('');
                    let ctn = 0;
                    labels.forEach(function(label, index, array){
                            // <button type="button" class="btn" >
                            // </button>
                                // <li class="list-group-item">
                                // </li>
                        $('#labelTracker').append(` 
                            <button type="button" id="${label}" class="clickableLabels list-group-item list-group-item-action">
                                ${label}
                            </button>
                        `);
                        ctn++;
                        if(ctn === array.length){
                            addClickEvents();
                        }
                    });
                }
            });
        }).catch(function(err){
        });
    });
};

$(document).ready(function () {
    loadLabels();
    $('#imageScroller').scroll(function() {
        let imgScroll = $(this);
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
                            <div class="card my-1">
                                <a href="/profile/photo/${albumId}/${image.id}" class="image">
                                    <img src="${image.baseUrl +'=w500-h300'}" id="${image.id}" class="card-img-top" alt="">
                                </a> 
                                <div class="card-body">
                                    <h6>Labels:</h6>
                                    <ul class="list-group list-group-flush py-6 imageLabels" id="${image.id}">
                                    </ul>
                                </div>
                            </div>
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
});
