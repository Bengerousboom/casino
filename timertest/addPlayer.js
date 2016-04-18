var input = document.getElementById("player_name");
var paid = document.getElementsByName("paid_button").checked;
var staff = document.getElementsByName("sfbonus_button").checked;

/* var myVal = $('.typeahead').typeahead('val').toString();

var name = myVal.toString(); */




function addPlayer() {


    var table = document.getElementById("players");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "aaa";

    cell2.innerHTML = "bbb";
    cell3.innerHTML = "staff2";
}
