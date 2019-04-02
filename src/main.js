import StrawbeesDownloadElement from './components/strawbees-download.js'
import StrawbeesDownloadItemElement from './components/strawbees-download-link.js'

// Define custom elements
customElements.define('strawbees-download', StrawbeesDownloadElement);
customElements.define('strawbees-download-link', StrawbeesDownloadItemElement);

// Define API endpoints
const CODE_BASE_URL = 'https://s3.amazonaws.com/strawbees-downloads-production/code-nwjs-build/versions'
const WIN32 = 'win32'
const DARWIN = 'darwin'
const IA32 = 'ia32'
const X64 = 'x64'

// Load json from url
const loadJson = function(url) {
	return fetch(url)
		.then(r => r.json())
}

// Get download base path based on platform and architecture
const getDownloadPath = function(platform, arch) {
	return `${CODE_BASE_URL}/${platform}/${arch}`
}

window.onload = function() {
	let appEl = document.querySelector('#app')
	appEl.style.display = 'flex';
	// Select download link elements
	let linkWin32ia32 = document.querySelector('strawbees-download-link[platform=win32][arch=ia32]')
	let linkWin32x64 = document.querySelector('strawbees-download-link[platform=win32][arch=x64]')
	let linkDarwinx64 = document.querySelector('strawbees-download-link[platform=darwin][arch=x64]')
	const downloadPaths = {
		win32_ia32: getDownloadPath(WIN32, IA32),
		win32_x64: getDownloadPath(WIN32, X64),
		darwin_x64: getDownloadPath(DARWIN, X64)
	}
	Promise.all([
		loadJson(`${downloadPaths.win32_ia32}/latest.json`),
		loadJson(`${downloadPaths.win32_x64}/latest.json`),
		loadJson(`${downloadPaths.darwin_x64}/latest.json`)
	]).then((results) => {
		if (linkWin32ia32) {
			linkWin32ia32.setAttribute('version', results[0].version)
			linkWin32ia32.setAttribute('link', `${downloadPaths.win32_ia32}/${results[0].installer.path}`)
		}
		if (linkWin32x64) {
			linkWin32x64.setAttribute('version', results[0].version)
			linkWin32x64.setAttribute('link', `${downloadPaths.win32_x64}/${results[1].installer.path}`)
		}
		if (linkDarwinx64) {
			linkDarwinx64.setAttribute('version', results[0].version)
			linkDarwinx64.setAttribute('link', `${downloadPaths.darwin_x64}/${results[2].installer.path}`)
		}

	})
}
