export default class WheelOfFortune {
	constructor(element, labels, prefix) {
		this.animationSpins = 5
		this.animationTime = 3000
		this.element = element
		this.labels = labels
        this.prefix = prefix
		this.container = create('div', 'wof-wheel__container')
		this.element.appendChild(this.container)
		this.degreeses = 360 / labels.length
		this.current = 0
		this.isLock = false

		this.labels.forEach(this.createSegment)
		this.labels.forEach(this.createLabel)
		this.element.appendChild(create('div', 'wof-wheel__arrow'))
	}

	createSegment = (label, index) => {
		const segment = create('div', 'wof-wheel__segment')
		const skew = this.degreeses - 90

		segment.style.transform = `rotate(${this.degreeses * index + skew - this.degreeses / 2}deg) skewX(${skew}deg)`

		this.container.appendChild(segment)
	}

	createLabel = (label, index) => {
		const labelNode = create('div', 'wof-wheel__label')
		const labelText = create('div', 'wof-wheel__label-text')

		labelText.appendChild(document.createTextNode(label + this.prefix))
		labelNode.appendChild(labelText)
		labelNode.style.transform = `rotate(${this.degreeses * index}deg)`

		this.container.appendChild(labelNode)
	}

	spin = (segment) => {
		if (this.isLock) return

		this.isLock = true

        const index = this.labels.indexOf(segment)
        if (index === -1) index = 0

		const segmentDegreeses = this.degreeses * index - this.degreeses / 2
		const randomDegreeses = (this.degreeses - 6) * Math.random() + 3
		const animationRotate = 360 * this.animationSpins
		const rotate = -segmentDegreeses - randomDegreeses - animationRotate

		startAnimation(this.animationTime, (progress) => {
			this.container.style.transform = `rotate(${this.current + (rotate - this.current) * easeInOut(progress)}deg)`
		}, () => {
			this.current = rotate % 360
			this.isLock = false
		})
	}
}

function startAnimation(duration, callback, finish) {
	let startAnimationTime = null

	requestAnimationFrame(function measure(time) {
		if (!startAnimationTime) {
			startAnimationTime = time
		}

		const progress = (time - startAnimationTime) / duration

		callback(progress)

		if (progress < 1) {
			requestAnimationFrame(measure)
		} else {
			callback(1)
			finish()
		}
	})
}

function easeInOut(time) {
	return 0.5 * (1 - Math.cos(Math.PI * time))
}

function create(type, className) {
	const element = document.createElement(type)

	element.className = className

	return element
}