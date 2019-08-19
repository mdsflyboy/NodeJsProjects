
let loadHeader = function(){
    $('#tblActivites').html(`
        <li class="list-group-item">
        <div class="row">
            <div class="col-4">
                <b>Name</b>
            </div>
            <div class="col-2">
                <b>Date</b>
            </div>
            <div class="col-2">
                <b>Time</b>
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
    loadHeader();
});