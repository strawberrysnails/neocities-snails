const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");
const externalLinksPlugin = require("@sardine/eleventy-plugin-external-links");
const pluginTOC = require("eleventy-plugin-toc");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginReadingTime = require("eleventy-plugin-reading-time");



module.exports = function (eleventyConfig) {
  // Passthrough file copies
  eleventyConfig.addPassthroughCopy({
    "src/images": "images",
    "src/javascript": "javascript",
    "src/css": "css",
    "src/_includes/fonts": "fonts",
    "src/archives/images": "archives/images",
    "src/notebook/archives/images": "notebook/archives/images",
  });  

  eleventyConfig.addGlobalData("siteMetadata", require("./src/_data/site.js"));

  // RSS
  eleventyConfig.addPlugin(pluginRss);

  // Layout aliases
  eleventyConfig.addLayoutAlias("main", "base.njk");
  eleventyConfig.addLayoutAlias("blog", "blog.njk");
  eleventyConfig.addLayoutAlias("tags", "tags.njk");
  eleventyConfig.addLayoutAlias("links", "links.njk");
  eleventyConfig.addLayoutAlias("pinboard", "pinboard.njk");
   eleventyConfig.addLayoutAlias("notebook", "notebook.njk");
      eleventyConfig.addLayoutAlias("archive", "archive.njk");


  // Add a computed property for 'now'
  eleventyConfig.addGlobalData('now', () => {
    return new Date().toISOString();
  });

  // Computed permalinks for blog posts by date
eleventyConfig.addGlobalData("eleventyComputed", {
  permalink: (data) => {
    // Only apply to markdown files tagged as "blog"
    if (data.tags && data.tags.includes("blog")) {
      const date = new Date(data.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const shortDate = `${month}${day}`;

      // Use fileSlug (from filename) for the main part
      const slug = data.page.fileSlug;

      return `/blog/${year}/${slug}-${shortDate}/`;
    }

    // Fallback: default Eleventy behavior for other pages
    return data.permalink;
  },
});


  // Sitemap Collection
eleventyConfig.addCollection("sitemapGroups", function (collectionApi) {
  const grouped = {};
  collectionApi.getAll().forEach(item => {
    const group = item.data.sitemapGroup || "root";
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(item);
  });
  return grouped;
});


// Blog collection
eleventyConfig.addCollection("blog", (collectionApi) => {
  return collectionApi.getFilteredByTag("blog").sort((a, b) => b.date - a.date);
});

// Tag list collection
eleventyConfig.addCollection("tagList", function(collectionApi) {
  const tags = new Set();
  collectionApi.getFilteredByTag("blog").forEach(item => {
    (item.data.tags || []).forEach(tag => tags.add(tag));
  });
  return [...tags];
});

// Create a tag page for each unique tag
eleventyConfig.addCollection("tagPages", function(collectionApi) {
  const tags = collectionApi.getFilteredByTag("blog");
  const tagPages = new Set();

  tags.forEach(item => {
    (item.data.tags || []).forEach(tag => tagPages.add(tag));
  });

  return [...tagPages];
});


  // Game Filters
  eleventyConfig.addFilter("getCurrentGame", (games) => {
    const current = games.find(g => g.status === "currently playing" && g.type === "played");
    return current ? current.title : "Nothing right now";
  });

  eleventyConfig.addFilter("getCurrentWatchedGame", (games) => {
    const current = games.find(g => g.status === "currently watching" && g.type === "watched");
    return current ? current.title : "Nothing right now";
  });

  // Anime
  eleventyConfig.addFilter("getCurrentAnimeWatch", (animeList) => {
    const filtered = animeList
      .filter(item => item.status?.toUpperCase() === "CURRENT")
      .sort((a, b) => (b.progress || 0) - (a.progress || 0));

    return filtered.length ? filtered[0].title : "Nothing right now";
  });

  // Manga
  eleventyConfig.addFilter("getCurrentMangaRead", (mangaList) => {
    const filtered = mangaList
      .filter(item => item.status?.toUpperCase() === "CURRENT")
      .sort((a, b) => (b.progress || 0) - (a.progress || 0));

    return filtered.length ? filtered[0].title : "Nothing at the moment";
  });

  eleventyConfig.addPlugin(externalLinksPlugin, {
    // Default behavior
    urlPattern: /^https?:\/\//,
    target: "_blank",
    rel: "noopener noreferrer",
    extensions: ['.md', '.html'],
  });

  
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginReadingTime);

  
  // General and Fallback
  eleventyConfig.addFilter("filterByStatus", (list, status) =>
    list.filter(item => item.status?.toLowerCase() === status.toLowerCase())
  );
  
  eleventyConfig.addFilter("fallback", (value, fallback = "N/A") => value || fallback);


  // Date formatting
  eleventyConfig.addFilter("dateIso", (date) => {
    return DateTime.fromJSDate(date).toISODate();
  });

  eleventyConfig.addFilter("dateReadable", (date) => {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
  });

    eleventyConfig.addFilter("dateReadableShort", (date) => {
    return DateTime.fromJSDate(date).toFormat("MMM-dd-yy");
  });


  // EXAMPLE: ![Alt Text](image.jpg){.my-class}
  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs).use(markdownItAnchor));


    // Markdown config with anchors & TOC
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
  .use(markdownItAttrs)
  .use(markdownItFootnote)
  .use(markdownItAnchor, {
    level: [2, 3], // h2 and h3
    permalink: markdownItAnchor.permalink.ariaHidden({
      symbol: '#',
      placement: 'before'
    }),
    slugify: s =>
      s
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')  
        .replace(/\s+/g, '-'),     
  });

  eleventyConfig.setLibrary("md", md);

  // TOC plugin
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"],       
    wrapper: "nav",
    wrapperClass: "toc",
    headingText: "Table of Contents", 
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
