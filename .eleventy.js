const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItAnchor = require("markdown-it-anchor");

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
  eleventyConfig.addLayoutAlias("photogrid", "photogrid.njk");

  // Prevent default `foo/index.html` structure
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // Blog collection
  eleventyConfig.addCollection("blog", (collectionApi) => {
    return collectionApi.getFilteredByTag("blog").sort((a, b) => b.date - a.date);
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

  // Markdown config
  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs).use(markdownItAnchor));

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
