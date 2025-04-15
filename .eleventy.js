const Image = require("@11ty/eleventy-img");
const path = require("path");
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
  
  // This will stop the default behaviour of foo.html being turned into foo/index.html
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  // Blog collection
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByTag("blog").sort((a, b) => b.date - a.date);
  });
  
  

    // Date filters
    eleventyConfig.addFilter("dateIso", (date) => {
      return DateTime.fromJSDate(date).toISODate();
    });
  
    eleventyConfig.addFilter("dateReadable", (date) => {
      return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
    });

  // Configure markdown
  let markdownIt = require("markdown-it");
  let markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  
  eleventyConfig.setLibrary("md", markdownIt({ html: true }));

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
