let images = {};
let clicked = {};
const albumId = window.location.href.split('/')[5];

function imageLoader(image){
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

function labelLoader(label){
    return `
        <li class="list-group-item disabled">${label}</li>
    `;
}

function labelSelectLoader(label){
    let active = ''
    if(clicked[label]){
        active = 'active';
    }
    return  ` 
                <button type="button" id="${label}" class="clickableLabels list-group-item list-group-item-action ${active}">
                    ${label}
                </button>
            `
}

let addClickEvents = function(){
    $('.clickableLabels').on('click',function(){
        $(this).toggleClass('active');
        let id = $(this).attr('id')
        if($(this).hasClass('active')){
            displayAllImagesWithLabels(clicked);
            clicked[id] = id;
        }else{
            delete clicked[id];
            if(Object.keys(clicked).length === 0){
                // displayAllImages();
                nextPageToken = '';
            }else{
                // displayAllImagesWithLabels(clicked);
            }
        }
        $('#clicked').html(JSON.stringify(clicked));
    });
}

let loadImages = function(){
    fetch(`/ajax/fullPhoto/${albumId}`).then(function(res){
        return res.json();
    }).then(function(data){
        nextPageToken = data.nextPageToken;
        let cpy = data.images;
        let obj = cpy.reduce(function(tmp, image){
            tmp[image.id] = image;
            return tmp;
        }, {});
        images = obj;
        console.log(images);
        return data.images;
    }).then(function(images){
        images.forEach(function(image){
            $('#imageScroller').append(imageLoader(image));
            if(image.labels){
                image.labels.forEach(function(label){
                    $(`.imageLabels#${image.id}`).append(labelLoader(label));
                });
            }
        });
    });
}

let displayAllImages = function(){
    $('#imageScroller').html('');
    images.forEach(function(image){
        $('#imageScroller').append(imageLoader(image));
        if(image.labels){
            image.labels.forEach(function(label){
                $(`.imageLabels#${image.id}`).append(labelLoader(label));
            });
        }
    })
}

let loadLabelSelector = function(){
    fetch(`/ajax/album/${albumId}/getLabels`).then(function(res){
        return res.json();
    }).then(function(data){
        for(label in data){
            $('#labelTracker').append(labelSelectLoader(label))
        }
    }).then(function(){
        addClickEvents();
    });
}

let displayAllImagesWithLabels = function(labels){
    $('#imageScroller').html('');
    for(label of clicked){
        fetch(`/ajax/photoIdsWithLabel/${albumId}/${label}`).then(function(res){
            return res.json();
        }).then(function(medias){
            for(media of medias){
                if(images[media]){
                    $('#imageScroller').append(imageLoader(image[media]));
                }
            }
        })
    }
}

$(document).ready(function(){
    loadLabelSelector();
    loadImages();
});