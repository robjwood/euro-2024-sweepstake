require('dotenv').config();
module.exports = function (eleventyConfig) {

  eleventyConfig.addGlobalData('env', process.env);
  // Copy the following directories to the output folder 
  eleventyConfig.addPassthroughCopy("src/components");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");
  
  // Filters
  return {
    dir: {
      input: "src",
      output: "public",
    },
    markdownTemplateEngine: "njk"
  };
};