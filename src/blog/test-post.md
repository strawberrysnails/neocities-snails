---
title: Getting Started with Eleventy
date: 2025-04-08
excerpt: Learn how to build a static site with 11ty, the simpler static site generator.
layout: blog
tags:
- blog
- eleventy
- javascript
---
# This is a test blog post

But I'm keeping it up for reference purposes and so others can use it as a test. 

Eleventy (11ty) is a simple static site generator that's perfect for building blogs, portfolio sites, and other content-focused websites.

## Why Eleventy?

- Zero client-side JavaScript by default
- Flexible template languages (Markdown, Nunjucks, Liquid, etc.)
- Fast build times
- Simple configuration

## Setting up a basic Eleventy site

First, install Eleventy:

```bash
npm install -g @11ty/eleventy
```

Then create a simple page and run the site:

```bash
echo '# Hello World' > index.md
eleventy --serve
```

And that's it! You now have a basic Eleventy site up and running.