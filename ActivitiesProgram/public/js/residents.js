let loadHeader = function(){
    $('#tblResident').html(`
        <li class="list-group-item">
        <div class="row">
            <div class="col-4">
            <b>Name</b>
            </div>
            <div class="col-4">
            <b>Date of Birth</b>
            </div>
            <div class="col-2">
            <b>Room Number</b>
            </div>
            <div class="col-2">
            </div>
        </div>
        </li>
    `)
}

let loadResidents = function(){
    fetch('/ajax/residents').then(function(res){
        return res.json();
    }).then(function(residents){
        loadHeader();
        residents.forEach(resident => {
            $('#tblResident').append(`
            <li class="list-group-item">
                <div class="row">
                    <div class="col-4">
                        ${resident.LastName+', '+resident.FirstName}
                    </div>
                    <div class="col-4">
                        ${resident.DOB}
                    </div>
                    <div class="col-2">
                        ${resident.RoomNumber}
                    </div>
                    <div class="col-2">
                        <button id="${resident.residentID}" type="button" class="deleteBtn float-right btn btn-danger">Delete</button>
                    </div>
                </div>
            </li>
            `)
        });
    }).then(function(){
        addDelEvent();
    });
}

let addDelEvent = function(){
    $('.deleteBtn').click(function(){
        let id = $(this).attr('id');
        fetch(`/ajax/residents/delete/${id}`, {
            method: 'delete'
        }).then(function(res){
            return res.json();
        }).then(function(res){
            console.log(res);
            loadResidents();
        });
    })
}

$(document).ready(function(){
    // loadHeader();
    loadResidents();
    $('#navbar').load('/components/navbar.html')
    $('#newRes').submit(function(event){
        event.preventDefault();
        const body = {
            FirstName: $('#FirstName').val(),
            LastName: $('#LastName').val(),
            DOB: $('#DOB').val(),
            RoomNumber: $('#RoomNumber').val()
        };
        console.log(JSON.stringify(body));
        fetch('/ajax/residents/new', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                FirstName: $('#FirstName').val(),
                LastName: $('#LastName').val(),
                DOB: $('#DOB').val(),
                RoomNumber: $('#RoomNumber').val()
            })
        }).then(function(res){
            loadResidents();
            return res.json();
        }).then(function(res){
            $('#FirstName').val('')
            $('#LastName').val('')
            $('#DOB').val('')
            $('#RoomNumber').val('')
            console.log(res);
        });
    })
});