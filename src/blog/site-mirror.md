---
title: Mirroring My Website on NekoWeb (and Auto-Deploying It with GitHub Actions)
date: 2025-05-30
excerpt: Mirroring my website on NekoWeb
layout: blog
tags:
- blog
- web development
- eleventy
- javascript
eleventyExcludeFromCollections: true
---

## Outline

### Introduction
- Why mirror your site?
- Why NekoWeb is appealing

### My Site Structure
- Overview of Eleventy setup
- How I handle asset paths (e.g. images, CSS)

### Image Issues on NekoWeb
- What went wrong the first time
- Why root-relative paths break in subdirectories
- Solution: upload to root

### GitHub Actions Setup
- Existing deployment to Neocities
- Adding NekoWeb deployment
  - Use FTP or direct upload
  - Store credentials as secrets

### Redirect Page (Optional)
- Why I made one
- Fun features (train gif, countdown, pixel font)
- Link to `snails.town` (main site)

### Final Thoughts
- What works well
- Things to improve later (e.g. domain handling)
- Inviting others to try it

