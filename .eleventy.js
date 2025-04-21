const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItAnchor = require("markdown-it-anchor");
const htmlmin = require("html-minifier-terser");
const externalLinksPlugin = require("@sardine/eleventy-plugin-external-links");
const pluginTOC = require("eleventy-plugin-toc");

module.exports = function (eleventyConfig) {
  // Passthrough file copies
  eleventyConfig.addPassthroughCopy({
    "src/images": "images",
    "src/javascript": "javascript",
    "src/css": "css",
    "src/_includes/fonts": "fonts"
  });

  // Layout aliases
  eleventyConfig.addLayoutAlias("main", "base.njk");
  eleventyConfig.addLayoutAlias("blog", "blog.njk");
  eleventyConfig.addLayoutAlias("tags", "tags.njk");
  eleventyConfig.addLayoutAlias("links", "links.njk");

  // Prevent default `foo/index.html` structure
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

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
    extensions: ["html"]
  });

  
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

  // Minify Settings
  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
      return minified;
    }
    return content;
  });

  // Markdown config 
  // EXAMPLE: ![Alt Text](image.jpg){.my-class}
  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs).use(markdownItAnchor));

  // TOC 
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"], // adjust as needed
    wrapper: "nav",
    wrapperClass: "toc",
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
