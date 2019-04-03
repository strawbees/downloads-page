import StrawbeesDownloadElement from './components/strawbees-download.js'
import StrawbeesDownloadItemElement from './components/strawbees-download-link.js'
import platform from './utils/platform.js'

// Define custom elements
customElements.define('strawbees-download', StrawbeesDownloadElement);
customElements.define('strawbees-download-link', StrawbeesDownloadItemElement);

// Define API endpoints
const CODE_BASE_URL = 'https://s3.amazonaws.com/strawbees-downloads-production/code-desktop'
const WIN32 = 'win32'
const DARWIN = 'darwin'
const IA32 = 'ia32'
const X64 = 'x64'

// Current platform
const currentPlatform = platform().node

// Load json from url
const loadJson = function(url) {
	return fetch(url)
		.then(r => r.json())
		.catch(err => {
			console.log(err)
			return false
		})
}

// Get download base path based on platform and architecture
const getDownloadPath = function(platform, arch) {
	return `${CODE_BASE_URL}/${platform}/${arch}`
}

window.onload = function() {
	let appEl = document.querySelector('#app')
	appEl.style.display = 'flex';
	// Select CODE download link elements
	let codeWin32ia32 = document.querySelector('strawbees-download-link[platform=win32][arch=ia32]')
	let codeWin32x64 = document.querySelector('strawbees-download-link[platform=win32][arch=x64]')
	let codeDarwinx64 = document.querySelector('strawbees-download-link[platform=darwin][arch=x64]')
	// Config file for CODE
	const code_config = [
		{ el:codeWin32ia32, platform: WIN32, arch: IA32 },
		{ el: codeWin32x64, platform: WIN32, arch: X64 },
		{ el: codeDarwinx64, platform: DARWIN, arch: X64 }
	]
	// Create and array of base download paths for CODE
	const downloadPaths = code_config.map((conf) => {
		return getDownloadPath(conf.platform, conf.arch)
	})
	// Array of promises for the `latest.json`
	const manifestPromises = downloadPaths.map((url) => {
		return loadJson(`${url}/latest.json`)
	})
	// Resolve all the `latest.json` promises
	Promise.all(manifestPromises)
	.then((results, i) => {
		// Iterate over results and render download links accordingly
		results.forEach((latest, i) => {
			// Config item
			let conf = code_config[i]
			// If there is no manifest, it's unavailable
			if (!latest) {
				conf.el.setAttribute('unavailable', 'true')
				return
			}
			if (
				currentPlatform.platform == conf.platform &&
				currentPlatform.arch == conf.arch
			) {
				conf.el.setAttribute('selected', 'selected')
			}
			conf.el.setAttribute('link', `${downloadPaths[i]}/${latest.installer.path}`)
			conf.el.setAttribute('version', latest.version)
		})
	})
}
