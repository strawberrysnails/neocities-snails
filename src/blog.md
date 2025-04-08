---
layout: "base.njk"
title: Blog
---

# Blog

These are test posts

{% for blog in collections.blog %}

<h2>
<a href="{{ blog.url }}">{{ blog.data.title }}</a>
</h2>
{% endfor %}
