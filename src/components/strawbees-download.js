import BaseElement from './base-element.js'

class StrawbeesDownloadElement extends BaseElement {
	static get observedAttributes() {
		return ['items'];
	}
	template() {
		return `
			<style>
				#strawbees-download {
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
				@media (max-width: 650px) {
					.download-links slot {
						flex-direction: column;
					}
				}
			</style>
			<div id="strawbees-download">
				<div class="header">
					<h1><slot name="title" class="test"></slot></h1>
					<p><slot name="description"></slot></p>
				</div>
				<div class="download-links">
					<slot name="links"></slot>
				</div>
			</div>
		`
	}
}

export default StrawbeesDownloadElement
