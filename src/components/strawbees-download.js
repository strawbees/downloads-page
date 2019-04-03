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
					display: flex;
					flex-direction: row;
					max-width: 35rem;
					margin-bottom: 1rem;
				}
				.header .icon {
					width: 20%;
				}
				.header .text {
					width: 80%;
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
					.header {
						justify-content: center;
						align-items: center;
						flex-direction: column;
					}
				}
			</style>
			<div id="strawbees-download">
				<div class="header">
					<div class="icon">
						<slot name="icon"></slot>
					</div>
					<div class="text">
						<h1><slot name="title"></slot></h1>
						<p><slot name="description"></slot></p>
					</div>
				</div>
				<div class="download-links">
					<slot name="links"></slot>
				</div>
			</div>
		`
	}
}

export default StrawbeesDownloadElement
