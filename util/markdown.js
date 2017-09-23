const R = require('ramda')

// Transforms a markdown string into a string with basic html tags.
// String -> String
const transformMarkdown = R.pipe(
  R.replace(/\*\*(.*?)\*\*/gi, '<strong>$1</strong>'),
  R.replace(/\*(.*?)\*/gi, '<em>$1</em>'),
  R.replace(/__(.*?)__/gi, '<span style="text-decoration: underline;">$1</span>'),
  R.replace(/<script.*?\/script>/gi, '')
)

module.exports = {
  transformMarkdown
}
