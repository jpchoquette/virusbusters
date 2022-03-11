export default {
  data () {
    return {
      cursorElement: null,
      cursorClick: false,
      canvas: null,
      context: null,
      type: null,
      hasWrapperEl: true,
      width: 0,
      height: 0,
      cursor: {
        x: 0,
        y: 0
      },
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
      randomColors: false,
      randomChars: false,
      counter: 0,
      counter2: 0,
      gravity: 1,
      fontStyle: '40px Daydream',
      fade: true,
      nDots: 7,
      image: null,
      images: null,
      emoji: '🤪',
      DELTAT: 0.01,
      SEGLEN: 10,
      SPRINGK: 10,
      MASS: 1,
      GRAVITY: 1,
      RESISTANCE: 10,
      STOPVEL: 0.1,
      STOPACC: 0.5,
      DOTSIZE: 11,
      BOUNCE: 0.1,
      emojiAsImage: null,
      imgAsImage: null,
      draw: null,
      position: null,
      x: 0,
      y: 0,
      particleType: 'emoji',
      spin: false,
      points: [],
      MIN_DIST: 1,
      MAX_POINTS: 10,
      dist: (x1, y1, x2, y2) => Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)),
      shiftValue: 30,
      drawEffects: true,
      hideTrailOnClick: false,
      customCursorOnClick: false
    }
  },
  methods: {
    setCursor (options, type) {
      if (this.type) {
        // console.log('on clear le cursor')
        this.clearCursor()
      }
      if (type !== 'base') {
        this.type = type
        // this.hasWrapperEl = options && options.element
        // this.cursorElement = this.hasWrapperEl || document.body
        this.cursorElement = document.getElementById('screenContent')
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.cursor = { x: this.width / 2, y: this.width / 2 }
        this.lastPos = { x: this.width / 2, y: this.width / 2 }
        if (options && options.customCursorOnClick) {
          this.customCursorOnClick = options.customCursorOnClick
        }
        if (!document.getElementById('cursorCanvas')) {
          if (this.type === 'dust') {
            this.dustCursor(options)
          } else if (this.type === 'ghost') {
            this.ghostCursor(options)
          } else if (this.type === 'spring') {
            this.springCursor(options)
          } else if (this.type === 'string') {
            this.stringCursor(options)
          }
        }
      }
    },
    dustCursor (options) {
      this.randomColors = options.randomColors
      this.randomChars = options.randomChars
      if (options.particleType) {
        this.particleType = options.particleType
      }
      if (options.spin) {
        this.spin = options.spin
      }
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
      if (options.gravity) {
        this.gravity = options.gravity
      }
      if (options.images) {
        this.images = options.images
      }
      setTimeout(() => {
        this.init(this.type)
      }, 1000)
    },
    ghostCursor (options) {
      if (options.decay) {
        this.decay = options.decay
      }
      this.baseImage.src =
        (options && options.image) ? options.image : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASNJREFUWIW9l10OgyAMxwfZYeYd5uM8tD7qHfQ27mWQiqX0izUxMWLpjz8FSnhU7PN6n7W25dhCrU1qt46owD1gLs5Y8Hlf8/s0jO4gVQAYGDMMRgORHSTBKRAphBnAChLLD5rgmB83maPk5x4QNwX+DXEB0MpvgXBXQAoRveafA4ECWAJQOyPXMoBm/ud9NUM8Td4/SxDUuVHbmELKAUqBaRib7ZRRu2K3VcAJLgKgRlmqsxxbSE+r3y4KSJZ2BuBks0QF9mEEZbIuKQ1EwH5slWGe1RIKwDENBAbSLEqhI6WUBARCxFoD9l1TdGKQcCDiDjUqJINqpMGoanlPCNVGVE6FZfmarlWtm1Rp2AlpvmRqKypTDlgh4BS6XbO5EGX+fAFinL3TpLmq4gAAAABJRU5ErkJggg=='
        // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg=="
      setTimeout(() => {
        this.init(this.type)
      }, 1000)
    },
    springCursor (options) {
      if (options.particleType) {
        this.particleType = options.particleType
      }
      if (options.emoji) {
        this.emoji = options.emoji
      }
      if (options.image) {
        this.image = options.image
      }
      if (options.images) {
        this.images = options.images
      }
      if (options.qty) {
        this.nDots = options.qty + 1
      }
      if (options.resistance) {
        this.RESISTANCE = options.resistance
      }
      if (options.gravity) {
        this.GRAVITY = options.gravity
      }
      if (options.hideTrailOnClick) {
        this.hideTrailOnClick = options.hideTrailOnClick
      }
      setTimeout(() => {
        this.init(this.type)
      }, 1000)
    },
    stringCursor (options) {
      if (options.particleType) {
        this.particleType = options.particleType
      }
      if (options.emoji) {
        this.emoji = options.emoji
      }
      if (options.image) {
        this.image = options.image
      }
      if (options.images) {
        this.images = options.images
      }
      setTimeout(() => {
        this.init(this.type)
      }, 1000)
    },
    init () {
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
      // DUST ----------------------------------------
      if (this.type === 'dust') {
        this.context.font = this.fontStyle
        this.context.textBaseline = 'middle'
        this.context.textAlign = 'center'
        // const image = new Image()
        if (this.particleType === 'image') {
          this.images.forEach((char, index) => {
            const image = new Image()
            const bgCanvas = document.createElement('canvas')
            const bgContext = bgCanvas.getContext('2d')
            image.src = this.images[index]
            bgCanvas.width = image.width
            bgCanvas.height = image.height
            bgContext.drawImage(
              image,
              0, 0,
              image.width, image.height,
              0, 0,
              bgCanvas.width, bgCanvas.height
            )
            // this.imgAsImage = bgCanvas
            this.canvImages.push(bgCanvas)
            // console.log('index images', index)
          })
        } else {
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
            const measurements = this.context.measureText(char)
            const bgCanvas = document.createElement('canvas')
            const bgContext = bgCanvas.getContext('2d')

            bgCanvas.setAttribute('id', 'bgCanvas')
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
          })
        }
      // SPRING ----------------------------------------
      } else if (this.type === 'spring') {
        for (let i = 0; i < this.nDots; i++) {
          const bgCanvas = document.createElement('canvas')
          const bgContext = bgCanvas.getContext('2d')
          const image = new Image()
          if (this.particleType === 'image') {
            image.src = this.images[i % this.images.length]
            bgCanvas.width = image.width
            bgCanvas.height = image.height
            bgContext.drawImage(
              image,
              0, 0,
              image.width, image.height,
              0, 0,
              bgCanvas.width, bgCanvas.height
            )
            this.imgAsImage = bgCanvas
          } else {
            const measurements = this.context.measureText(this.emoji)
            bgCanvas.width = measurements.width
            bgCanvas.height = measurements.actualBoundingBoxAscent * 2
            bgContext.textAlign = 'center'
            bgContext.font = '16px serif'
            bgContext.textBaseline = 'middle'
            bgContext.fillText(
              this.emoji,
              bgCanvas.width / 2,
              measurements.actualBoundingBoxAscent
            )
            this.emojiAsImage = bgCanvas
          }
          // this.addParticle(this.cursor.x, this.cursor.y, this.emojiAsImage)
          this.particles[i] = new this.SpringParticle(this.cursor.x, this.cursor.y, this.particleType === 'image' ? this.imgAsImage : this.emojiAsImage, i)
        }
      // GHOST ----------------------------------------
      } else if (this.type === 'ghost') {
        // todo
      } else if (this.type === 'string') {
        // todo
      }
      this.$nextTick(() => {
        this.bindEvents()
        this.loop()
      })
    },
    // Bind events that are needed
    bindEvents () {
      this.cursorElement.addEventListener('mousemove', this.onMouseMove)
      this.cursorElement.addEventListener('mousedown', this.onMouseDown)
      this.cursorElement.addEventListener('mouseup', this.onMouseUp)
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
        if (this.type === 'dust') {
          const distBetweenPoints = Math.hypot(
            (this.cursor.x - this.lastPos.x),
            (this.cursor.y - this.lastPos.y)
          )

          if (distBetweenPoints > this.distance) {
            if (this.particleType && this.particleType === 'image') {
              this.addParticle(
                this.cursor.x + 30,
                this.cursor.y + 30,
                this.canvImages[this.indexCounter(this.images.length)]
              )
              if (this.randomChars && this.counter2 >= (this.images.length - 1)) {
                this.shuffleArray(this.canvImages)
              }
            } else {
              this.addParticle(
                this.cursor.x + 30,
                this.cursor.y + 30,
                this.canvImages[this.indexCounter(this.charList.length)]
              )
              if (this.randomChars && this.counter2 >= (this.charList.length - 1)) {
                this.shuffleArray(this.canvImages)
              }
            }
            this.lastPos.x = this.cursor.x
            this.lastPos.y = this.cursor.y
          }
        } else if (this.type === 'ghost') {
          this.addParticle(this.cursor.x, this.cursor.y, this.baseImage)
        } else if (this.type === 'string') {
          const polyline = document.getElementById('cursorCanvas')
          if (!this.cursor.x || !this.cursor.y) return
          if (!this.points.length) return this.points.push([this.cursor.x, this.cursor.y])
          const [px, py] = this.points[this.points.length - 1]
          const d = this.dist(this.cursor.x, this.cursor.y, px, py)
          if (d < this.MIN_DIST) return
          this.points.push([this.lastPos.x, this.lastPos.y])
          const pathString = this.points.reduce((acc, [x, y]) => {
            return acc + ` ${this.cursor.x},${this.cursor.y}`
          }, '')
          polyline.setAttribute('points', pathString)
          if (this.points.length > this.MAX_POINTS) this.points.shift()
        }
      })
    },
    onMouseDown (e) {
      window.requestAnimationFrame(() => {
        if (this.customCursorOnClick) {
          this.cursorClick = true
        }
        if (this.type === 'spring') {
          if (this.hideTrailOnClick) {
            this.shiftValue = 0
            this.GRAVITY = 0
            this.drawEffects = false
          }
        } else if (this.type === 'ghost') {
          //
        } else if (this.type === 'string') {
          //
        }
      })
    },
    onMouseUp (e) {
      window.requestAnimationFrame(() => {
        if (this.customCursorOnClick) {
          this.cursorClick = false
        }
        if (this.type === 'spring') {
          if (this.hideTrailOnClick) {
            this.drawEffects = true
            this.shiftValue = 50
            this.GRAVITY = 1
          }
        } else if (this.type === 'ghost') {
          //
        } else if (this.type === 'string') {
          //
        }
      })
    },
    indexCounter (qty, random, repeat, delay) {
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
        this.particles.push(new this.DustParticle(x, y, elem, this.spin))
      } else if (this.type === 'ghost') {
        this.particles.push(new this.GhostParticle(x, y, elem, this.decay))
      } else if (this.type === 'spring') {
        // this.particles.push(new this.SpringParticle(x, y, elem))
      }
    },
    updateParticles () {
      // console.log('on update')
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
    updateParticlesSpring () {
      this.context.clearRect(0, 0, this.width, this.height)
      this.canvas.width = this.width
      // follow mouse (this.shiftValue to shift position)
      if (this.particles && this.particles.length) {
        this.particles[0].position.x = this.cursor.x + this.shiftValue
        this.particles[0].position.y = this.cursor.y + this.shiftValue
        // Start from 2nd dot
        for (let i = 1; i < this.nDots; i++) {
          const spring = { x: 0, y: 0 }

          if (i > 0) {
            this.springForce(i - 1, i, spring)
          }

          if (i < this.nDots - 1) {
            this.springForce(i + 1, i, spring)
          }
          const resist = {
            x: -this.particles[i].velocity.x * this.RESISTANCE,
            y: -this.particles[i].velocity.y * this.RESISTANCE
          }
          const accel = {
            x: (spring.x + resist.x) / this.MASS,
            y: (spring.y + resist.y) / this.MASS + this.GRAVITY
          }
          this.particles[i].velocity.x += this.DELTAT * accel.x
          this.particles[i].velocity.y += this.DELTAT * accel.y

          if (
            Math.abs(this.particles[i].velocity.x) < this.STOPVEL &&
            Math.abs(this.particles[i].velocity.y) < this.STOPVEL &&
            Math.abs(accel.x) < this.STOPACC &&
            Math.abs(accel.y) < this.STOPACC
          ) {
            this.particles[i].velocity.x = 0
            this.particles[i].velocity.y = 0
          }

          this.particles[i].position.x += this.particles[i].velocity.x
          this.particles[i].position.y += this.particles[i].velocity.y

          const height = this.canvas.clientHeight
          const width = this.canvas.clientWidth

          if (this.particles[i].position.y >= height - this.DOTSIZE - 1) {
            if (this.particles[i].velocity.y > 0) {
              this.particles[i].velocity.y = this.BOUNCE * -this.particles[i].velocity.y
            }
            this.particles[i].position.y = height - this.DOTSIZE - 1
          }

          if (this.particles[i].position.x >= width - this.DOTSIZE) {
            if (this.particles[i].velocity.x > 0) {
              this.particles[i].velocity.x = this.BOUNCE * -this.particles[i].velocity.x
            }
            this.particles[i].position.x = width - this.DOTSIZE - 1
          }

          if (this.particles[i].position.x < 0) {
            if (this.particles[i].velocity.x < 0) {
              this.particles[i].velocity.x = this.BOUNCE * -this.particles[i].velocity.x
            }
            this.particles[i].position.x = 0
          }
          if (this.drawEffects) {
            this.particles[i].draw(this.context)
          }
        }
      }
    },
    loop () {
      if (this.type === 'spring') {
        this.updateParticlesSpring()
      } else {
        this.updateParticles()
      }
      requestAnimationFrame(this.loop)
    },
    vec (x, y) {
      this.x = x
      this.y = y
    },
    springForce (i, j, spring) {
      const dx = this.particles[i].position.x - this.particles[j].position.x
      const dy = this.particles[i].position.y - this.particles[j].position.y
      const len = Math.sqrt(dx * dx + dy * dy)
      if (len > this.SEGLEN) {
        const springF = this.SPRINGK * (len - this.SEGLEN)
        spring.x += (dx / len) * springF
        spring.y += (dy / len) * springF
      }
    },

    /**
     * Particles
     */
    DustParticle (x, y, canvasItem, spin) {
      const lifeSpan = Math.floor(Math.random() * 60 + 60)
      const randomFactor = Math.random(0, 9) / 10
      const randomDirection = Math.round(Math.random()) * 2 - 1
      this.initialLifeSpan = lifeSpan //
      this.lifeSpan = lifeSpan // ms
      this.rot = Math.random() * 0.15 * Math.PI
      this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: Math.random() * 0.7 + 0.9
      }
      // console.log('velocity', this.velocity)
      this.position = { x: x, y: y }
      this.canv = canvasItem
      // var ctx = this.canv.getContext('2d')
      // ctx.rotate(80)
      // console.log('this.canv', this.canv)
      this.update = function (context) {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.lifeSpan--
        if (randomDirection >= 0) {
          this.rot += randomFactor
        } else {
          this.rot -= randomFactor
        }

        this.velocity.y += 0.1
        const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0)
        // context.rotate(10)
        // console.log('hello', thus.spin)
        if (spin) {
          context.save()
          context.translate(this.position.x, this.position.y) // sets scales and origin
          context.rotate(this.rot)
          context.drawImage(
            this.canv, -this.canv.width / 2, -this.canv.height / 2, this.canv.width, this.canv.height
          )
          context.restore()
          // context.clearRect(0, 0, this.canv.width, this.canv.height)
        } else {
          context.drawImage(
            this.canv,
            this.position.x - (this.canv.width / 2) * scale,
            this.position.y - this.canv.height / 2,
            this.canv.width * scale,
            this.canv.height * scale
          )
        }

        // context.rotate(10)
        // console.log('context', context)
      }
    },
    GhostParticle (x, y, canvasItem, decay) {
      const lifeSpan = decay
      this.initialLifeSpan = lifeSpan // ms
      this.lifeSpan = lifeSpan // ms
      // Random ghost scattering
      // const randomA = Math.floor(Math.random() * 100)
      // const randomB = Math.floor(Math.random() * 100)
      this.position = { x: x, y: y }
      this.image = canvasItem
      this.update = function (context) {
        this.lifeSpan--
        if (this.fade) {
          const opacity = Math.max(this.lifeSpan / this.initialLifeSpan, 0)
          context.globalAlpha = opacity
        } else {
          context.globalAlpha = 1
        }
        context.drawImage(
          this.image,
          this.position.x, // - (this.canv.width / 2) * scale,
          this.position.y // - this.canv.height / 2,
        )
      }
    },
    SpringParticle (x, y, canvasItem, index) {
      this.position = { x: x, y: y }
      this.velocity = {
        x: 0,
        y: 0
      }
      this.canv = canvasItem
      this.draw = function (context) {
        context.drawImage(
          this.canv,
          this.position.x - this.canv.width / 2,
          this.position.y - this.canv.height / 2,
          this.canv.width,
          this.canv.height
        )
      }
    },
    clearCursor () {
      this.cursorElement.removeEventListener('mousemove', this.onMouseMove)
      this.cursorElement.removeEventListener('mousemove', this.onMouseDown)
      this.cursorElement.removeEventListener('mousemove', this.onMouseUp)
      this.cursorElement.removeEventListener('touchmove', this.onTouchMove)
      this.cursorElement.removeEventListener('touchstart', this.onTouchMove)
      window.removeEventListener('resize', this.onWindowResize)
      const canvasToRemove = document.getElementById('cursorCanvas')
      if (canvasToRemove) {
        canvasToRemove.remove()
      }
      this.type = null
      // this.context = null
      this.particles = []
      this.baseImage = new Image()
      this.canvImages = []
      this.dustColors = [
        '#D61C59',
        '#E7D84B',
        '#1B8798'
      ]
      this.charList = ['!', '%', '$', '&', '?', '*']
      this.char = '.'
      this.distance = 100
      this.decay = 10
      this.randomColors = false
      this.randomChars = false
      this.counter = 0
      this.counter2 = 0
      this.gravity = 1
      this.fontStyle = '40px Daydream'
      this.fade = true
      this.particleType = null
      this.spin = false
      this.nDots = 7
      this.RESISTANCE = 1
      this.GRAVITY = 10
      this.hideTrailOnClick = false
    }
  }
}
