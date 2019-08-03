$(function () {
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
                            <a href="${image.productUrl}" target="_blank">
                                <img src="${image.baseUrl + '=w500-h200'}" height="100" id="${image.id}" class="img-thumbnail \${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}">
                            </a>
                        </div>
                        `;
                        counter++;
                        if(counter === array.length){
                            imgScroll.html(output);
                        }
                    });
                }
            }
            $.ajax(settings);
        }
    });
})
