const rmj = require('render-markdown-js');


module.exports = function (eleventyConfig) {

    eleventyConfig.setTemplateFormats("njk,md,html");
    
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('ELEMENTOS');

    eleventyConfig.addNunjucksFilter("rmj", function (content) {
        return rmj(content);
    });

    eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addFilter('log', value => {
        console.log(value)
    });

    eleventyConfig.addCollection("propuestas", function (collectionApi) {
        return collectionApi.getFilteredByTag('propuestas');
    });
}