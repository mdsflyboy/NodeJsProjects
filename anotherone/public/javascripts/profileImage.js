let loadLabels = function(){
    fetch(`/ajax/labels/${photoId}`).then(
        function(res) {
            // console.log(res.json());
            const holder = $('#labels');
            holder.html('')
            res.json().then(function(data){
                // console.log(data);
                data.forEach((label, index)=>{
                    holder.append(`
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-9">
                                    ${label}
                                </div>
                                <div class="col-3">
                                    <button class="delBtn btn btn-danger" id="del${index}">Delete</button>
                                </div>
                            </div>
                        </li> 
                    `);
                    assignDelButton();
                });
            });
            
        }
    )
}

function assignDelButton(){
    $('.delBtn').click(function(){
        let index = $(this).attr('id');
        index = index.slice(3);
        fetch(`/ajax/labels/${photoId}/${index}`, {
            method:'delete'
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            loadLabels();
        });
    });
}

$(document).ready(function(){
    loadLabels();
    const params = window.location.pathname;
    const albumId = params.split('/')[3];
    console.log(params);

    $('#newLabelForm').submit((e) => {
        e.preventDefault();
        fetch('/ajax/labels/'+photoId, {
            method:'post',
            body: JSON.stringify({
                albumId: albumId,
                label: $('#newLabelInput').val()
            }),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        }).then((res) => {
            return res.json();
        }).then((data)=>{
            $('#newLabelInput').val('');
            loadLabels();
        });
    });

});