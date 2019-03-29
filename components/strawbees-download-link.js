import BaseElement from './base-element.js'

class StrawbeesDownloadItemElement extends BaseElement {
	static get observedAttributes() {
		return ['platform', 'arch', 'version', 'link'];
	}
	template() {
		return `
			<style>
				:host {
					display: flex;
					flex-direction: column;
					align-items: center;
					border-radius: 0.5rem;
					margin: 0.5rem;
					padding: 0.5em;
					border: solid 0.05rem rgb(217, 217, 217);
					color: rgb(153,153,153);
				}
				.icon {
					width: 3rem;
					height: 3rem;
				}
				.icon svg {
					max-width: 100%;
					max-height: 100%;
					fill: rgb(153, 153, 153);
				}
			</style>
			<div class="icon">${this.icon()}</div>
			<div>${this.label()}</div>
			<div>${this.architecture()}</div>
			<div>${this.downloadButton()}</div>

		`
	}
	icon() {
		switch(this.get('platform')) {
			case 'win32':
				return `<svg width="170" height="170" viewBox="-2.62 -2.62 92.565 92.834" class="jsx-2603594282"><path d="M0 12.402l35.687-4.86.016 34.422-35.67.203zM35.67 45.93l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.315 0v41.527l-47.319.376zm47.33 39.349l-.011 41.34-47.319-6.679-.066-34.738z"></path></svg>`
				break
			case 'darwin':
			return `<svg width="170" height="170" viewBox="0 0 170 170" class="jsx-2603594282"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375a25.222 25.222 0 0 1-.188-3.07c0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71.12 1.083.17 2.166.17 3.24z"></path></svg>`
				break
		}
	}
	label() {
		switch(this.get('platform')) {
			case 'win32':
				return `Windows 7 and above`
				break
			case 'darwin':
				return `Mac OS`
				break
		}
	}
	architecture() {
		switch(this.get('arch')) {
			case 'ia32':
				return `32 bits`
				break
			case 'x64':
				return `64 bits`
				break
		}
	}
	version() {
		return this.get('version')
	}
	link() {
		return this.get('link')
	}
	loading() {
		return 'loading...'
	}
	downloadButton() {
		if (!this.link()) {
			return this.loading()
		} else {
			return `<a href="${this.link()}" target="_blank">Download v${this.version()}</a>`
		}
	}
	attributeChangedCallback(attrName, oldVal, newVal) {
		this.render()
	}

}

export default StrawbeesDownloadItemElement
