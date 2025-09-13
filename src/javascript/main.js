
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

  // Lastfm index widget
(function () {
  var timeAgo;

  timeAgo = function (dateParam) {
    var DAY_IN_MS,
      d,
      date,
      isThisYear,
      isToday,
      isYesterday,
      minutes,
      seconds,
      t,
      today,
      yesterday;
    if (!dateParam) {
      return null;
    }
    date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
    DAY_IN_MS = 86400000;
    today = new Date();
    yesterday = new Date(today - DAY_IN_MS);
    seconds = Math.round((today - date) / 1000);
    minutes = Math.round(seconds / 60);
    isToday = today.toDateString() === date.toDateString();
    isYesterday = yesterday.toDateString() === date.toDateString();
    isThisYear = today.getFullYear() === date.getFullYear();
    if (seconds < 5) {
      return "now";
    } else if (seconds < 60) {
      return seconds + " seconds ago";
    } else if (seconds < 90) {
      return "about a minute ago";
    } else if (minutes < 60) {
      return minutes + " minutes ago";
    } else if (isToday) {
      t = date.toLocaleString("en-gb", {
        hour: "2-digit",
        minute: "2-digit"
      });
      return "today at " + t;
    } else if (isYesterday) {
      t = date.toLocaleString("en-gb", {
        hour: "2-digit",
        minute: "2-digit"
      });
      return "yesterday at " + t;
    } else if (isThisYear) {
      d = date.toLocaleString("en-gb", {
        day: "numeric",
        month: "long"
      });
      t = date.toLocaleString("en-gb", {
        hour: "2-digit",
        minute: "2-digit"
      });
      return d + " at " + t;
    }
    d = date.toLocaleString("en-gb", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true
    });
    t = date.toLocaleString("en-gb", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    return d + " at " + t;
  };

  document.addEventListener(
    "DOMContentLoaded",
    (function (_this) {
      return function () {
        var nowlistening, nowlisteningdate, target;
        target =
          "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=froggf&limit=1&api_key=c0a552c516a4bf38f364fe75337435d5&format=json";
        nowlistening = document.querySelector("#nowlistening");
        nowlisteningdate = document.querySelector("#nowlisteningdate");
        return fetch(target)
          .then(function (res) {
            return res.json();
          })
          .then(function (body) {
            var track, trackDate;
            track = body.recenttracks.track[0];
            trackDate =
              track["@attr"] && track["@attr"].nowplaying
                ? "now playing"
                : timeAgo(track.date["#text"] + " UTC");
            nowlistening.innerHTML =
              track.artist["#text"] + " -- " + track.name;
            nowlistening.href = track.url;
            return (nowlisteningdate.innerHTML = trackDate);
          })
          ["catch"](function (err) {
            console.log(err);
            nowlistening.innerHTML = "oops";
            return (nowlisteningdate.innerHTML =
              "error happened trying to talk to last.fm :(");
          });
      };
    })(this)
  );
}.call(this));


  // Style Switcher
function changeStyle(style) {
  if (!style) {
    style = localStorage.getItem("style") || "maintheme";
  }

  const themeLink = document.getElementById("theme-style");
  if (themeLink) {
    themeLink.setAttribute("href", `/css/${style}.css`);
  }

  localStorage.setItem("style", style);
}

// Expose globally in case needed
window.changeStyle = changeStyle;

document.addEventListener("DOMContentLoaded", function () {

  const themeSelect = document.querySelector('select[name="styleswitcher"]');
  if (themeSelect) {
    const savedTheme = localStorage.getItem("style") || "maintheme";
    themeSelect.value = savedTheme;
    changeStyle(savedTheme);

    themeSelect.addEventListener("change", function() {
      changeStyle(this.value);
    });
  }

  // SCROLL TO TOP BUTTON // CREDIT: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp

 const mybutton = document.getElementById("myBtn");
  if (mybutton) {
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.classList.add("show"); // fade in
      } else {
        mybutton.classList.remove("show"); // fade out
      }
    }

    // Run once on page load
    scrollFunction();

    // Update on scroll
    window.addEventListener("scroll", scrollFunction);

    // Smooth scroll on click
    mybutton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});

// MARQUEE
[...document.querySelectorAll(".buttons-n-blinkers")] // get everything we want to marquee
.map((div) => div.children[0]) // turn all of them into their first child that actually holds all the images
.forEach((innerDiv) => { // run a function on all of these...
  let follower = innerDiv.cloneNode(true); // that copies the image container
  follower.classList.add("follower"); // makes the new one a follower
  innerDiv.parentElement.appendChild(follower); // and puts the follower right after the original
  follower.classList.add("play"); // and makes them both play
  innerDiv.classList.add("play");
})
