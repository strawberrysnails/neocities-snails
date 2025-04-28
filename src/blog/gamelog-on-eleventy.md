---
title: Making a Gamelog on Eleventy
date: 2025-04-28
excerpt: How I created my gamelog on eleventy
layout: blog
tags: 
- blog
- gaming
- web development
- eleventy
---
There are plenty of ways to keep track of your gaming: steam, backlogged, [grovee](https://www.grouvee.com/user/175297-saturnringz/shelves), ect. but I wanted something offline and more personal. Especially because I also plan to track all the games I watch my husband play.

## Table of Contents
Because this is a long one.
- [Introduction](#intro)
  - [Minor rules for myself](#minor-rules-for-myself)
  - [Notes for the reader](#notes-for-the-reader)
- [First steps](#first-steps)
- [Making the page](#making-the-page)
  - [Organizing it a bit more](#organizing-it-a-bit-more)
- [Styling and fun stuff](#styling-and-fun-stuff)
    - [Styles](#styles)
    - [Collapsibility](#collapsibility)
    - [Making custom badges](#making-custom-badges)
    - [Adding the badges to my table](#adding-the-badges-to-my-table)
- [Conclusion](#conclusion)

## Intro

This is kind of a special case, because we have a little ritual: my husband plays through a game while I watch, helping him make decisions, solve puzzles, etc., while he controls everything. We have the opposite dynamic as well, he watches me play plenty. For example, he watched me play through *Nier: Replicant*, and right now he’s watching me play *Drakengard 3*. We also plan for him to watch me play Nier: Automata. Just like he's working through all the *Dark Souls* games with me watching, I'm working through the *Nier* series with him watching. I think this is special and I highly reccomend it, it's a nice way to bond and we really enjoy the story and lore of games together.

I also started regularly using *his* modded New 3DS XL, which is a much nicer version of mine. (I have a regular 3DS). I love handheld consoles and the 3DS is very nostalgic and special to me. There are so many amazing games that were created for it that you can only really experience on the console itself, impossible to emmulate. I want to keep track of these too, which is something you can do on grovee but it's not perfect.

### Minor rules for myself

I don't want to overwhelm myself with my massive gaming backlog, the games I've completed over the years, or the ones I'll keep revisiting forever (like Minecraft and Stardew Valley). I also want to focus only on tracking linear, narrative games, ones with a clear beginning and end, and skip things like MMOs, MOBAs, and similar. The "planning" category should stay small too. It will be just games I've already downloaded and actually plan to start soon, not a giant wishlist. Maybe eventually my large wishlist/backlog will make it's way to this website some other day, but for now that will live on grovee and steam. 

### Notes for the reader

I wouldn’t really consider this a tutorial or guide, but if you’re following along, some previous knowledge of Eleventy is definitely required. I’m assuming you already have an Eleventy project set up and running before trying anything I talk about here. If any of this is confusing or I'm missing information, I apologize. Perhaps view the **[source code on github](https://github.com/leajpg/neocities-snails)** for some clarity. Also, ***I grant full permission to steal all of it.*** Just let me know if you do. (˶ᵔ ᵕ ᵔ˶)

## First steps

All that being said, I wanted a game log with the following:
- Personal, customizable, and not dependant on any website
- Keep track of games I am playing vs. watching
- The platform (PC, 3DS, or emulated)
- Obviously wether it's being currently played/watched, completed, or planning
- Keep data clean and in it's own file so I don't have to manually update the HTML every time something changes
- Collapsable tables for easy viewing
- Clean and organized layout

First, I made a list of games and the variables that are important to me. In my input folder (mine is called src but some people call it "input" or "content"), I created a file under `/_data` called **`gamelog.js`**.

`src/_data/gamelog.js`

```javascript
module.exports = [
    {
    title: "TITLE OF GAME",
    platform: "Emulator", "PC", or "DS",
    status: "currently playing", "completed", or "planning",
    type: "played" or "watched" // only applies to me unless you plan on keeping track of all the playthoughs you watch
    }
    // Real example:
    {
      title: "Drakengard 3",
      platform: "Emulator",
      status: "currently playing", 
      type: "played"
    },
      ];
```
Simple! Now if I want to update or add games I can just edit this file. I can easily search for a game I want to edit with Ctrl+F.

## Making the page

Most of my Eleventy pages are written in Markdown, especially if it's just a lot of text and images. But for this page, I thought HTML would be easier for creating the tables and customizing the styling.

Here, I won’t be showing too much of the front matter or other parts of the page, just the tables I'm generating with the data I created.

I chose to organize it with two tables: Games I'm Playing and Games I'm Watching My Husband Play

```html {% raw %}
<h2>Games I'm Playing</h2>
<table>
  <thead>
    <tr><th>Title</th><th>Status</th><th>Platform</th></tr>
  </thead>
  <tbody>
    {% for game in gamelog %}
      {% if game.type == "played" %}
        <tr>
          <td>{{ game.title }}</td>
          <td>{{ game.status }}</td>
          <td>{{ game.platform}}</td>       
        </tr>
      {% endif %}
    {% endfor %}
  </tbody>
</table>
<hr>
<h2>Games I'm Watching my Husband Play</h2>
<table>
  <thead>
    <tr><th>Title</th><th>Status</th><th>Platform</th></tr>
  </thead>
  <tbody>
    {% for game in gamelog %}
      {% if game.type == "watched"%}
        <tr>
          <td>{{ game.title }}</td>
          <td>{{ game.status }}</td>
          <td>{{ game.platform }}</td>  
        </tr>
      {% endif %}
    {% endfor %}
  </tbody>
</table>
{% endraw %}```

The above should output something **like** this: 

| Title                        | Status              | Platform   |
|------------------------------|---------------------|------------|
| Drakengard 3                 | Currently Playing   | Emulator  |
| Divinity: Original Sin       | Currently Playing   | PC        |
| Art Academy                  | Currently Playing   | DS        |
| Pokemon X [replay]           | Currently Playing   | DS        |
| Nier: Replicant              | Completed           | PC        |
| Baldur's Gate 3              | Completed           | PC        |
| Divinity: Original Sin II    | Planning            | PC        |
| Nier: Automata               | Planning            | PC        |

Notes:
- this is my default table styling from my styles.css file. We will get to that shortly.
- this table is from a smaller set of data with no second table for "Games I'm watching", just for simplicity.

### Organizing it a bit more

Everything is functioning as it should but I wanted my tables to be organized by status, so I wrapped my data in a fuction like so:
```javascript {% raw %}
// define the status order
const statusOrder = {
  "currently playing": 0,
  "currently watching": 1,
  "completed": 2,
  "planning": 3,
};

const gamelog = [
    {
    // game variables here
    }, 
];
  
// export sorted by status
module.exports = gamelog.sort((a, b) => {
  return (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
});
{% endraw %}```

## Styling and fun stuff

### Styles

This is my personal way of styling. I wanted it to be simple, readable, and match my websites aesthetic. If you want to see the full file, it's public on [github](https://github.com/leajpg/neocities-snails/blob/main/public/css/styles.css) or viewable **[here](/css/styles.css)**.


```css
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2em;
  background-color: #ffeef2;
  box-shadow: 0 0 0 4px #fff8fb, 0 0 0 8px #fff;
  font-size: 0.95rem;
}

th {
  background-color: #000;
  color: var(--silver);
  font-family: "Kelmscott";
  font-size: 1.2rem;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid var(--wine);
  letter-spacing: 1px;
}

td {
  background-color: var(--silver);
  color: #3e2a2a;
  padding: 7px;
  border-top: 1px dotted var(--wine);
  font-family: "Basiic", sans-serif;
  font-weight: 700;
}

td:last-child,
th:last-child {
  max-width: 100px;
  width: 150px;
}

td:not(:last-child),
th:not(:last-child) {
  border-right: 1px dotted var(--wine);
}

tr:nth-child(even) td {
  background-color: rgb(198, 198, 198);
}

tr:hover td {
  background-color: rgb(198, 198, 198);
}

```
### Collapsibility

I added a "Hide Table" button and id to my table like so.
Since I have two tables, they need unique ids.

```html
<h2>Games I'm Playing</h2>
<button id="togglePlayed">Hide Table</button>
<table id="tablePlayed">
...
</table>
<hr>
<h2>Games I'm Watching My Husband Play</h2>
<button id="toggleWatched">Hide Table</button>
<table id="tableWatched">
...
</table>
```

and here's the javascript to make the button hide my table body.

```javascript
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
```

### Making custom badges

I thought it would be cute to make badges for each platform and game status instead of plain text.
**[This form](https://www1.flightrising.com/forums/cc/3078623)** has an endless amount of buttons to look at and choose from. They have a button maker and blank buttons to customize too! I made these using a mix of their blank and **[this generator](https://idbuttons.neocities.org/maker/)**, depending on how complex I wanted the graphic to be.

![ds](/images/badges/ds.webp) ![emulator](/images/badges/emulator.webp) ![pc](/images/badges/pc.webp)

![currently](/images/badges/currently.png) ![completed](/images/badges/completed.png) ![planning](/images/badges/planning.png)

### Adding the badges to my table

In my **`gamelog.js`** file I added 2 new functions and variables.

```javascript

// Platform badges
function getPlatformBadge(platform) {
  const key = platform.toLowerCase();
  if (key === "pc") return "/images/badges/pc.webp";
  if (key === "ds" || key === "3ds" || key === "nds") return "/images/badges/ds.webp";
  if (key === "emulator") return "/images/badges/emulator.webp";
  return null;
}
// Status badges
function getStatusBadge(status) {
  const key = status.toLowerCase();
  if (key === "currently playing") return "/images/badges/currently.png";
  if (key === "currently watching") return "/images/badges/currently.png";
  if (key === "completed") return "/images/badges/completed.png";
  if (key === "planning") return "/images/badges/emulator.planning.png";
  return null;
}

const gamelog = [
    {
      title: "Drakengard 3",
      platform: "Emulator",
      platformImage: getPlatformBadge("emulator"),
      statusImages: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played"
    }, 
    ...
]
``` 

and on my **`games.html`** pages I edited my table

```html {% raw %}
<h2>Games I'm Playing</h2>
<table>
  <thead>
    <tr><th>Title</th><th>Status</th><th>Platform</th></tr>
  </thead>
  <tbody>
    {% for game in gamelog %}
      {% if game.type == "played" %}
        <tr>
          <td>{{ game.title }}</td>
        <td class="status">
          {% if game.statusImage %}
            <img src="{{ game.statusImage }}" alt="{{ game.status }} badge">
          {% else %}
            {{ game.status }}
          {% endif %}
        </td>
        <td class="platform">
          {% if game.platformImage %}
            <img src="{{ game.platformImage }}" alt="{{ game.platform }} badge">
          {% else %}
            {{ game.platform }}
          {% endif %}
        </td>           
        </tr>
      {% endif %}
    {% endfor %}
  </tbody>
</table>
{% endraw %}```

Well, I think it looks nice and it's working properly.

## Conclusion

My game log, like the rest of my website, will forever be under construction. I'll want to add, change, and remove things as long as I keep making updates. But for now it's *done* and I actually like it. You can view it live **[here](/medialog/games/)**! You can also look at all the source code on **[github](https://github.com/leajpg/neocities-snails)** I really enjoyed learning a bit more about eleventy from this. If you make something similar, please share (,,>ヮ<,,)