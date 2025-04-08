const Image = require("@11ty/eleventy-img");
const path = require("path");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/photogrid.css");
  eleventyConfig.addPassthroughCopy("src/javascript");

  eleventyConfig.addLayoutAlias("main", "base.njk");
  eleventyConfig.addLayoutAlias("blog", "blog.njk");

  // This will stop the default behaviour of foo.html being turned into foo/index.html
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

    // Date filters
    eleventyConfig.addFilter("dateIso", (date) => {
      return DateTime.fromJSDate(date).toISODate();
    });
  
    eleventyConfig.addFilter("dateReadable", (date) => {
      return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
    });

  // Collections
  // Explicit blog collection (though tags in blog.json should handle this)
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByTags("blog").sort((a, b) => {
      return a.date - b.date;
    });
  });

  eleventyConfig.addFilter("getPreviousCollectionItem", (collection, page) => {
    const currentIndex = collection.findIndex(item => item.url === page.url);
    if (currentIndex === 0) return null;
    return collection[currentIndex - 1];
  });
  
  eleventyConfig.addFilter("getNextCollectionItem", (collection, page) => {
    const currentIndex = collection.findIndex(item => item.url === page.url);
    if (currentIndex === collection.length - 1) return null;
    return collection[currentIndex + 1];
  });

  // Configure markdown
  let markdownIt = require("markdown-it");
  let markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  
  eleventyConfig.setLibrary("md", markdownIt(markdownItOptions));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };

};
