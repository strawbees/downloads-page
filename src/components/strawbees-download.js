import BaseElement from './base-element.js'

class StrawbeesDownloadElement extends BaseElement {
	static get observedAttributes() {
		return ['items'];
	}
	template() {
		return `
			<style>
				:host {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				h1, p {
					margin: 0
				}
				.header {
					max-width: 25rem;
					margin-bottom: 1rem;
				}
				.download-links {
					display: flex;
					background: white;
					border-radius: 1rem;
					padding: 1rem;
				}
				.download-links slot {
					display: flex;
					flex-direction: row;
					width: 100%;
					justify-content: space-around;
				}
			</style>
			<div class="header">
				<h1><slot name="title" class="test"></slot></h1>
				<p><slot name="description"></slot></p>
			</div>
			<div class="download-links">
				<slot name="links"></slot>
			</div>
		`
	}
	// connectedCallback() {
	// 	if (!this.items) {
	// 		this.items = []
	// 	}
	// 	this.render();
	// 	this.renderDownloadLinks();
	// }
	// renderDownloadLinks() {
	// 	let downloadLinks = this.shadowRoot.querySelector('.download-links')
	// 	this.items.forEach((el) => downloadLinks.appendChild(el))
	// }
}

export default StrawbeesDownloadElement
