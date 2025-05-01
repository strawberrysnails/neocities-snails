document.addEventListener("DOMContentLoaded", function () {
  // Toggle for Games I'm Playing
  const togglePlayed = document.getElementById("togglePlayed");
  const tablePlayed = document.getElementById("tablePlayed");

  if (togglePlayed && tablePlayed) {
    const tbodyPlayed = tablePlayed.querySelector('tbody');
    togglePlayed.addEventListener("click", function() {
      if (tbodyPlayed.style.display === "none") {
        tbodyPlayed.style.display = "table-row-group"; // show tbody
        togglePlayed.textContent = "Hide Table";
      } else {
        tbodyPlayed.style.display = "none"; // hide tbody
        togglePlayed.textContent = "Show Table";
      }
    });
  }

  // Toggle for Games I'm Watching My Husband Play
  const toggleWatched = document.getElementById("toggleWatched");
  const tableWatched = document.getElementById("tableWatched");

  if (toggleWatched && tableWatched) {
    const tbodyWatched = tableWatched.querySelector('tbody');
    toggleWatched.addEventListener("click", function() {
      if (tbodyWatched.style.display === "none") {
        tbodyWatched.style.display = "table-row-group"; // show tbody
        toggleWatched.textContent = "Hide Table";
      } else {
        tbodyWatched.style.display = "none"; // hide tbody
        toggleWatched.textContent = "Show Table";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var images = document.querySelectorAll('img');
  images.forEach(function(img) {
    // Remove slash if on nekoweb
    if (window.location.hostname === "snails.nekoweb.org") {
      img.src = img.src.replace(/^\/+/, "");  // Remove any leading slashes
    }
  });
});