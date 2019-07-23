let imgScroll = document.getElementById('imageScroller');
imgScroll.addEventListener('scroll', () => {
    const scrolled = imgScroll.scrollTop;

    const percentScroll = scrolled/(imgScroll.scrollHeight - imgScroll.clientHeight)
    console.log(percentScroll);

    if(percentScroll == 1){
        alert(`You've reached the bottom! `);
    }
});