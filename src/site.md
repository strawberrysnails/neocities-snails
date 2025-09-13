---
title: About the Site
layout: main
nesting: ""
permalink: /site/
---
<main>

# About the site

This website is built with [Eleventy](https://www.11ty.dev/), a static site generator, using [VSCode](https://code.visualstudio.com/). It is hosted on [Neocities](https://neocities.org/site/snails) and uses [deploy-to-neocities](https://deploy-to-neocities.neocities.org/) github action.

*Snails* is safe-for-work, mobile-friendly, responsive, and best viewed on firefox browsers. I try my best to keep the website as accessable as possible. If you have any comments, concerns, or complaints regarding this, please reach out to me via [email](mailto:hello@snails.town). I love feedback and I'm always willing to improve upon things!

# Credits

All graphics are made by me unless otherwise stated.
All of the resources I used (+extras) to build this website can be found in [bookmarks](/notebook/bookmarks). 
All fonts used (+extras) can be found *and downloaded for free* in [fonts](/notebook/fonts).


# Site archive

Archiving is an important part of the internet. As I continiously update this website, I will always do my best to preserve it's previous forms. 

- [4-17-20](/archives/4-17-20)
- [12-20-23](/archives/12-20-23)
- [1-15-24](/archives/1-15-24)
- [4-30-25](/archives/4-30-25)
- [6-01-25](/archives/6-01-25)

<style>


ul.to-do li{
  font-size: 1em;
  list-style-type:none;
  line-height:2rem;
}

ul.to-do li::before {
  font-family: "bootstrap-icons";
  margin-right: 0.5em;
  content:"\F584 ";
}

ul.done li{
  font-size: 1em;
  text-decoration: line-through;
  list-style-type:none;
}

ul.done li::before {
  content:"\F26D";
  font-family: "bootstrap-icons";
  margin-right: 0.5em;
}

.to-do, .updates {
  flex: 1;          
}

.to-do + .updates {
  margin-left: 10px;      
}

.to-do fieldset, .updates fieldset {
  height: 400px;     
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
}

.to-do-updates-container {
  display: flex;
  gap: 10px;            
  flex-wrap: wrap;      
}

</style>
<div class="to-do-updates-container">
 <div class="to-do">
      <fieldset>
        <legend>To-Do List</legend>
        <ul class="to-do">
          <li>Update Manga and Anime log to have ratings and maybe some notes. Maybe add sorting/tags too.</li>
          <li>Update site credits/info to be more accurate and move to Notebook.</li>
          <li>Update game log to look better and add sorting.</li>
          <li>Tags/sorting to wishlist.</li>
          <li>DrakeNieR shrine.</li>
          <li>Miku shrine.</li>
          </ul>
          <ul class="done">
          <li>Add scroll to top button</li>
          <li>Organize Garden page</li>
          <li>add modal to photogrid</li>
          <li>Make a custom favicon and cursor</li>
          <li>Join some webrings or cliques</li>
          <li>RSS Feed</li>
          <li>Comment box or guestbook perhaps</li>
          <li>Sitemap</li>
          <li>About the site/links</li>
          <li>Photogrid</li>
          <li>Blog / blog tags</li>
      </ul>
      </fieldset>
    </div>
    <div class="updates">
      <fieldset>
        <legend>Updates</legend>
        {% if updates and updates.length %}
          <ul>
            {% for update in updates %}
              <li><strong><time datetime="{{ update.date | dateIso }}">{{ update.date | dateReadable }}</strong></time> – {{ update.blurb | safe }}
              </li>
            {% endfor %}
          </ul>
        {% else %}
          <p>No updates yet.</p>
        {% endif %}
      </fieldset>
    </div>
</div>
</main>