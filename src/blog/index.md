---
layout: main
title: Blog
permalink: /blog/
nesting: "../"
eleventyExcludeFromCollections: true
---

# Blog

<ul class="post-list">
{% for post in collections.blog %}
  <li class="post-item">
    <h2>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
    </h2>
    <time datetime="{{ post.date | dateIso }}">{{ post.date | dateReadable }}</time>
    {% if post.data.excerpt %}
      <p>{{ post.data.excerpt }}</p>
    {% endif %}
  </li>
{% endfor %}
</ul>