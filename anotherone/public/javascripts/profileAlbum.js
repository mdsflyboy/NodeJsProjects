let labels = [];

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
                    labels.forEach(function(label){
                        $('#labelTracker').append(`
                            <li class="list-group-item">${label}</li>
                        `);
                    })
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
                        // output += `
                        // <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                        //     <button type="button" id="${image.id}" class="image btn border emptyBorder">
                        //         <img src="${image.baseUrl + '=w500-h200'}" height="100" id="${image.id}" class="img-fluid \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
                        //     </button>
                        // </div>
                        // `;
                        output += `
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                            <a href="/profile/photo/${albumId}/${image.id}" class="image">
                                <img src="${image.baseUrl + '=w500-h200'}" height="100" id="${image.id}" class="img-thumbnail \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
                            </a> 
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
