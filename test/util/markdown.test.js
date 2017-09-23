const assert = require('assert')
const { transformMarkdown } = require('../../util/markdown')

describe('Markdown Utility', () => {
  describe('transformMarkdown', () => {
    it ('should replace all instances of text wrapped in ** markdown with <strong/> tags', () => {
      assert.equal('This is some <strong>test text</strong>.', transformMarkdown('This is some **test text**.'))
      assert.equal('This <strong>is</strong> some test <strong>text</strong>.', transformMarkdown('This **is** some test **text**.'))
    })
    it ('should replace all instances of text wrapped in * markdown with <em/> tags', () => {
      assert.equal('This is some <em>test text</em>.', transformMarkdown('This is some *test text*.'))
      assert.equal('This <em>is</em> some test <em>text</em>.', transformMarkdown('This *is* some test *text*.'))
    })
    it ('should replace all instances of text wrapped in __ markdown with <span style="text-decoration: underline;"/> tags', () => {
      assert.equal('This is some <span style="text-decoration: underline;">test text</span>.', transformMarkdown('This is some __test text__.'))
      assert.equal('This <span style="text-decoration: underline;">is</span> some test <span style="text-decoration: underline;">text</span>.', transformMarkdown('This __is__ some test __text__.'))
    })
    it ('should be able to handle multiple markdown tags in a single string', () => {
      assert.equal('<span style="text-decoration: underline;">This</span> <strong>is some</strong> <em>test text</em>.', transformMarkdown('__This__ **is some** *test text*.'))
    })
    it ('should remove any script tags so that no unsafe JavaScript can be injected into the string', () => {
      assert.equal('This is some test text.', transformMarkdown('This is some test <script>console.log("test")</script>text.'))
    })
  })
})
