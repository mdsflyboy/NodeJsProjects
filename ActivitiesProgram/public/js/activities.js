
let types = {};

let loadTypes = function(){
    fetch('/ajax/activityTypes').then(function(res){
        return res.json();
    }).then(function(types){
        $('#activityTypes').html('');
        if(types){
            types.forEach(type => {
                types[type.name] = type.id;
                $('#activityTypes').append(`
                    <option value="${type.name}">${type.name}</option>
                `)
            });
        }
    })
}

let loadHeader = function(){
    $('#tblActivites').html(`
        <li class="list-group-item">
        <div class="row">
            <div class="col-4">
                <b>Name</b>
            </div>
            <div class="col-4">
                <b>Date/Time</b>
            </div>
            <div class="col-2">
                <b>Attendies</b>
            </div>
            <div class="col-2">
            </div>
        </div>
        </li>
    `)
}

let loadActivities = function(){
}

$(document).ready(function(){
    $('#navbar').load('/components/navbar.html');
    loadTypes();
    loadHeader();
});