
  // Active links
  const links = document.querySelectorAll('header a');
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });


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


// LASTFM WIDGET

const username = "froggf";

fetch(`https://lastfm-last-played.biancarosa.com.br/${username}/latest-song`)
  .then(res => res.json())
  .then(data => {
    const widget = document.getElementById("lastfm-widget");
    if (!widget || !data || !data.track) return;

    const track = data.track;
    const image = track.image?.find(img => img.size === "large")?.["#text"];

    widget.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1em;">
        ${image ? `<img src="${image}" alt="Album art for ${track.name}" width="64" height="64" style="border-radius: 4px;">` : ""}
        <div>
          Now listening:<br>
          <strong>
            <a href="${track.url}" target="_blank" rel="noreferrer">
              ${track.name}
            </a> – ${track.artist["#text"]}
          </strong>
        </div>
      </div>
    `;
  })
  .catch(err => {
    console.error("Error fetching Last.fm data:", err);
    const widget = document.getElementById("lastfm-widget");
    if (widget) widget.textContent = "Unable to load recent track.";
  });


