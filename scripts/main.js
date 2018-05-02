/* global $ */
$(document).ready(function() {
    $('#loginModal').css("display", "none");
    $(".facts").css("display", "none");
    $(".facts2").css("display", "none");
    $("#logoutimage").css("display", "none");
    $("#profileButton").css("display", "none");
    $("#menuicon").css("display", "block");
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
            
            var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            console.log(currentDate.toString().substring(4,16))
            var eventMonth = month.indexOf(currentDate.toString().substring(4,7)) + 1;
            var eventDay = currentDate.toString().substring(8,10);
            var eventYear = currentDate.toString().substring(11,15)
            
            $.get('https://individualproject-teddsr.c9users.io/getEventDate', {eventYear: eventYear, eventMonth: eventMonth, eventDay: eventDay}, function(data) {
                console.log(data)
                $("#daysEvents").empty();
                if (data == '[]') {
                    $("#daysEvents").append('<h4 class="eventTitles" id="currentDateTitle"></h4><p>No events are scheduled for this date.</p>');
                } else {
                    var eventData = data.replace('["',"").replace('"]',"");
                    var eventDataArray = eventData.split('¬","');
                    for (var i = 0; i < eventDataArray.length; i++) {
                        console.log(eventDataArray[i].split("|")[0]);
                        $("#daysEvents").append('<h4 class="eventTitles" id="currentDateTitle"></h4><div class="event current" data-toggle="modal" data-target="#eventModal" id="event' + eventDataArray[i].split("|")[0] + '"><p>' + eventDataArray[i].split("|")[1] + '</p></div>');
                    } 
                }
                $("#currentDateTitle").text(currentDate.toString().substring(0,16) + "Events");
            });
        }
    });
    
    $.get('https://individualproject-teddsr.c9users.io/getRandomEvent', function(data) {
        console.log(data)
        var eventData = data.replace('["',"").replace('"]',"");
        var eventDataArray = eventData.split('¬","');
        for (var i = 0; i < eventDataArray.length; i++) {
            console.log(eventDataArray[i].split("|")[0]);
            $("#randomevent").empty();
            $("#randomevent").append('<h4>Featured Event</h4><div class="container"><div class="row"><div class="category-panel col-sm-5 inspiremain"><div class="row panel"><div class="col-sm-12 panel-heading textleft">' + eventDataArray[i].split("|")[1] + '</div></div><div class="row"><div class="col-sm-12 panel-title textleft paddingLeft">' + eventDataArray[i].split("|")[2].substring(0,21) + '</div></div><div class="row panel-content"><div class="col-sm-12 textleft paddingLeft bold" id="eventLocationMain">' + eventDataArray[i].split("|")[3] + " " + eventDataArray[i].split("|")[5] + '</div><div class="col-sm-12 textleft paddingLeft bold" id="eventLocationMain">' + eventDataArray[i].split("|")[6] + '</div></div></div></div></div>');
        }
    });
    
    $(".roleName").click(function() {
        var id = this.id;
        if ($("#" + id + "Description").hasClass("open")) {
            $("#" + id + "Description").css("display", "none");
            $("#" + id + "Description").removeClass("open");
            $("#" + id).css("width", "41.66666667%")
            $("#" + id).siblings(".col-sm-1").css("display", "block");
            $("#" + id).siblings(".col-sm-5").css("display", "block");
            $(".roleLetter").css("opacity", "1");
            $(".circle").css("opacity", "1");
            $("#" + id).children(".roleLetter").css("border-radius", "0");
            if ($("#" + id).children(".roleLetter").hasClass("left")) {
                $("#" + id).children(".roleLetter").css("border-top-right-radius", "10px");
                $("#" + id).children(".roleLetter").css("border-bottom-right-radius", "10px");
            } else {
                $("#" + id).children(".roleLetter").css("border-top-left-radius", "10px");
                $("#" + id).children(".roleLetter").css("border-bottom-left-radius", "10px");
            }
        } else {
            $("#" + id + "Description").addClass("open");
            $("#" + id + "Description").css("display", "block");
            $("#" + id).css("width", "100%");
            $("#" + id).siblings(".col-sm-1").css("display", "none");
            $("#" + id).siblings(".col-sm-5").css("display", "none");
            $(".roleLetter").css("opacity", "0.3");
            $(".circle").css("opacity", "0.3");
            $("#" + id).children(".roleLetter").css("opacity", "1");
            $("#" + id + "circle").css("opacity", "1");
            $("#" + id).children(".roleLetter").css("border-radius", "0");
            $("#" + id).children(".roleLetter").css("border-top-left-radius", "10px");
            $("#" + id).children(".roleLetter").css("border-top-right-radius", "10px");
        }
    })
    
    $(".inspire").click(function() {
        $(".facts").css("display", "none");
        $(this).children(".panel-content").children(".facts").css("display", "block"); 
    });
    
    $("input[type='checkbox']").click(function() {
        var checkticked = parseInt(document.querySelectorAll('input[type="checkbox"]:checked').length);
        var checkleft = 15 - checkticked;
        $("#checksremaining").text(checkleft + " Remaining")
        if (this.id == "p1") {
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
        } else if (this.id == "p2") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
        } else if (this.id == "p3") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
        } else if (this.id == "p4") {
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p5") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
        } else if (this.id == "p6") {
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
        } else if (this.id == "p7") {
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p8") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
        } else if (this.id == "p9") {
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
        } else if (this.id == "p10") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p11") {
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p12") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p13") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p14") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p15") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
        } else if (this.id == "p16") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p17") {
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p18") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p19") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p20") {
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p21") {
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
        } else if (this.id == "p22") {
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p23") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
        } else if (this.id == "p24") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
        } else if (this.id == "p25") {
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
        } else if (this.id == "p26") {
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p27") {
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
        } else if (this.id == "p28") {;
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p29") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
        } else if (this.id == "p30") {
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
        } else if (this.id == "p31") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p32") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p33") {
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p34") {
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
        } else if (this.id == "p35") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p36") {
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p37") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
        } else if (this.id == "p38") {
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
        } else if (this.id == "p39") {
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#p").val(parseInt($("#p").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p40") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#m").val(parseInt($("#m").val()) + 1);
        } else if (this.id == "p41") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#en").val(parseInt($("#en").val()) + 1);
            $("#c").val(parseInt($("#c").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p42") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        } else if (this.id == "p43") {
            $("#e").val(parseInt($("#e").val()) + 1);
            $("#i").val(parseInt($("#i").val()) + 1);
            $("#d").val(parseInt($("#d").val()) + 1);
            $("#s").val(parseInt($("#s").val()) + 1);
            $("#r").val(parseInt($("#r").val()) + 1);
            $("#t").val(parseInt($("#t").val()) + 1);
            $("#su").val(parseInt($("#su").val()) + 1);
            $("#po").val(parseInt($("#po").val()) + 1);
        }
    })
    
    //When a username is input in the username field of the user registration modal
    $("#inputUsername").keyup(function(){
      var username = $("#inputUsername").val();
      $.get('https://individualproject-teddsr.c9users.io/searchUsername', {username: username}, function(data) {
       if (data == '[]') {
        $("#inputUsername").css("background-color", "white");
       } else {
        $("#inputUsername").css("background-color", "#ffcece");
       }
      });
     });
    
     //When an input is placed in the email field of the user registration modal it checks that the email does not already exist in the database.
     $("#inputEmailSign").keyup(function(){
      var email = $("#inputEmailSign").val();
      $.get('https://individualproject-teddsr.c9users.io/searchEmail', {email: email}, function(data) {
       if (data == '[]') {
        $("#inputEmailSign").css("background-color", "white");
       } else {
        $("#inputEmailSign").css("background-color", "#ffcece");
       }
      });
     });
     
     
     //Registration functionality and validation
 $("#register").click(function(event) {
  event.preventDefault();
  var username = $("#inputUsername").val();
  var email = $("#inputEmailSign").val();
  var password = $("#inputPasswordSign").val();
  var passwordCheck = $("#inputPasswordConfirm").val();
  var validateEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var valid = validateEmail.test(email);
  if (username == "") {
   $("#inputUsername").css("background-color", "#ffcece");
  } else {
   $("#inputUsername").css("background-color", "white");
  }
  if (email == "" || valid == false) {
   $("#inputEmailSign").css("background-color", "#ffcece");
  } else {
   $("#inputEmailSign").css("background-color", "white");
  }
  if (password == "") {
   $("#inputPasswordSign").css("background-color", "#ffcece");
  } else {
   $("#inputPasswordSign").css("background-color", "white");
  }
  if (passwordCheck == "") {
   $("#inputPasswordConfirm").css("background-color", "#ffcece");
  } else {
   $("#inputPasswordConfirm").css("background-color", "white");
   if (password != passwordCheck) {
    $("#inputPasswordSign").css("background-color", "#ffcece");
    $("#inputPasswordConfirm").css("background-color", "#ffcece");
   } else {
    $("#inputPasswordSign").css("background-color", "white");
    $("#inputPasswordConfirm").css("background-color", "white");
   }
  }

  if (username != "" && $("#inputUsername").css("background-color")=="rgb(255, 255, 255)" && email != "" && valid == true && password != "" && passwordCheck != "" && (password == passwordCheck)) {
   var passwordHash = SHA256(password);
   setTimeout(function() {
    $.post('https://individualproject-teddsr.c9users.io/registerUserNow', {username: username, email: email, password: passwordHash}, function(data) {
     $("#responseModal").show();
      if (data == '"Success"') {
       $('#responseModal').modal('toggle');
       $("#responseText").text("You have been registered! Please log in.");
       $("#modalClose").css("display", "none");
       $("#signupModal").modal("toggle");
       $("#inputEmail").empty();
       $("#inputPassword").empty();
       $("#inputEmail").css("background-color","white");
       $("#inputPassword").css("background-color","white");
       setTimeout(function(){
        $('#responseModal').modal('toggle');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $("#loginModal").modal("toggle");
       }, 2000);
      } else {
       $('#responseModal').modal('toggle');
       $("#modalClose").css("display", "block");
       $("#responseText").text(data);
       $("#modalClose").css("display", "block");
      }
    });
   },1000);
  }
 });
 
 //Login functionality and validation
 $("#login").click(function(event) {
  event.preventDefault();
  var email = $("#inputEmail").val();
  var password = $("#inputPassword").val();
  var validateEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var valid = validateEmail.test($("#inputEmail").val());
  if ((email == "" || valid == false) && password == "") {
   $("#inputEmail").css("background-color", "#ffcece");
   $("#inputPassword").css("background-color", "#ffcece");
  } else if (email == "" || valid == false) {
   $("#inputEmail").css("background-color", "#ffcece");
   $("#inputPassword").css("background-color", "white");
  } else if (password == "") {
   $("#inputEmail").css("background-color", "white");
   $("#inputPassword").css("background-color", "#ffcece");
  } else {
   $("#inputEmail").css("background-color", "white");
   $("#inputPassword").css("background-color", "white");
   var emailAddress = $("#inputEmail").val();
   console.log(email);
   var passwordHash = SHA256(password);
   console.log(passwordHash);
   //Checking of password validation
   $.get('https://individualproject-teddsr.c9users.io/getLoginDetails',{email:emailAddress} ,function(data) {
    var loginData = data.replace('["',"").replace('"]',"");
    if (data != "[]") {
     var passwordBack = loginData.split("|")[2];
     var usernameBack = loginData.split("|")[3].replace("¬","");
     var userID = loginData.split("|")[1];
     if (passwordBack != passwordHash) {
      $("#inputPassword").css("background-color", "#ffcece");
     } else {
      $("#inputPassword").css("background-color", "white");
      if (data != "[]") {
        $("#sessionUserID").val(userID);
       $.post('https://individualproject-teddsr.c9users.io/startSession',{userID:userID, username: usernameBack} ,function(data) {
        console.log(parseInt(data.replace('"',"").replace('"',"")));
        $.ajax({
         headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
         },
         url : 'https://individualproject-teddsr.c9users.io/updateLastActive',
         type : 'PATCH',
         data : JSON.stringify({userID:userID}),
         success : function(response, textStatus, jqXhr) {
          console.log(response);
         }
        });
       });
       $("#loginModal").modal('toggle');
       $("#loginimage").css("display", "none");
       $("#signupbutton").css("display", "none");
       $("#logoutimage").css("display", "block");
       $("#profileButton").css("display","block");
       $("#addProductButton").css("display","block");
       $("#addReviewButton").css("display","block");
       $("#addReviewButtonMain").css("display", "block");
       $('body').removeClass('modal-open');
       $('.modal-backdrop').remove();
      } else {
       $('#responseModal').modal('toggle');
       $("#modalClose").css("display", "block");
       $("#responseText").text(data);
       $("#modalClose").css("display", "block");
      }
     }
    } else {
     $("#inputEmail").css("background-color", "#ffcece");
     $("#inputPassword").css("background-color", "#ffcece");
    }
    });
  }
 });
//   $.get('https://individualproject-teddsr.c9users.io/getCounty', function(data) {
//         var countyData = data.replace('[',"").replace(']',"");
//         var countyArray = countyData.split("¬");
//         $("#selectCounty")
//         $("#selectCounty").append("<option disabled='disabled' selected='selected'>Select County...</option>");
//         for (var i = 0; i < countyArray.length - 1; i++) {
//             console.log(countyArray[i].split("|")[1])
//             $("#selectCounty").append("<option id='countyID" + countyArray[i].split("|")[1] + "'>" + countyArray[i].split("|")[0].replace('"',"").replace(",","").replace('"',"") + "</option>");
//         }
//     });
  //Resetting password functionality and validation
 $("#resetPassword").click(function(event) {
  event.preventDefault();
  var username = $("#forgottenUsername").val();
  var email = $("#forgottenEmail").val();
  var password = $("#newPassword").val();
  var passwordCheck = $("#newPasswordConfirm").val();
  var validateEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var valid = validateEmail.test(email);
  if (username == "") {
   $("#forgottenUsername").css("background-color", "#ffcece");
  } else {
   $("#forgottenUsername").css("background-color", "white");
  }
  if (email == "" || valid == false) {
   $("#forgottenEmail").css("background-color", "#ffcece");
  } else {
   $("#forgottenEmail").css("background-color", "white");
  }
  if (password == "") {
   $("#newPassword").css("background-color", "#ffcece");
  } else {
   $("#newPassword").css("background-color", "white");
  }
  if (passwordCheck == "") {
   $("#newPasswordConfirm").css("background-color", "#ffcece");
  } else {
   $("#newPasswordConfirm").css("background-color", "white");
   if (password != passwordCheck) {
    $("#newPassword").css("background-color", "#ffcece");
    $("#newPasswordConfirm").css("background-color", "#ffcece");
   } else {
    $("#newPassword").css("background-color", "white");
    $("#newPasswordConfirm").css("background-color", "white");
   }
  }
  if (username != "" && email != "" && valid == true && password != "" && passwordCheck != "" && (password == passwordCheck)) {
   var passwordHash = SHA256(password);
   setTimeout(function() {
    $.get('https://individualproject-teddsr.c9users.io/getLoginDetails', {email: email}, function(data) {
     var loginData = data.replace('["',"").replace('"]',"");
     var emailBack = loginData.split("|")[0];
     var usernameBack = loginData.split("|")[3].replace("¬","");
     if (emailBack == email && usernameBack == username) {
      $("#forgottenLabel").text();
      $("#forgottenUsername").css("background-color", "white");
      $("#forgottenEmail").css("background-color", "white");
      $.ajax({
       headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
       },
       url : 'https://individualproject-teddsr.c9users.io/updatePassword',
       type : 'PATCH',
       data : JSON.stringify({username: username, password: passwordHash}),
       success : function(data, textStatus, jqXhr) {
        $("#responseModal").show();
        if (data == '"Success"') {
         $("#reviewProductName").val("");
         $("#review").val("");
         $('#responseModal').modal('toggle');
         $("#forgottenModal").modal('toggle');
         $("#responseText").text("Password changed. Please log in!");
         $("#modalClose").css("display", "none");
         setTimeout(function(){
          $('#responseModal').modal('hide');
          $("#loginModal").modal("toggle");
         }, 2000);
        } else {
         $("#responseText").text(data);
         $("#modalClose").css("display", "block");
        }
       }
      });
     } else {
      $("#forgottenLabel").text("Details don't match our records.");
      $("#forgottenUsername").css("background-color", "#ffcece");
      $("#forgottenEmail").css("background-color", "#ffcece");
     }
    });
   }, 200);
  }
 }); 
 
 //Details and content for the user's profile modal
 $("#profileButton").click(function() {
  event.preventDefault();
  $.get('https://individualproject-teddsr.c9users.io/getSessionDetails', function(data) {
   var username = data.split("|")[1].replace('"',"").replace('"',"").replace("¬","");
   var userID = parseInt(data.split("|")[0].replace('"',"").replace('"',""));

   $.get('https://individualproject-teddsr.c9users.io/getUserDetails', {userID: userID}, function(data) {
    var userData = data.replace('["',"").replace('"]',"");
    var userDataArray = userData.split("|");
    $("#userMemberSince").text("Member Since: " + userDataArray[3].substring(0,21));
    $("#profileusername").text(userDataArray[0]);
    if (userDataArray[1] == "null") {
        $("#advisedRole").text("Advised Role: You haven't taken the 'What Role Am I?' quiz yet!")
    } else {
        $("#advisedRole").text("Advised Role: " + userDataArray[1]);
    }
    });
   });
  });
  
  $("#openimage").click(function() {
        $("#maintitle").animate({bottom: '600px'}).slideToggle();
        $("#homerow").animate({bottom: '280px'});

  })
});
 //When the login button is clicked, hide modals and reset fields
 $("#loginimage").click(function() {
  $('#loginModal').modal('show');
 });
 
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
   document.getElementById("mySidenav").style.width = "250px";
   document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
   $("input:checkbox").prop('checked', false);
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "#E3F0FB";
    $("input:checkbox").prop('checked', false);
}

function openHome() {
    closeNav();
    $('#name').text("IT Girls");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#forumPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
    $("#wishPage").css("display","none");
    $("#wisPage").css("display","none");
    $("#discussionPage").css("display", "none");
    $("#homepage").css("display", "block");
    $("#homepageid").css("display", "block");
    $("#maintitle").animate({top: '100px'}).slideToggle();
    $("#homerow").animate({bottom: '1200px'});
    $("#banner").css("display", "none");
    $("#minibanner").css("display", "none");
    //$("#homerow").css("margin-top","-300px");
}

// function scrollToMain() {
//     $("#maintitle").animate({bottom: '600px'});
//     $("#homerow").animate({bottom: '280px'});
//     console.log(true)
// }

function openAbout() {
    closeNav();
    $('#name').text("About");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "block");
    $("#contactPage").css("display","none");
    $("#forumPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
    $("#wishPage").css("display","none");
    $("#wisPage").css("display","none");
    $("#discussionPage").css("display", "none");
    $("#homepage").css("display", "none");
    $("#homepageid").css("display", "none");
    $("#banner").css("display", "block");
    $("#minibanner").css("display", "block");
}

function openEvents() {
    closeNav();
    $('#name').text("Events");
    $('#eventsPage').css("display", "block");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#forumPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
    $("#wishPage").css("display","none");
    $("#wisPage").css("display","none");
    $("#discussionPage").css("display", "none");
    $("#homepage").css("display", "none");
    $("#homepageid").css("display", "none");
    $("#nextMonth").empty();
    $("#previousMonth").empty();
    $("#nextMonth").append('<h4 class="eventTitles">Coming Up</h4>')
    $("#preiousMonth").append('<h4 class="eventTitles">This Month</h4>')
    $("#banner").css("display", "block");
    $("#minibanner").css("display", "block");
    $.get('https://individualproject-teddsr.c9users.io/getAllEvents',function(data) {
        console.log(data)
        var eventData = data.replace('["',"").replace('"]',"");
        var eventDataArray = eventData.split('¬","');
        for (var i = 0; i < eventDataArray.length; i++) {
            console.log(eventDataArray[i].split("|")[0])
            $("#nextMonth").append('<div class="event" data-toggle="modal" data-target="#eventModal" onclick="openEvent('+ eventDataArray[i].split("|")[0] + ')"><p>'+ eventDataArray[i].split("|")[1] + '</p></div>');
        }
    });
    $.get('https://individualproject-teddsr.c9users.io/getMonthsEvents',function(data) {
        if (data == '[]') {
           $("#previousMonth").css("display","none");
           $("#previousMonth").css("border-right", "0");
           $("#previousMonth").css("background-color", "none");
        } else {
            $("#previousMonth").css("display","block");
            var eventData = data.replace('["',"").replace('"]',"");
            var eventDataArray = eventData.split('¬","');
            for (var i = 0; i < eventDataArray.length; i++) {
                console.log(eventDataArray[i].split("|")[0])
                $("#previousMonth").append('<div class="event" data-toggle="modal" data-target="#eventModal" onclick="openEvent('+ eventDataArray[i].split("|")[0] + ')"><p>'+ eventDataArray[i].split("|")[1] + '</p></div>');
                $("#previousMonth").css("border-right", "2px solid darkgray");
                $("#previousMonth").css("background-color", "#efe5e5");
            } 
        }
    });
}

function openContact() {
    closeNav();
    $('#name').text("Contact");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","block");
    $("#forumPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
    $("#wishPage").css("display","none");
    $("#wisPage").css("display","none");
    $("#discussionPage").css("display", "none");
    $("#homepage").css("display", "none");
    $("#homepageid").css("display", "none");
    $("#banner").css("display", "block");
    $("#minibanner").css("display", "block");
}

function openForum() {
    closeNav();
    $('#name').text("Forum");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#forumPage").css("display","block");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
    $("#wishPage").css("display","none");
    $("#wisPage").css("display","none");
    $("#discussionPage").css("display", "none");
    $("#homepage").css("display", "none");
    $("#homepageid").css("display", "none");
    $("#banner").css("display", "block");
    $("#minibanner").css("display", "block");
    $("#forumcontainer").empty();
    $("#forumcontainer").append('<div class="forumlink"><div id="addtopic" data-toggle="modal" data-target="#topicModal"><p id="plus">+ </p><p id="plustitle">Add topic</p></div>');
    $.get('https://individualproject-teddsr.c9users.io/getCategories', function(data) {
        var categoryData = data.replace('[',"").replace(']',"");
        var categoryArray = categoryData.split("¬");
        $("#selectTopic").empty();
        $("#selectTopic").append("<option disabled='disabled' selected='selected'>Select Category...</option>");
        for (var i = 0; i < categoryArray.length - 1; i++) {
            console.log(categoryArray[i].split("|")[1])
            $("#selectTopic").append("<option id='countyID" + categoryArray[i].split("|")[1] + "'>" + categoryArray[i].split("|")[0].replace('"',"").replace(",","").replace('"',"") + "</option>");
        }
    });
    $.get('https://individualproject-teddsr.c9users.io/getTopics', function(data) {
        console.log(data)
        var categoryData = data.replace('["',"").replace('"]',"");
        var categoryDataArray = categoryData.split('¬","');
        console.log(categoryDataArray.length)
        // $("#topNewReviews").empty();
        for (var i = 0; i < categoryDataArray.length; i++) {
            console.log(categoryDataArray[i].split("|")[0])
            $("#forumcontainer").append('<div class="category-panel" id="topic' + categoryDataArray[i].split("|")[1].replace("¬", "") + '"><div class="row panel"><div class="col-sm-12 panel-heading textleft">' + categoryDataArray[i].split("|")[0] + '</div></div><div class="row"><div class="col-sm-12 panel-title"><div class="col-sm-8 textleft">Title</div><div class="col-sm-4 textleft">Last Post</div></div></div>');
        }
        $.get('https://individualproject-teddsr.c9users.io/getDiscussions', function(data) {
            console.log(data)
            var forumData = data.replace('["',"").replace('"]',"");
            var forumDataArray = forumData.split('¬","');
            for (var i = 0; i < forumDataArray.length; i++) {
                console.log(forumDataArray[i].split("|")[0])
                $("#topic" + forumDataArray[i].split("|")[6].replace("¬","").replace("¬","")).append('<div class="row discussionTitle" onclick="openDiscussion(' + forumDataArray[i].split("|")[0] + ')"><div class="col-sm-12 panel-content"><div class="col-sm-8 textleft" id="discussion"' + forumDataArray[i].split("|")[0] + '><div class="circlesmall"></div><div class="posttitle">' + forumDataArray[i].split("|")[2] + '</div></div><div class="col-sm-4 textleft"><div class="">' + forumDataArray[i].split("|")[5] + '</div><div class="date">' + forumDataArray[i].split("|")[4].substring(0,21) + '</div></div></div></div></div>');
            }
        });
    });
    
}

// function openIT() {
//     closeNav();
//     $('#name').text("IT/Computing");
//     $('#eventsPage').css("display", "none");
//     $('#aboutPage').css("display", "none");
//     $("#contactPage").css("display","none");
//     $("#forumPage").css("display","none");
//     $('#ITPage').css("display", "block");
//     $('#technologyPage').css("display", "none");
//     $('#sciencePage').css("display", "none");
//     $('#mathsPage').css("display", "none");
//     $('#daysEvents').css("display", "none");
//     $("#rolesPage").css("display", "none");
//     $("#wishPage").css("display","none");
//     $("#wisPage").css("display","none");
//     $("#discussionPage").css("display", "none");
//     $("#homepage").css("display", "none");
//     $("#homepageid").css("display", "none");
//     $("#banner").css("display", "block");
//     $("#minibanner").css("display", "block");
// }

// function openScience() {
//     closeNav();
//     $('#name').text("Science");
//     $('#eventsPage').css("display", "none");
//     $('#aboutPage').css("display", "none");
//     $("#contactPage").css("display","none");
//     $("#forumPage").css("display","none");
//     $('#ITPage').css("display", "none");
//     $('#technologyPage').css("display", "none");
//     $('#sciencePage').css("display", "block");
//     $('#mathsPage').css("display", "none");
//     $('#daysEvents').css("display", "none");
//     $("#rolesPage").css("display", "none");
//     $("#wishPage").css("display","none");
//     $("#wisPage").css("display","none");
//     $("#discussionPage").css("display", "none");
//     $("#homepage").css("display", "none");
//     $("#homepageid").css("display", "none");
//     $("#banner").css("display", "block");
//     $("#minibanner").css("display", "block");
// }

// function openTechnology() {
//     closeNav();
//     $('#name').text("Technology");
//     $('#eventsPage').css("display", "none");
//     $('#aboutPage').css("display", "none");
//     $("#contactPage").css("display","none");
//     $("#forumPage").css("display","none");
//     $('#ITPage').css("display", "none");
//     $('#technologyPage').css("display", "block");
//     $('#sciencePage').css("display", "none");
//     $('#mathsPage').css("display", "none");
//     $('#daysEvents').css("display", "none");
//     $("#rolesPage").css("display", "none");
//     $("#wishPage").css("display","none");
//     $("#wisPage").css("display","none");
//     $("#discussionPage").css("display", "none");
//     $("#homepage").css("display", "none");
//     $("#homepageid").css("display", "none");
//     $("#banner").css("display", "block");
//     $("#minibanner").css("display", "block");
// }

// function openMaths() {
//     closeNav();
//     $('#name').text("Maths");
//     $('#eventsPage').css("display", "none");
//     $('#aboutPage').css("display", "none");
//     $("#contactPage").css("display","none");
//     $("#forumPage").css("display","none");
//     $('#ITPage').css("display", "none");
//     $('#technologyPage').css("display", "none");
//     $('#sciencePage').css("display", "none");
//     $('#mathsPage').css("display", "block");
//     $('#daysEvents').css("display", "none");
//     $("#rolesPage").css("display", "none");
//     $("#wishPage").css("display","none");
//     $("#wisPage").css("display","none");
//     $("#discussionPage").css("display", "none");
//     $("#homepage").css("display", "none");
//     $("#homepageid").css("display", "none");
//     $("#banner").css("display", "block");
//     $("#minibanner").css("display", "block");
// }

function openRoles() {
    closeNav();
    $('#name').text("Roles in STEM");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#forumPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "block");
    $("#wishPage").css("display","none");
    $("#wisPage").css("display","none");
    $("#discussionPage").css("display", "none");
    $("#homepage").css("display", "none");
    $("#homepageid").css("display", "none");
    $("#banner").css("display", "block");
    $("#minibanner").css("display", "block");
}

function rolesModal() {
    $("#resultModal").modal("toggle");
    $("#checksremaining").css("color", "black");
}

function openwish() {
    closeNav();
    $('#name').text("Women in STEM - History");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#forumPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
    $("#wishPage").css("display","block");
    $("#wisPage").css("display","none");
    $("#discussionPage").css("display", "none");
    $("#homepage").css("display", "none");
    $("#homepageid").css("display", "none");
    $("#banner").css("display", "block");
    $("#minibanner").css("display", "block");
}

function openwis() {
    closeNav();
    $('#name').text("Women in STEM - Now");
    $('#eventsPage').css("display", "none");
    $('#aboutPage').css("display", "none");
    $("#contactPage").css("display","none");
    $("#forumPage").css("display","none");
    $('#ITPage').css("display", "none");
    $('#technologyPage').css("display", "none");
    $('#sciencePage').css("display", "none");
    $('#mathsPage').css("display", "none");
    $('#daysEvents').css("display", "none");
    $("#rolesPage").css("display", "none");
    $("#wishPage").css("display","none");
    $("#wisPage").css("display","block");
    $("#discussionPage").css("display", "none");
    $("#homepage").css("display", "none");
    $("#homepageid").css("display", "none");
    $("#banner").css("display", "block");
    $("#minibanner").css("display", "block");
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
            
            var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            console.log(currentDate.toString().substring(4,16))
            var eventMonth = month.indexOf(currentDate.toString().substring(4,7)) + 1;
            var eventDay = currentDate.toString().substring(8,10);
            var eventYear = currentDate.toString().substring(11,15)
            
            $.get('https://individualproject-teddsr.c9users.io/getEventDate', {eventYear: eventYear, eventMonth: eventMonth, eventDay: eventDay}, function(data) {
                console.log(data)
                $("#daysEvents").empty();
                if (data == '[]') {
                    $("#daysEvents").append('<h4 class="eventTitles" id="currentDateTitle"></h4><p>No events are scheduled for this date.</p>');
                } else {
                    var eventData = data.replace('["',"").replace('"]',"");
                    var eventDataArray = eventData.split('¬","');
                    for (var i = 0; i < eventDataArray.length; i++) {
                        console.log(eventDataArray[i].split("|")[0]);
                        $("#daysEvents").append('<h4 class="eventTitles" id="currentDateTitle"></h4><div class="event current" data-toggle="modal" data-target="#eventModal" onclick="openEvent('+ eventDataArray[i].split("|")[0] + ')"><div>' + eventDataArray[i].split("|")[1].replace("¬","") + '</div></div>');
                    } 
                }
                $("#currentDateTitle").text(currentDate.toString().substring(0,16) + "Events");
            });
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

function getResults() {
    if ($("#checksremaining").text() == "0 Remaining") {
        var inputs = document.querySelectorAll('input[type="number"]');
        var idArray = [];
        var totalArray = [];
        for (var i = 0; i < inputs.length; ++i) {
            idArray.push(inputs[i].id)
            totalArray.push(parseInt(inputs[i].value))
        }
        var max =0;
        for (var i = 0; i < inputs.length; ++i) {
           max =  Math.max(max , parseInt(inputs[i].value));
        }
        var largestNumbers = [];
        for (i=0; i < totalArray.length; i++ ){
            if ( totalArray[i] == max ){
                largestNumbers.push(i);
            }
        }
        for (i=0; i < largestNumbers.length; i++ ){
            var largestid = idArray[i];
        }
        $("#personalfeatures").empty();
        $("#potentialjobs").empty();
        $("#where").empty();
        if (largestid == "e"){
            $("#resultRoleName").text("Explorer");
            $("#personalfeatures").append("<li>Inquisitive</li><li>Practical</li><li>Competitive</li><li>Likes to be the first to know</li><li>Good at reading</li><li>Good at experimenting</li><li>Good at information searching</li><li>Individual worker</li><li>Listener</li><li>Concentrate on one topic</li><li>Likes solving puzzles</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 grayjob modalgrayjob">Astronomer</div><div class="col-sm-4 pinkjob modalpinkjob">Cosmologist</div><div class="col-sm-4 grayjob modalgrayjob">Geneticist</div><div class="col-sm-4 pinkjob modalpinkjob">Geologist</div><div class="col-sm-4 grayjob modalgrayjob">IT Support</div><div class="col-sm-4 pinkjob modalpinkjob">Pharmacist</div><div class="col-sm-4 grayjob modalgrayjob">Professor</div><div class="col-sm-4 pinkjob modalpinkjob">Research Assistant</div><div class="col-sm-4 grayjob modalgrayjob">Research Chemist</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Research Veterinary Scientist</div><div class="col-sm-4 grayjob modalgrayjob">Test Engineer</div><div class="col-sm-4 pinkjob modalpinkjob">Zoologist</div>');
            $("#where").append('<h4 class="pinkcolor h4modal">Where to work?</h4><div>Universities</div><div>Hospital laboratories for charities</div>');
        } else if (largestid == "i"){
            $("#resultRoleName").text("Investigator");
            $("#personalfeatures").append("<li>Logical</li><li>Cooperative</li><li>Idea collector</li><li>Likes working with others</li><li>Good at remembering facts</li><li>Problem solver</li><li>Knowledgable of lots of subject areas</li><li>People person</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 modalgrayjob grayjob">Computer Modeller</div><div class="col-sm-4 modalpinkjob pinkjob">Customer Analyst Officer</div><div class="col-sm-4 modalgrayjob grayjob">Ingredients Technician</div><div class="col-sm-4 modalpinkjob pinkjob">Meteorologist</div><div class="col-sm-4 modalgrayjob grayjob">Physiologist</div><div class="col-sm-4 modalpinkjob pinkjob">Programme Analyst</div><div class="col-sm-4 modalgrayjob grayjob">Sound Engineer</div><div class="col-sm-4 modalpinkjob pinkjob">Flood & Coastal Risk Management Officer</div>')
            $("#where").append('<h4 class="pinkcolor h4modal">Where to work?</h4><div>Research and Development departments of businesses, hospitals and universities</div>')
        } else if (largestid == "d"){
            $("#resultRoleName").text("Developer");
            $("#personalfeatures").append("<li>Creative</li><li>Practical</li><li>Likes design and developing for the future</li><li>Empathetic</li><li>Creative</li><li>Problem solver</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 grayjob modalgrayjob">Civil Engineer</div><div class="col-sm-4 pinkjob modalpinkjob">Engineering Apprentice</div><div class="col-sm-4 grayjob modalgrayjob">Piping Designer</div><div class="col-sm-4 pinkjob modalpinkjob">Product Designer</div><div class="col-sm-4 grayjob modalgrayjob">Signalling Designer</div><div class="col-sm-4 pinkjob modalpinkjob">Software Developer</div><div class="col-sm-4 grayjob modalgrayjob">Sport Scientist</div><div class="col-sm-4 pinkjob modalpinkjob">Transport Planner</div><div class="col-sm-4 grayjob modalgrayjob">Technology Apprentice</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Research and Development Design Scientist</div><div class="col-sm-4 grayjob modalgrayjob extrapadding">Artificial Intelligence Specialist</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Space Craft Structures Engineer</div>');
            $("#where").append('<h4 class="pinkcolor h4modal">Where to work?</h4><div>Businesses in product design and development</div><div>Architecture companies</div>');
        } else if (largestid == "s"){
            $("#resultRoleName").text("Service Provider");
            $("#personalfeatures").append("<li>Organised</li><li>Attention to detail</li><li>Likes to help people</li><li>Good communication skills</li><li>Effective leader</li><li>Teamworker</li><li>Likes projects with fixed times and budgets</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 grayjob modalgrayjob">Animal Welfare Technician</div><div class="col-sm-4 pinkjob modalpinkjob">Customer Service Advisor</div><div class="col-sm-4 grayjob modalgrayjob">Forensic Scientist</div><div class="col-sm-4 pinkjob modalpinkjob">GP</div>div class="col-sm-4 grayjob modalgrayjob">Health Physicist</div><div class="col-sm-4 pinkjob modalpinkjob">Materials Analyst</div><div class="col-sm-4 grayjob modalgrayjob">Pathologist</div><div class="col-sm-4 pinkjob modalpinkjob">Quality Technician</div><div class="col-sm-4 grayjob modalgrayjob">Radiographer</div><div class="col-sm-4 pinkjob modalpinkjob">Research Technician</div><div class="col-sm-4 grayjob modalgrayjob">Science/Lab Technician</div><div class="col-sm-4 pinkjob modalpinkjob">Scrum Master</div><div class="col-sm-4 grayjob modalgrayjob">Town Planner</div><div class="col-sm-4 pinkjob modalpinkjob">Vet</div><div class="col-sm-4 grayjob modalgrayjob">Vet Nurse</div><div class="col-sm-4 pinkjob extrapadding">Flood & Coastal Risk Management Officer</div>');
            $("#where").append('<h4 class="pinkcolor">Potential Jobs</h4><div>Hospitals</div><div>Vets</div><div>Laboratories</div><div>Surgeries</div><div>Organisations</div><div>Universities and schools</div>');
        } else if (largestid == "r"){
            $("#resultRoleName").text("Regulator");
            $("#personalfeatures").append("<li>Honest</li><li>Fair</li><li>Likes to check details are correct</li><li>Good at spotting errors and potential problems</li><li>Natural sense of justice</li><li>Willing to challenge the norm</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 grayjob modalgrayjob">Compliance Officer</div><div class="col-sm-4 pinkjob modalpinkjob">Digital Designer</div><div class="col-sm-4 grayjob modalgrayjob">Drug Tester</div><div class="col-sm-4 pinkjob modalpinkjob">Fingerprint Officer</div><div class="col-sm-4 grayjob modalgrayjob">Fire Safety Engineer</div><div class="col-sm-4 pinkjob modalpinkjob">Food Safety Analyst</div><div class="col-sm-4 grayjob modalgrayjob">Interactive Designer</div><div class="col-sm-4 pinkjob modalpinkjob">Patent Lawyer</div><div class="col-sm-4 grayjob modalgrayjob">Technology Lawyer</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Conservation Building Surveyor</div><div class="col-sm-4 grayjob modalgrayjob extrapadding">Measurement and Control Technician</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Regulatory Affairs and Risk</div>');
            $("#where").append('<h4 class="pinkcolor h4modal">Where to work?</h4><div>Businesses</div><div>Laboratories</div><div>Offices</div>');
        } else if (largestid == "en"){
            $("#resultRoleName").text("Entrepreneur");
            $("#personalfeatures").append("<li>Confident</li><li>Creative</li><li>Competitive</li><li>Likes to make things happen</li><li>Empathetic</li><li>Can work well in a team</li><li>Financially aware</li><li>Lateral thinker</li><li>Understands the client/customer</li><li>A natural leader</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 grayjob modalgrayjob">Business Architect</div><div class="col-sm-4 pinkjob modalpinkjob">Chief Executive</div><div class="col-sm-4 grayjob modalgrayjob">Consultant</div><div class="col-sm-4 pinkjob modalpinkjob">Founding Director</div><div class="col-sm-4 grayjob modalgrayjob">Innovation Lead</div><div class="col-sm-4 pinkjob modalpinkjob">Managing Director</div><div class="col-sm-4 grayjob modalgrayjob extrapadding">Energy Efficiency Officer</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Operational Research Consultant</div>');
            $("#where").append('<h4 class="pinkcolor h4modal">Where to work?</h4><div>Businesses</div><div>Charities</div><div>Public sector (for business or society)</div>');
        } else if (largestid == "t"){
            $("#resultRoleName").text("Trainer");
            $("#personalfeatures").append("<li>Understanding</li><li>Helpful</li><li>Attentive</li><li>Motivating</li><li>Passionate</li><li>Knowledge sharer</li><li>Help people to improve their skills</li><li>Good commuicator</li><li>Teacher</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 grayjob modalgrayjob">Journalist</div><div class="col-sm-4 pinkjob modalpinkjob">Life Coach</div><div class="col-sm-4 grayjob modalgrayjob">Museum Curator</div><div class="col-sm-4 pinkjob modalpinkjob">Outreach Officer</div><div class="col-sm-4 grayjob modalgrayjob">Science Communicator</div><div class="col-sm-4 pinkjob modalpinkjob">TV Presenter</div><div class="col-sm-4 grayjob modalgrayjob">Teacher</div><div class="col-sm-4 pinkjob modalpinkjob">Text Book Author</div><div class="col-sm-4 grayjob modalgrayjob">Trainer</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Exhibition Content Designer</div>');
            $("#where").append('<h4 class="pinkcolor h4modal">Where to work?</h4><div>Training workshops</div><div>Educational institutions</div>');
        } else if (largestid == "c"){
            $("#resultRoleName").text("Communicator");
            $("#personalfeatures").append("<li>People person</li><li>Good with words</li><li>Good at simplifying information and technical facts</li><li>Underestands their audiences</li><li>Resourceful</li><li>Good in front of an audience</li><li>Good at foreign languages (possibly)</li><li>Good in front of a camera (possibly)</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 grayjob modalgrayjob">Events Officer</div><div class="col-sm-4 pinkjob modalpinkjob">Medical Writer</div><div class="col-sm-4 grayjob modalgrayjob">Museum Curator</div><div class="col-sm-4 pinkjob modalpinkjob">Outreach Officer</div><div class="col-sm-4 grayjob modalgrayjob">Science Festival Director</div><div class="col-sm-4 pinkjob modalpinkjob">Science Journalist</div><div class="col-sm-4 grayjob modalgrayjob">Science Publisher</div><div class="col-sm-4 pinkjob modalpinkjob">TV Researcher</div><div class="col-sm-4 grayjob modalgrayjob">Technical Translator</div><div class="col-sm-4 pinkjob modalpinkjob">Website Designer</div><div class="col-sm-4 grayjob modalgrayjob extrapadding">Head of Scientific Programming (TV)</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Science Communications Officer</div>')
            $("#where").append('<h4 class="pinkcolor h4modal">Where to work?</h4><div>Businesses</div><div>Charities</div><div>Media</div>');
        } else if (largestid == "p"){
            $("#resultRoleName").text("Persuader");
            $("#personalfeatures").append("<li>Imaginative</li><li>Persuasive</li><li>Understanding</li><li>Creative</li><li>Good with words</li><li>Good with design</li><li>Organised</li><li>Deadline driven</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 grayjob modalgrayjob">Campaigns Manager</div><div class="col-sm-4 pinkjob modalpinkjob">Head of Advertising</div><div class="col-sm-4 grayjob modalgrayjob">Home Energy Advisor</div><div class="col-sm-4 pinkjob modalpinkjob">Marketing Assistant</div><div class="col-sm-4 grayjob modalgrayjob">Marketing Manager</div><div class="col-sm-4 pinkjob modalpinkjob">Outreach Officer</div><div class="col-sm-4 grayjob modalgrayjob">Publicity Officer</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Membership Development Officer</div>')
            $("#where").append('<h4 class="pinkcolor h4modal">Where to work?</h4><div>Marketing</div><div>Advertising</div><div>PR in universities or businesses</div>');
        } else if (largestid == "su"){
            $("#resultRoleName").text("Supporter");
            $("#personalfeatures").append("<li>Creative</li><li>Understanding</li><li>Likes helping people</li><li>Naturally good at making friends</li><li>Social</li><li>Listener</li><li>Takes pride in exceeding expectations</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 grayjob modalgrayjob">Customer Service Manager</div><div class="col-sm-4 pinkjob modalpinkjob">IT Supply Chain Specialist</div><div class="col-sm-4 grayjob modalgrayjob">Management Consultant</div><div class="col-sm-4 pinkjob modalpinkjob">Personal Assistant</div><div class="col-sm-4 grayjob modalgrayjob">Planning Assistant</div><div class="col-sm-4 pinkjob modalpinkjob">Risk and Compliance Advisor</div><div class="col-sm-4 grayjob modalgrayjob extrapadding">Client Relationship Manager</div>')
            $("#where").append('<h4 class="pinkcolor h4modal">Where to work?</h4><div>Customer relations or customer support in businesses</div>');
        } else if (largestid == "m"){
            $("#resultRoleName").text("Manager");
            $("#personalfeatures").append("<li>Organised</li><li>Motivator</li><li>Clear planner</li><li>Can work with budgets</li><li>Works efficiently</li><li>Natural leader</li><li>Persuader</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 grayjob modalgrayjob">Business Analyst</div><div class="col-sm-4 pinkjob modalpinkjob">Flood Risk Manager</div><div class="col-sm-4 grayjob modalgrayjob">IT Manager</div><div class="col-sm-4 pinkjob modalpinkjob">Media Manager</div><div class="col-sm-4 grayjob modalgrayjob">Project Planner</div><div class="col-sm-4 pinkjob modalpinkjob">Special Effects</div><div class="col-sm-4 grayjob modalgrayjob">Supervisor</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Head of Resource & Competence Management</div><div class="col-sm-4 grayjob modalgrayjob extrapadding">Product Development Manager</div>')
            $("#where").append('<h4 class="pinkcolor h4modal">Where to work?</h4><div>Any size business</div><div>Consultancies</div><div>Education institutions</div><div>Local government</div>');
        } else if (largestid == "po"){
            $("#resultRoleName").text("Policy Maker");
            $("#personalfeatures").append("<li>Polite</li><li>Conscientious</li><li>Good at explaining things to different technical abilities</li><li>Good eye for detail</li><li>Enjoys writing reports</li><li>Diplomatic</li><li>Likes information searching and reviewing</li>");
            $("#potentialjobs").append('<h4 class="pinkcolor">Potential Jobs</h4><div class="col-sm-4 grayjob modalgrayjob extrapadding">Chief Scientific Advisor</div><div class="col-sm-4 pinkjob modalpinkjob">Conservation Officer</div><div class="col-sm-4 grayjob modalgrayjob">Sustainability Consultant</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Diversity and Inclusion Officer</div><div class="col-sm-4 grayjob modalgrayjob extrapadding">Head of Engineering and Society</div><div class="col-sm-4 pinkjob modalpinkjob extrapadding">Head of Government Affairs</div><div class="col-sm-4 grayjob modalgrayjob">Lawyer</div><div class="col-sm-4 pinkjob modalpinkjob">Policy Officer</div>')
            $("#where").append('<h4 class="pinkcolor h4modal">Where to work?</h4><div>Local or national governments</div>');
        }
        $("#testModal").modal('toggle');
        $('#resultModal').modal('toggle');
    }
    $("#checksremaining").css("color", "#CC0000");
}

function submitMessage() {
    $("#thanksModal").modal("show");
    $.post('https://individualproject-teddsr.c9users.io/formProcess', function(data) {
        setTimeout(function(){
            $("#thanksModal").modal('hide');
        }, 1000);
    });
}

function backtoforum() {
    $("#forumPage").css("display", "block");
    $("#discussionPage").css("display", "none");
}

function addTopic() {
    var title = $("#inputTitle").val();
    var eventdescription = $("#inputDescription").val();
    var categoryID = parseInt($("#selectTopic option:selected").attr('id').split("countyID")[1]);
    if ($("#sessionUserID").val() != '') {
        var creationAuthor = parseInt($("#sessionUserID").val());
        $.post('https://individualproject-teddsr.c9users.io/addTopic', {title: title, eventdescription: eventdescription, creationAuthor: creationAuthor, categoryID: categoryID}, function(data) {
            $("#responseModal").show();
            if (data == '"Success"') {
                $('#responseModal').modal('toggle');
                $("#responseText").text("Discussion topic added!");
                $("#modalClose").css("display", "none");
                $("#topicModal").modal("toggle");
                $("#inputTitle").val("");
                $("#inputDescription").val("");
                setTimeout(function(){
                    $('#responseModal').modal('toggle');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    openForum();
                }, 2000);
            } else {
                $('#responseModal').modal('toggle');
                $("#modalClose").css("display", "block");
                $("#responseText").text(data);
                $("#modalClose").css("display", "block");
            }
        });
    } else {
        $("#loginModal").modal("toggle");
        $("#topicModal").modal("toggle");
    }
}

function addComment(id) {
    var comment = $("#inputComment").val();
    var postID = parseInt(id);
    if ($("#sessionUserID").val() != '') {
        var commentAuthor = parseInt($("#sessionUserID").val());
        $.post('https://individualproject-teddsr.c9users.io/addComment', {comment: comment, commentAuthor: commentAuthor, postID: id}, function(data) {
            $("#responseModal").show();
            if (data == '"Success"') {
                $('#responseModal').modal('toggle');
                $("#responseText").text("Comment added!");
                $("#modalClose").css("display", "none");
                $("#commentModal").modal("toggle");
                $("#inputComment").val("");
                setTimeout(function(){
                    $('#responseModal').modal('toggle');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    openDiscussion(id);
                }, 2000);
            } else {
                $('#responseModal').modal('toggle');
                $("#modalClose").css("display", "block");
                $("#responseText").text(data);
                $("#modalClose").css("display", "block");
            }
        });
    } else {
        $("#loginModal").modal("toggle");
        $("#commentModal").modal("toggle");
    }
}

function openDiscussion(id) {
    $("#forumPage").css("display", "none");
    $("#discussionPage").css("display", "block");
    $("#discussionContainer").empty();
    $("#commentTitle").empty();
    $.get('https://individualproject-teddsr.c9users.io/getDiscussion', {postID: id},function(data) {
        console.log(data)
        var forumData = data.replace('["',"").replace('"]',"");
        var forumDataArray = forumData.split('¬","');
        for (var i = 0; i < forumDataArray.length; i++) {
            console.log(forumDataArray[i].split("|")[0])
            $("#discussionContainer").append('<div class="category-panel"><div id="backtoforum" onclick="backtoforum()"><p>Back to forum</p></div><div class="row panel"><div class="col-sm-12 panel-heading textleft">'+ forumDataArray[i].split("|")[2] + '</div></div><div class="row"><div class="col-sm-12 panel-title"><div class="col-sm-8 textleft"><div class="authorbits" >'+ forumDataArray[i].split("|")[5] + '</div></div><div class="col-sm-4 textleft"><div class="authorbits">'+ forumDataArray[i].split("|")[4].substring(0,21) + '</div></div></div></div><div class="row"><div class="col-sm-12 panel-content"><div class="col-sm-12 textleft">'+ forumDataArray[i].split("|")[3] + '</div></div></div></div><div id="addcomment" data-toggle="modal" data-target="#commentModal" class="addcomment"><p id="plus2">+ </p><p id="plustitle2">Add Comment</p></div>');
            $("#commentTitle").append('<div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h3 class="modalTitles">Add Comment</h3><p class="nothingtoshow">' + forumDataArray[i].split("|")[2] + '</p><input type="text" id="discussionID" hidden="hidden" val="'+ forumDataArray[i].split("|")[0] + '"/></div><div class="modal-body"><div class="col-12"><div class="form-group"><textarea placeholder="Comment" id="inputComment" class="form-control inputs" cols="40" rows="5"></textarea></div><button type="button" class="btn btn-primary" id="submit" onclick="addComment('+ forumDataArray[i].split("|")[0] + ')">Add Comment</button></div></div>')
        }
       $.get('https://individualproject-teddsr.c9users.io/getComments', {postID: id}, function(data) {
            if (data !='[]') {
                var discussionData = data.replace('["',"").replace('"]',"");
                var discussionDataArray = discussionData.split('¬","');
                for (var i = 0; i < discussionDataArray.length; i++) {
                    $("#discussionContainer").append('<div class="category-panel"><div class="row"><div class="col-sm-12 panel-content bordertop"><div class="col-sm-8 textleft"><div>'+ discussionDataArray[i].split("|")[2] + '</div></div><div class="col-sm-4 textleft"><div class="">'+ discussionDataArray[i].split("|")[3].substring(0,21) + '</div></div><div class="col-sm-12 textleft"><div class="normal">'+ discussionDataArray[i].split("|")[1] + '</div></div></div></div></div>');
                }
            } else {
                $("#discussionContainer").append('<div class="nothingtoshow normal">No comments have been submitted yet! Why not be the first to comment!?</div>');
            }
        });
    });
}

function openEvent(id) {
    $.get('https://individualproject-teddsr.c9users.io/getEvent', {eventID: id}, function(data) {
        console.log(data)
        var eventData = data.replace('["',"").replace('"]',"");
        var eventDataArray = eventData.split('¬","');
        for (var i = 0; i < eventDataArray.length; i++) {
            console.log(eventDataArray[i].split("|")[0]);
            $("#eventName").text(eventDataArray[i].split("|")[1])
            $("#eventDate").text(eventDataArray[i].split("|")[2].substring(0,21));
            $("#eventLocation").text(eventDataArray[i].split("|")[3] + " " + eventDataArray[i].split("|")[5]);
            $("#eventCompany").text(eventDataArray[i].split("|")[7].replace("¬",""));
            $("#eventDescription").text(eventDataArray[i].split("|")[6]);
        } 
    });
}

function logout() {
    $("#logoutimage").css("display","none");
    $("#profileButton").css("display","none");
    $("#loginimage").css("display","block");
    $("#sessionUserID").val("");
}

function SHA256(s){
  var chrsz   = 8;
  var hexcase = 0;

 function safe_add (x, y) {
   var lsw = (x & 0xFFFF) + (y & 0xFFFF);
   var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
   return (msw << 16) | (lsw & 0xFFFF);
 }

 function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
 function R (X, n) { return ( X >>> n ); }
 function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
 function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
 function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
 function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
 function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
 function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

 function core_sha256 (m, l) {
   var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
   var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
   var W = new Array(64);
   var a, b, c, d, e, f, g, h, i, j;
   var T1, T2;

   m[l >> 5] |= 0x80 << (24 - l % 32);
   m[((l + 64 >> 9) << 4) + 15] = l;

   for ( var i = 0; i<m.length; i+=16 ) {
  a = HASH[0];
  b = HASH[1];
  c = HASH[2];
  d = HASH[3];
  e = HASH[4];
  f = HASH[5];
  g = HASH[6];
  h = HASH[7];

  for ( var j = 0; j<64; j++) {
    if (j < 16) W[j] = m[j + i];
    else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

    T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
    T2 = safe_add(Sigma0256(a), Maj(a, b, c));

    h = g;
    g = f;
    f = e;
    e = safe_add(d, T1);
    d = c;
    c = b;
    b = a;
    a = safe_add(T1, T2);
  }

  HASH[0] = safe_add(a, HASH[0]);
  HASH[1] = safe_add(b, HASH[1]);
  HASH[2] = safe_add(c, HASH[2]);
  HASH[3] = safe_add(d, HASH[3]);
  HASH[4] = safe_add(e, HASH[4]);
  HASH[5] = safe_add(f, HASH[5]);
  HASH[6] = safe_add(g, HASH[6]);
  HASH[7] = safe_add(h, HASH[7]);
   }
   return HASH;
 }

 function str2binb (str) {
   var bin = Array();
   var mask = (1 << chrsz) - 1;
   for(var i = 0; i < str.length * chrsz; i += chrsz) {
  bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
   }
   return bin;
 }

 function Utf8Encode(string) {
   string = string.replace(/\r\n/g,"\n");
   var utftext = "";

   for (var n = 0; n < string.length; n++) {

  var c = string.charCodeAt(n);

  if (c < 128) {
    utftext += String.fromCharCode(c);
  }
  else if((c > 127) && (c < 2048)) {
    utftext += String.fromCharCode((c >> 6) | 192);
    utftext += String.fromCharCode((c & 63) | 128);
  }
  else {
    utftext += String.fromCharCode((c >> 12) | 224);
    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    utftext += String.fromCharCode((c & 63) | 128);
  }

   }

   return utftext;
 }

 function binb2hex (binarray) {
   var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
   var str = "";
   for(var i = 0; i < binarray.length * 4; i++) {
  str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
  hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
   }
   return str;
 }

 s = Utf8Encode(s);
 return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}