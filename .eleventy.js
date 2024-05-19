module.exports = function (eleventyConfig) {

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
    // markdownTemplateEngine: "njk"
  };
};