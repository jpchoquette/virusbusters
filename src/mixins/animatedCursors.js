export default {
  data () {
    return {
      cursorElement: null,
      canvas: null,
      context: null,
      type: 'dust',
      hasWrapperEl: null,
      width: 0,
      height: 0,
      cursor: null,
      lastPos: null,
      particles: [],
      baseImage: new Image(),
      canvImages: [],
      dustColors: [
        '#D61C59',
        '#E7D84B',
        '#1B8798'
      ],
      charList: [
        '!', '%', '$', '&', '?', '*'
      ],
      char: '!',
      distance: 100,
      decay: 10,
      random: false,
      randomColors: false,
      randomChars: false,
      counter: 0,
      counter2: 0,
      velocity: 1,
      fontStyle: '50px Daydream'
    }
  },
  methods: {
    setCursor (options, type) {
      this.type = type
      this.hasWrapperEl = options && options.element
      this.cursorElement = this.hasWrapperEl || document.body
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.cursor = { x: this.width / 2, y: this.width / 2 }
      this.lastPos = { x: this.width / 2, y: this.width / 2 }
      if (!document.getElementById('cursorCanvas')) {
        if (this.type === 'dust') {
          this.dustCursor(options)
        } else if (this.type === 'ghost') {
          this.ghostCursor(options)
        } else {
          // todo
        }
      }
    },
    dustCursor (options) {
      this.randomColors = options.randomColors
      this.randomChars = options.randomChars
      if (options.colors) {
        this.dustColors = options.colors
      }
      if (options.chars) {
        this.charList = options.chars
      }
      if (options.fontStyle) {
        this.fontStyle = options.fontStyle
      }
      if (options.distance) {
        this.distance = options.distance
      }
      // console.log('this.charList', this.dustColors, this.charList, options)
      this.init(this.type)
    },
    ghostCursor (options) {
      console.log('ghost options', options)
      if (options.decay) {
        this.decay = options.decay
      }
      this.baseImage.src =
        (options && options.image) ? options.image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASNJREFUWIW9l10OgyAMxwfZYeYd5uM8tD7qHfQ27mWQiqX0izUxMWLpjz8FSnhU7PN6n7W25dhCrU1qt46owD1gLs5Y8Hlf8/s0jO4gVQAYGDMMRgORHSTBKRAphBnAChLLD5rgmB83maPk5x4QNwX+DXEB0MpvgXBXQAoRveafA4ECWAJQOyPXMoBm/ud9NUM8Td4/SxDUuVHbmELKAUqBaRib7ZRRu2K3VcAJLgKgRlmqsxxbSE+r3y4KSJZ2BuBks0QF9mEEZbIuKQ1EwH5slWGe1RIKwDENBAbSLEqhI6WUBARCxFoD9l1TdGKQcCDiDjUqJINqpMGoanlPCNVGVE6FZfmarlWtm1Rp2AlpvmRqKypTDlgh4BS6XbO5EGX+fAFinL3TpLmq4gAAAABJRU5ErkJggg=='
        // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg=="
      this.init()
    },
    init () {
      // console.log('on init le curseur', this.type)
      this.canvas = document.createElement('canvas')
      this.canvas.setAttribute('id', 'cursorCanvas')
      this.context = this.canvas.getContext('2d')
      this.canvas.style.top = '0px'
      this.canvas.style.left = '0px'
      this.canvas.style.pointerEvents = 'none'
      this.canvas.style.zIndex = '999999'
      if (this.hasWrapperEl) {
        this.canvas.style.position = 'absolute'
        this.cursorElement.appendChild(this.canvas)
        this.canvas.width = this.cursorElement.clientWidth
        this.canvas.height = this.cursorElement.clientHeight
      } else {
        this.canvas.style.position = 'fixed'
        this.cursorElement.appendChild(this.canvas)
        this.canvas.width = this.width
        this.canvas.height = this.height
      }
      if (this.type === 'dust') {
        this.context.font = this.fontStyle
        this.context.textBaseline = 'middle'
        this.context.textAlign = 'center'

        // ---------------------------------------------
        // on check les chars
        this.charList.forEach((char) => {
          if (this.randomColors) {
            this.counter = Math.floor(Math.random() * this.dustColors.length)
          } else if (this.counter < (this.dustColors.length - 1)) {
            this.counter++
          } else {
            this.counter = 0
          }
          // console.log('counter', this.counter)
          const measurements = this.context.measureText(char)
          const bgCanvas = document.createElement('canvas')
          const bgContext = bgCanvas.getContext('2d')

          bgCanvas.width = measurements.width
          bgCanvas.height =
            measurements.actualBoundingBoxAscent +
            measurements.actualBoundingBoxDescent

          bgContext.fillStyle = this.dustColors[this.counter]
          bgContext.textAlign = 'center'
          bgContext.font = this.fontStyle
          bgContext.textBaseline = 'middle'
          bgContext.fillText(
            char,
            bgCanvas.width / 2,
            measurements.actualBoundingBoxAscent
          )

          this.canvImages.push(bgCanvas)
          // console.log('on a poussé')
        })
        // else {
        //   this.dustColors.forEach((color) => {
        //     if (this.random) {
        //       this.counter = Math.floor(Math.random() * this.charList.length)
        //     } else if (this.counter < this.dustColors.length) {
        //       this.counter++
        //     } else {
        //       this.counter = 0
        //     }
        //     // let charIndex = Math.floor(Math.random() * this.charList.length)
        //     let measurements = this.context.measureText(this.charList[this.counter])
        //     let bgCanvas = document.createElement('canvas')
        //     let bgContext = bgCanvas.getContext('2d')
        //
        //     bgCanvas.width = measurements.width
        //     bgCanvas.height =
        //       measurements.actualBoundingBoxAscent +
        //       measurements.actualBoundingBoxDescent
        //
        //     bgContext.fillStyle = color
        //     bgContext.textAlign = 'center'
        //     bgContext.font = '50px Daydream'
        //     bgContext.textBaseline = 'middle'
        //     bgContext.fillText(
        //       this.charList[this.counter],
        //       bgCanvas.width / 2,
        //       measurements.actualBoundingBoxAscent
        //     )
        //
        //     this.canvImages.push(bgCanvas)
        //   })
        // }
      } else if (this.type === 'ghost') {
        // todo
      }

      this.bindEvents()
      this.loop()
    },
    // Bind events that are needed
    bindEvents () {
      this.cursorElement.addEventListener('mousemove', this.onMouseMove)
      this.cursorElement.addEventListener('touchmove', this.onTouchMove)
      this.cursorElement.addEventListener('touchstart', this.onTouchMove)
      window.addEventListener('resize', this.onWindowResize)
    },
    onWindowResize (e) {
      this.width = window.innerWidth
      this.height = window.innerHeight
      if (this.hasWrapperEl) {
        this.canvas.width = this.cursorElement.clientWidth
        this.canvas.height = this.cursorElement.clientHeight
      } else {
        this.canvas.width = this.width
        this.canvas.height = this.height
      }
    },
    onTouchMove (e) {
      if (e.touches.length > 0) {
        for (let i = 0; i < e.touches.length; i++) {
          this.addParticle(
            e.touches[i].clientX,
            e.touches[i].clientY,
            this.canvImages[Math.floor(Math.random() * this.canvImages.length)]
          )
        }
      }
    },
    onMouseMove (e) {
      window.requestAnimationFrame(() => {
        if (this.hasWrapperEl) {
          const boundingRect = this.cursorElement.getBoundingClientRect()
          this.cursor.x = e.clientX - boundingRect.left
          this.cursor.y = e.clientY - boundingRect.top
        } else {
          this.cursor.x = e.clientX
          this.cursor.y = e.clientY
        }
        // console.log('cursor', this.cursor)
        if (this.type === 'dust') {
          const distBetweenPoints = Math.hypot(
            (this.cursor.x - this.lastPos.x),
            (this.cursor.y - this.lastPos.y)
          )

          if (distBetweenPoints > this.distance) {
            this.addParticle(
              this.cursor.x + 30,
              this.cursor.y + 30,
              this.canvImages[this.indexCounter(this.charList.length)]
            )
            if (this.randomChars && this.counter2 >= (this.charList.length - 1)) {
              this.shuffleArray(this.canvImages)
            }
            // console.log('this.indexCounter(this.charList.length)', this.indexCounter(this.charList.length))
            this.lastPos.x = this.cursor.x
            this.lastPos.y = this.cursor.y
          }
        } else if (this.type === 'ghost') {
          this.addParticle(this.cursor.x, this.cursor.y, this.baseImage)
        }
      })
    },
    indexCounter (qty, random) {
      if (random) {
        this.counter2 = Math.floor(Math.random() * (qty - 1))
      } else if (this.counter2 < (qty - 1)) {
        this.counter2++
      } else {
        this.counter2 = 0
      }
      return this.counter2
    },
    shuffleArray (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
      this.canvImages = arr
    },
    addParticle (x, y, elem) {
      if (this.type === 'dust') {
        this.particles.push(new this.DustParticle(x, y, elem))
      } else if (this.type === 'ghost') {
        this.particles.push(new this.GhostParticle(x, y, elem, this.decay))
      }
    },
    updateParticles () {
      this.context.clearRect(0, 0, this.width, this.height)
      // Update
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update(this.context)
      }
      // Remove dead particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        if (this.particles[i].lifeSpan < 0) {
          this.particles.splice(i, 1)
        }
      }
    },

    loop () {
      this.updateParticles()
      requestAnimationFrame(this.loop)
    },

    /**
     * Particles
     */

    DustParticle (x, y, canvasItem) {
      // console.log('DUST', canvasItem)
      const lifeSpan = Math.floor(Math.random() * 30 + 60)
      this.initialLifeSpan = lifeSpan //
      this.lifeSpan = lifeSpan // ms
      this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: Math.random() * 0.7 + 0.9
      }
      this.position = { x: x, y: y }
      this.canv = canvasItem

      this.update = function (context) {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.lifeSpan--

        this.velocity.y += 0.02

        const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0)

        context.drawImage(
          this.canv,
          this.position.x - (this.canv.width / 2) * scale,
          this.position.y - this.canv.height / 2,
          this.canv.width * scale,
          this.canv.height * scale
        )
      }
    },
    GhostParticle (x, y, canvasItem, decay) {
      console.log('GHOST', decay)
      const lifeSpan = decay
      this.initialLifeSpan = lifeSpan // ms
      this.lifeSpan = lifeSpan // ms
      this.position = { x: x, y: y }
      // console.log('lifeSpan', this.lifeSpan, this.decay)
      this.image = canvasItem

      this.update = function (context) {
        this.lifeSpan--
        const opacity = Math.max(this.lifeSpan / this.initialLifeSpan, 0)

        context.globalAlpha = opacity
        context.drawImage(
          this.image,
          this.position.x, // - (this.canv.width / 2) * scale,
          this.position.y // - this.canv.height / 2,
        )
      }
    },
    clearCursor () {
      console.log('on va supprimer le curseur', 'veolcity:', this.velocity, this.lifeSpan)
      this.cursorElement.removeEventListener('mousemove', this.onMouseMove)
      this.cursorElement.removeEventListener('touchmove', this.onTouchMove)
      this.cursorElement.removeEventListener('touchstart', this.onTouchMove)
      window.removeEventListener('resize', this.onWindowResize)
      const canvasToRemove = document.getElementById('cursorCanvas')
      canvasToRemove.remove()
      this.type = null
    }
  }
}
