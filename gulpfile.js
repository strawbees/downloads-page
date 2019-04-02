const gulp = require('gulp')
const del = require('del')
const webpack = require('webpack')
const config = require('./webpack.config.js')
const concat = require('gulp-concat')
const smoosh = require('gulp-smoosher')

const clean = async function() {
	await del([
		'./temp/**/*',
		'./dist/**/*'
	])
}

// Runs webpack (and babel) on the application source code.
// Outputs to `temp` folder.
const tempBundleJs = async function() {
	return new Promise((resolve, reject) => {
		const compiler = webpack(config)
		compiler.run((err, stats) => {
			if (err) { reject(err) }
			console.log('errors', stats.compilation.errors)
			console.log('warnings', stats.compilation.warnings)
			resolve()
		});
	})
}

// Concat and moves polyfills to `temp` folder.
const tempMovePolyfill = async function(cb) {
	return new Promise((resolve, reject) => {
		gulp.src([
				'./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
				'./node_modules/whatwg-fetch/dist/fetch.umd.js'
			])
			.pipe(concat('polyfill.js'))
			.pipe(gulp.dest('./temp'))
			.on('end', resolve)
	})
}

// Concat and moves css to `temp` folder.
const tempMoveCss = async function(cb) {
	return new Promise((resolve, reject) => {
		gulp.src([
				'./src/fonts.css',
				'./src/main.css'
			])
			.pipe(concat('bundle.css'))
			.pipe(gulp.dest('./temp'))
			.on('end', resolve)
	})
}

// Moves `index.html` to `temp` folder. This is needed to smoosh correct files
const tempMoveHtml = async function(cb) {
	return new Promise((resolve, reject) => {
		gulp.src('./src/index.html')
		.pipe(gulp.dest('./temp'))
		.on('end', resolve)
	})
}

// Merges javascript files into `main.js`
const concatJs = async function() {
	return new Promise((resolve, reject) => {
		gulp.src([
				'./temp/polyfill.js',
				'./temp/bundle.js'
			])
			.pipe(concat('main.js'))
			.pipe(gulp.dest('temp'))
			.on('end', resolve)
	})
}

// Replace `script` tags with the file content.
const smooshHtml = async function() {
	return new Promise((resolve, reject) => {
		gulp.src('./temp/index.html')
			.pipe(smoosh())
			.pipe(gulp.dest('./dist'))
			.on('end', resolve)
	})
}

gulp.task('default', async () => {
	await clean()

	// Bundle and move files to a `temp` folder
	await tempMoveHtml()
	await tempMoveCss()
	await tempMovePolyfill()
	await tempBundleJs()
	await concatJs()

	// Merge everything in one file and move it to `dist` folder
	await smooshHtml()
})
