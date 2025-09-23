---
layout: main
title: Blog
permalink: /blog/
nesting: "../"
eleventyExcludeFromCollections: true
eleventyNavigation:
  key: Blog
  order: 1
---

<main>

# Blog <small><a href="/blog/feed.xml"><i class="bi bi-rss-fill"></i></a></small>

<details style="border-left:none;">
  <summary>Browse by Tag</summary>
  <div class="tag-list">
    {% for tag in collections.tagList %}
      <a href="/blog/tags/{{ tag | slug }}/">#{{ tag }}</a>{% if not loop.last %}, {% endif %}
    {% endfor %}
  </div>
</details>
  {% include "html/main/blog-feed.html" %} 
</main>