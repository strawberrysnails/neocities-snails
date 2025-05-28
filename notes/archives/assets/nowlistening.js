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
        minute: "2-digit",
      });
      return "today at " + t;
    } else if (isYesterday) {
      t = date.toLocaleString("en-gb", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return "yesterday at " + t;
    } else if (isThisYear) {
      d = date.toLocaleString("en-gb", {
        day: "numeric",
        month: "long",
      });
      t = date.toLocaleString("en-gb", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return d + " at " + t;
    }
    d = date.toLocaleString("en-gb", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true,
    });
    t = date.toLocaleString("en-gb", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
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
}).call(this);
