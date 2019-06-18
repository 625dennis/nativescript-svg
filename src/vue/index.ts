import { SVGImage } from '../svg'

export default {
	install(Vue, options) {
		console.log('installing SVGImage')
		Vue.registerElement(
			'SVGImage',
			() => SVGImage
		)
	}
}
