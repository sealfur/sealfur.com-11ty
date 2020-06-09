const moment = require('moment');
moment.locale('en-au');
module.exports = function(eleventyConfig) {

	eleventyConfig.addFilter('dateIso', date => {
		return moment(date).toISOString();
	});
	eleventyConfig.addFilter('dateReadable', date => {
		return moment(date).utc().format('LL');
	}); //should give 9 June, 2020
    eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article)); //gets the extract onto the index page
	return {
	  dir: {
		input: '_site',
		output: 'dist'
	  }
	}
  }

//-------------------------------------------
// ====SHOULD create an excerpt of the posts
// ==========================================

  function extractExcerpt(article) {
	if (!article.hasOwnProperty('templateContent')) {
	  console.warn('Failed to extract excerpt: Document has no property "templateContent".');
	  return null;
	}
   
	let excerpt = null;
	const content = article.templateContent;
   
	// The start and end separators to try and match to extract the excerpt
	const separatorsList = [
	  { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
	  { start: '<p>', end: '</p>' }
	];
   
	separatorsList.some(separators => {
	  const startPosition = content.indexOf(separators.start);
	  const endPosition = content.indexOf(separators.end);
   
	  if (startPosition !== -1 && endPosition !== -1) {
		excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
		return true; // Exit out of array loop on first match
	  }
	});
   
	return excerpt;
  }
  