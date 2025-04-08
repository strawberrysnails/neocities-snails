const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/photogrid.css");
  eleventyConfig.addPassthroughCopy("src/javascript");

  eleventyConfig.addLayoutAlias("main", "base.njk");
  eleventyConfig.addLayoutAlias("blog", "post.njk");

  // This will stop the default behaviour of foo.html being turned into foo/index.html
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
