/* global $ */
$(document).ready(function() {
    $('#loginModal').css("display", "none");
    var d = new Date();
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var month = d.getMonth();
    var year = d.getFullYear();
    var first_date = month_name[month] + " " + 1 + " " + year;
    var tmp = new Date(first_date).toDateString();

    var first_day = tmp.substring(0, 3);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var day_no = day_name.indexOf(first_day);
    var days = new Date(year, month+1, 0).getDate();    //30

    var calendar = get_calendar(day_no, days);
    
    document.getElementById("calendar-month-year").innerHTML = month_name[month]+" "+year;
    document.getElementById("calendar-dates").appendChild(calendar);
    
    $("#currentMonthValue").val(month + 1);
    $("#currentYearValue").val(year);
    
    $("td").click(function() {
        var date = parseInt(this.innerHTML);
        if(isNaN(date)) {
        } else {
            var month = $("#calendar-month-year").text().split(" ")[0];
            var year = parseInt($("#currentYearValue").val());
            var dateString = Date.parse(month + date + "," + year);
            var currentDate = new Date(dateString)
            $("#daysEvents").css("display", "block");
            $("#currentDateTitle").text(currentDate.toString().substring(0,16) + "Events")
        }
    });
});
 //When the login button is clicked, hide modals and reset fields
 $("#loginimage").click(function() {
  $('#loginModal').modal('show');
 });
 
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
   document.getElementById("mySidenav").style.width = "250px";
   document.getElementById("banner").style.backgroundColor = "rgba(0,0,0,0.4)";
   document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("banner").style.backgroundColor = "palevioletred";
    document.body.style.backgroundColor = "#E3F0FB";
}

function openHome() {
    closeNav();
    $('#name').text("IT Girls");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#linksPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
}

function openAbout() {
    closeNav();
    $('#name').text("About");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "block");
    $("#contactPage").css("display","none");
    $("#linksPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
}

function openEvents() {
    closeNav();
    $('#name').text("Events");
    $('#eventsPage').css("display", "block");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#linksPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
}

function openContact() {
    closeNav();
    $('#name').text("Contact");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","block");
    $("#linksPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
}

function openLinks() {
    closeNav();
    $('#name').text("Useful Links");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#linksPage").css("display","none");
    $('#ITPage').css("display", "block");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
}

function openIT() {
    closeNav();
    $('#name').text("IT/Computing");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#linksPage").css("display","none");
    $('#ITPage').css("display", "block");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
}

function openScience() {
    closeNav();
    $('#name').text("Science");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#linksPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "block");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
}

function openTechnology() {
    closeNav();
    $('#name').text("Technology");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#linksPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "block");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
}

function openMaths() {
    closeNav();
    $('#name').text("Maths");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#linksPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "block");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
}

function openRoles() {
    closeNav();
    $('#name').text("Roles in STEM");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#linksPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "block");
}

function calender() {
    var month = $("#currentMonthValue").val();
    var year = $("#currentYearValue").val();
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    document.getElementById("calendar-month-year").innerHTML = month_name[month - 1]+" "+year;
    
    var first_date = month_name[month - 1] + " " + 1 + " " + year;
    var tmp = new Date(first_date).toDateString();
    
    var first_day = tmp.substring(0, 3);
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var day_no = day_name.indexOf(first_day);
    var days = new Date(year, month+1, 0).getDate();    //30

    var calendar = get_calendar(day_no, days);
    $("table").remove();
    document.getElementById("calendar-dates").appendChild(calendar);
    
    $("td").click(function() {
    var date = parseInt(this.innerHTML);
        if(isNaN(date)) {
        } else {
            var month = $("#calendar-month-year").text().split(" ")[0];
            var year = parseInt($("#currentYearValue").val());
            var dateString = Date.parse(month + date + "," + year);
            var currentDate = new Date(dateString)
            $("#daysEvents").css("display", "block");
            $("#currentDateTitle").text(currentDate.toString().substring(0,16) + "Events")
        }
    });
    
}

function getNextMonth() {
    var newMonth = parseInt($("#currentMonthValue").val()) + 1;
    var newYear  = parseInt($("#currentYearValue").val());
    if (newMonth == 13) {
        var newMonth = 1;
        var newYear = newYear + 1;
    }
    $("#currentMonthValue").val(newMonth);
    $("#currentYearValue").val(newYear);
    calender();
}

function getPreviousMonth() {
    var newMonth = parseInt($("#currentMonthValue").val()) - 1;
    var newYear  = parseInt($("#currentYearValue").val());
    if (newMonth == 0) {
        var newMonth = 12;
        var newYear = newYear - 1;
    }
    $("#currentMonthValue").val(newMonth);
    $("#currentYearValue").val(newYear);
    calender();
}

function get_calendar(day_no, days){
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    
    //row for the day letters
    for(var c=0; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = "SMTWTFS"[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //create 2nd row
    tr = document.createElement('tr');
    var c;
    for(c=0; c<=6; c++){
        if(c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }
    
    var count = 1;
    for(; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //rest of the date rows
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > days){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            td.innerHTML = count;
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}

