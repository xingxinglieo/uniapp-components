const props = {
	lowerThreshold: {
		type: [Number, String],
		default: 50
	},
	upperThreshold: {
		type: [Number, String],
		default: 50
	},
	scrollTop: [Number, String],
	scrollIntoView: String,
	scrollWithAnimation: {
		type: Boolean,
		default: false
	},
	enableBackToTop: {
		type: Boolean,
		default: false
	},
	refresherEnabled: {
		type: Boolean,
		default: false
	},
	refresherThreshold: {
		type: Number,
		default: 45
	},
	refresherDefaultStyle: {
		type: String,
		default: 'black'
	},
	refresherBackground: {
		type: String,
		default: '#FFF'
	},
	refresherTriggered: {
		type: Boolean,
		default: false
	},
	enableFlex: {
		type: Boolean,
		default: false
	},
	scrollAnchoring: {
		type: Boolean,
		default: false
	}
}
const events = ['scrolltoupper', 'scrolltolower', 'click', 'refresherpulling', 'refresherrefresh', 'refresherrestore',
	'refresherabort'
].reduce((obj, name) => {
	obj[name] = function(ev) {
		this.$emit(name, ev)
	}
	return obj
}, {})
export default {
	props,
	methods: events
}
