exports.files = {
	javascripts: { entryPoints: {
		'demo/initialize.js': 'sixgram-demo.js'
	}},
	stylesheets: { joinTo: 'sixgram-demo.css' }
};

exports.plugins = {
	babel: {
		presets: [
			["minify" , {}],
			['@babel/preset-env', {}]
		]
	},
	raw: {
		pattern: /\.(html|jss)$/,
		wrapper: content => `module.exports = ${JSON.stringify(content)}`
	}
};

exports.paths = {
	public: 'docs', watched: ['demo']
};

// exports.modules = {
// 	nameCleaner: path => path.replace(/^source(?:-docs)?\//, '')
// }
