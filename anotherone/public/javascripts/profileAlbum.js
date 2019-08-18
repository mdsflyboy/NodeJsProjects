let clicked = {};
const albumId = window.location.href.split('/')[5];

/*
    1. Fetch all the images from the server at once
    2. store them in an object
    3. add a refresh button to update the images
    4. use client side code for filtering
*/


function imageLoader(albumId, image){
    return `
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
}

let addScrollEvent = function(){
    this.triggered = false;
    $('#imageScroller').scroll(function() {
        // console.log(Object.keys(clicked).length);
        if(Object.keys(clicked).length > 0){
            return;
        }
        let imgScroll = $(this);
        const scrolled = imgScroll.scrollTop();
        const totalScroll = imgScroll.prop('scrollHeight') - imgScroll.prop('clientHeight');
        // console.log(scrolled, totalScroll);

        const percentScroll = scrolled/totalScroll;
        // console.log(percentScroll);

        if(percentScroll >= 0.9 && !triggered){
            triggered = true;
            console.log('triggered');
            loadImages().then(function(){
                console.log('finished');
                triggered = false;
            });
        }
    });
    console.log('adding scroll Event')
};

let addClickEvents = function(){
    $('.clickableLabels').one('click',function(){
        $(this).toggleClass('active');
        let id = $(this).attr('id')
        if($(this).hasClass('active')){
            clicked[id] = id;
            clearImages();
            for(label in clicked){
                loadImagesWithLabel(label);
            }
        }else{
            delete clicked[id];
            if(Object.keys(clicked).length === 0){
                nextPageToken = '';
                clearImages();
                loadImages();
            }else{
                clearImages();
                for(label in clicked){
                    loadImagesWithLabel(label);
                }
            }
        }
        $('#clicked').html(JSON.stringify(clicked));
    });
}

let clearImages = function(){
    $('#imageScroller').html('');
}

let loadLabelSelector = function(){
    fetch(`/ajax/album/${albumId}/getLabels`).then(function(res){
        $('#labelTracker').html('');
        return res.json();
    }).then(function(labels){
        console.log(labels);
        // labels.forEach(function (label){
        for(label in labels){
            let active = ''
            if(clicked[label]){
                active = 'active';
            }
            $('#labelTracker').append(` 
                <button type="button" id="${label}" class="clickableLabels list-group-item list-group-item-action ${active}">
                    ${label}
                </button>
            `);
        }
    }).then(function(){
        addClickEvents();
    });
}

let loadLabels = function(){
    $('.imageLabels').each(function(index){
        const id = $(this).attr('id');
        // console.log(`index: ${index}`);
        fetch(`/ajax/labels/${id}`).then(function(res) {
            return res.json();
        }).then((data) => {
            let itemsProcessed = 0;
            if(data.message){
                throw "No labels";
            }
            console.log(data);
            $(this).html('');
            data.forEach((label, index, array)=>{
                console.log(label);
                $(this).append(`
                    <li class="list-group-item disabled">${label}</li>
                `);
                itemsProcessed++;
                // if(itemsProcessed === array.length){
                    // let ctn = 0;
                    // labels.forEach(function(label, index, array){
                    //     ctn++;
                    //     if(ctn === array.length){
                    //         addClickEvents();
                    //     }
                    // });
                // }
            });
        }).catch(function(err){
        });
    });
};

let loadImages = function(){
    // fetch(`/ajax/photos/${albumId}/${nextPageToken}`).then(function(res){
    return fetch(`/ajax/photos/${albumId}/${nextPageToken}`).then(function(res){
        if(nextPageToken===''){
            loadLabelSelector();
            // addClickEvents();
        }
        return res.json();
    }).then(function(msg){
        let cnt = 0;
        output = '';
        nextPageToken = msg.nextPageToken;
        msg.images.forEach(function(image, index, array){
            output += imageLoader(albumId, image);
            cnt++;
            if(cnt === array.length){
                $('#imageScroller').append(output);
                addScrollEvent();
                loadLabels();
            }
        });
    });
}

let loadImagesWithLabel = function(label){
    let url = `/ajax/photos/${albumId}/withLabel/${label}`;
    fetch(url).then(function(res){
        loadLabelSelector();
        // addClickEvents();
        return res.json();
    }).then(function(images){
        let output = '';
        let cnt = 0;
        console.log(images);
        images.forEach(function(image, index, array){
            output += imageLoader(albumId, image);
            cnt++;
            if(cnt === array.length){
                $('#imageScroller').append(output);
                loadLabels();
            }
        });
    });
}

$(document).ready(function () {
    // loadLabelSelector();
    loadImages();
});
