/* global $ */
$(document).ready(function() {
    $('#loginModal').css("display", "none");
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
