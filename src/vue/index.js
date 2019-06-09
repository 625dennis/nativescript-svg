import { SVGImage } from '../svg'

export default {
	install(Vue, options) {
		Vue.registerElement(
			'SVGImage',
			() => SVGImage
		)
	}
}