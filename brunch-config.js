exports.files = {
  javascripts: { joinTo: 'sixgram-demo.js'},
  stylesheets: { joinTo: 'sixgram-demo.css' }
};

exports.plugins = {
  babel: {
    presets: [ "minify" , {} ]
  },
  raw: {
    pattern: /\.(html|jss)$/,
    wrapper: content => `module.exports = ${JSON.stringify(content)}`
  }
};

exports.paths = {
  public: 'docs', watched: ['source','demo']
};

exports.modules = {
	nameCleaner: path => path.replace(/^source(?:-docs)?\//, '')
}
