const rmj = require('render-markdown-js');
const moment = require("moment");


module.exports = function (eleventyConfig) {

    eleventyConfig.setTemplateFormats("njk,md,html");
    
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('admin');
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addPassthroughCopy('ELEMENTOS');
    eleventyConfig.addPassthroughCopy('_includes');

    eleventyConfig.addNunjucksFilter("rmj", function (content) {
        return rmj(content);
    });

    eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addFilter('log', value => {
        console.log(value)
    });

    eleventyConfig.addFilter("sub_string", function (string) {
        return string.substring(0, 150);
    })

    eleventyConfig.addCollection("propuestas", function (collectionApi) {
        return collectionApi.getFilteredByTag('propuestas');
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return moment(date).format(format);
    });

}