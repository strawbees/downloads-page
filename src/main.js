import './node_modules/@webcomponents/custom-elements/externs/custom-elements.js'
import StrawbeesDownloadElement from './components/strawbees-download.js'
import StrawbeesDownloadItemElement from './components/strawbees-download-link.js'

customElements.define('strawbees-download', StrawbeesDownloadElement);
customElements.define('strawbees-download-link', StrawbeesDownloadItemElement);

const BASE_URL = 'https://s3.amazonaws.com/strawbees-downloads-production/code-nwjs-build/versions'
const WIN32 = 'win32'
const DARWIN = 'darwin'
const IA32 = 'ia32'
const X64 = 'x64'

const loadJson = async function(url) {
	let res = await fetch(url)
	return await res.json()
}
const getDownloadPath = function(platform, arch) {
	return `${BASE_URL}/${platform}/${arch}`
}

window.onload = async function() {
	const code = {
		win32: {
			ia32: await loadJson(`${getDownloadPath(WIN32, IA32)}/latest.json`),
			x64: await loadJson(`${getDownloadPath(WIN32, X64)}/latest.json`),
		},
		darwin: {
			x64: await loadJson(`${getDownloadPath(DARWIN, X64)}/latest.json`)
		}
	}

	let code_win32_ia32 = document.querySelector('strawbees-download-link[platform=win32][arch=ia32]')
	let code_win32_x64 = document.querySelector('strawbees-download-link[platform=win32][arch=x64]')
	let code_darwin_x64 = document.querySelector('strawbees-download-link[platform=darwin][arch=x64]')

	if (code_win32_ia32) {
		code_win32_ia32.setAttribute('version', code.win32.ia32.version)
		code_win32_ia32.setAttribute('link', `${getDownloadPath()}/${code.win32.ia32.installer.path}`)
	}
	if (code_win32_x64) {
		code_win32_x64.setAttribute('version', code.win32.x64.version)
		code_win32_x64.setAttribute('link', `${getDownloadPath()}/${code.win32.x64.installer.path}`)
	}
	if (code_darwin_x64) {
		code_darwin_x64.setAttribute('version', code.darwin.x64.version)
		code_darwin_x64.setAttribute('link', `${getDownloadPath()}/${code.darwin.x64.installer.path}`)
	}

}
