exports.files = {
  javascripts: { joinTo: 'reckon-demo.js'},
  stylesheets: { joinTo: 'reckon-demo.css' }
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
