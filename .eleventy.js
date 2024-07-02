require('dotenv').config();
module.exports = function (eleventyConfig) {

  eleventyConfig.addGlobalData('env', process.env);
  // Copy the following  to the output folder 
  eleventyConfig.addPassthroughCopy("src/components");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("manifest.json");
  eleventyConfig.addPassthroughCopy("service-worker.js");
  eleventyConfig.addPassthroughCopy("favicon.ico");


  // Filters
  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk"
  };
};