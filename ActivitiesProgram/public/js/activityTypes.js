
let loadHeader = function(){
    $('#tbl').html(`
        <li class="list-group-item">
        <div class="row">
            <div class="col-10">
                <b>Name</b>
            </div>
            <div class="col">
            </div>
        </div>
        </li>
    `)
}

let loadList = function(){
    loadHeader();
    fetch('/ajax/activityTypes').then(function(res){
        return res.json();
    }).then(function(data){
        if(data){
            data.forEach(function(item){
                $('#tbl').append(`
                    <li class="list-group-item">
                    <div class="row">
                        <div class="col-9">
                            ${item.name}
                        </div>
                        <div class="col-3">
                            <button type="button" id=${item.id} class="deleteBtn float-right btn btn-danger">Delete</button>
                        </div>
                    </div>
                    </li>
                `);
            });
        }
    }).then(function(){
        addDelEvent();
    });
}

let addDelEvent = function(){
    $('.deleteBtn').click(function(){
        let id = $(this).attr('id');
        fetch(`/ajax/activityTypes/delete/${id}`, {
            method: 'delete'
        }).then(function(res){
            return res.json();
        }).then(function(res){
            console.log(res);
            loadList();
        })
    })
}

$(document).ready(function(){
    $('#navbar').load('/components/navbar.html');
    loadList();
    $('#newType').submit(function(event){
        event.preventDefault();
        const body = {
            name: $('#Name').val()
        }
        fetch('/ajax/activityTypes/new', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(function(res){
            return res.json();
        }).then(function(res){
            console.log(res);
            $('#Name').val('');
            loadList();
        });
    });
});