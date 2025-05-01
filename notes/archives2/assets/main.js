$(document).ready(function () {
  $(".left").load("sidebar.html");
  $("header").load("header.html");
  $(".icons").load("nav.html");
});

function loadContent(page, title) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("main-content").innerHTML = this.responseText;
      document.querySelector("main .title-bar-text").textContent = title;
    }
  };
  xhttp.open("GET", page, true);
  xhttp.send();
}
