import { debounce } from 'lodash'

export default {
  data () {
    return {
      animation: null,
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
      // baseImage: ,
      canvImages: [],
      canvWords: [],
      dustColors: [
        '#ff004d',
        '#7e2753',
        '#fcccac'
      ],
      charList: [
        '!', '%', '$', '&', '?', '*'
      ],
      fullWords: false,
      char: '!',
      distance: 100,
      decay: 10,
      randomColors: false,
      randomChars: false,
      counter: 0,
      counter2: 0,
      wordCounter: 0,
      fontStyle: '40px Daydream',
      fade: false,
      nDots: 7,
      image: null,
      images: null,
      emoji: '🤪',
      deltaT: 0.01,
      seglen: 10,
      springK: 10,
      mass: 1,
      gravity: 1,
      resistance: 10,
      stopVel: 0.1,
      stopAcc: 0.5,
      dotSize: 11,
      bounce: 0.1,
      emojiAsImage: null,
      imgAsImage: null,
      draw: null,
      position: null,
      x: 0,
      y: 0,
      particleType: 'emoji',
      spin: false,
      points: [],
      minDist: 1,
      maxPoints: 10,
      dist: (x1, y1, x2, y2) => Math.sqrt(Math.abs(x1 - x2) + Math.abs(y1 - y2)),
      shiftValue: 30,
      drawEffects: true,
      hideTrailOnClick: false,
      customCursorOnClick: false,
      activateOnClick: false,
      interval: null,
      endReached: false,
      stopAnim: false,
      projectiles: [],
      projectileHold: true,
      projectileDelay: 200,
      projectileTimeout: null,
      projectileType: 'text',
      projectileSpeed: 50,
      customCursorPosX: 0,
      customCursorPosY: 0,
      trail: [],
      trailSize: 10,
      trailColor: '#feffd9'
    }
  },
  methods: {
    setCursor (options, type) {
      this.stopAnim = true
      if (this.type) {
        this.clearCursor()
      }
      if (type !== 'base') {
        this.type = type
        this.cursorElement = document.getElementById('screenContent')
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.cursor = { x: this.width / 2, y: this.width / 2 }
        this.lastPos = { x: this.width / 2, y: this.width / 2 }
        if (!document.getElementById('cursorCanvas')) {
          this.updateCursor(options)
        }
      }
      if (type === 'base' && options && options.customCursorOnClick) {
        setTimeout(() => {
          this.customCursorOnClick = options.customCursorOnClick
          this.bindBaseEvents()
        }, 1000)
      }
    },
    updateCursor (options) {
      // console.log('on update cursor', options)
      Object.assign(this, options)
      setTimeout(() => {
        this.init(this.type)
        this.stopAnim = false
      }, 1000)
    },
    init () {
      this.canvas = document.createElement('canvas')
      this.canvas.setAttribute('id', 'cursorCanvas')
      this.context = this.canvas.getContext('2d')
      this.context.font = this.fontStyle
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
            this.canvImages.push(bgCanvas)
          })
        } else {
          // ---------------------------------------------
          // on check les chars
          this.charList.forEach((char, index) => {
            if (this.randomColors) {
              this.counter = Math.floor(Math.random() * this.dustColors.length)
            } else if (this.counter < (this.dustColors.length - 1)) {
              this.counter++
            } else {
              this.counter = 0
            }
            if (this.fullWords) {
              const canvWord = []
              for (let i = 0; i < char.length; i++) {
                const tempWord = {
                  name: 'test-' + i
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
                  char[i],
                  bgCanvas.width / 2,
                  measurements.actualBoundingBoxAscent
                )
                tempWord.canv = bgCanvas
                canvWord.push(tempWord)
              }
              this.canvWords.push(canvWord)
            } else {
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
            }
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
          this.particles[i] = new this.SpringParticle(this.cursor.x, this.cursor.y, this.particleType === 'image' ? this.imgAsImage : this.emojiAsImage, i)
        }
      } else if (this.type === 'projectile') {
        // todo
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
    // Base events for click effect on base cursors
    bindBaseEvents () {
      window.addEventListener('mousedown', this.onMouseDown)
      window.addEventListener('mouseup', this.onMouseUp)
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
      if (!this.activateOnClick && this.type !== 'projectile') {
        this.launchEffect(e)
      }
      if (this.type === 'trail') {
        this.addPoint({
          x: e.clientX,
          y: e.clientY
        })
      }
      if (this.fullWords) {
        this.indexCounterWord(this.charList.length)
      }
      this.customCursorPosX = e.clientX
      this.customCursorPosY = e.clientY
    },
    onMouseDown (e) {
      if (this.customCursorOnClick) {
        this.cursorClick = true
      }
      if (this.type === 'spring') {
        if (this.hideTrailOnClick) {
          this.shiftValue = 0
          this.gravity = 0
          this.drawEffects = false
        }
      } else if (this.type === 'ghost') {
        // todo
      } else if (this.type === 'string') {
        // todo
      }
      if (this.activateOnClick) {
        if (this.interval) {
          clearInterval(this.interval)
        }
        this.interval = setInterval(() => {
          this.launchEffect(e)
        }, 500)
      }
      if (this.type === 'projectile') {
        if (this.projectileHold) {
          this.generateProjectiles(e)
          if (this.projectileInterval) {
            clearInterval(this.projectileInterval)
          }
          this.projectileInterval = setInterval(() => {
            this.generateProjectiles(e)
          }, this.projectileDelay)
        } else {
          this.generateProjectiles(e)
        }
      }
    },
    onMouseUp (e) {
      if (this.customCursorOnClick) {
        this.cursorClick = false
      }
      if (this.type === 'spring') {
        if (this.hideTrailOnClick) {
          this.drawEffects = true
          this.shiftValue = 50
          this.gravity = 1
        }
      } else if (this.type === 'ghost') {
        //
      } else if (this.type === 'string') {
        //
      } else if (this.type === 'projectile') {
        if (this.projectileInterval) {
          clearInterval(this.projectileInterval)
        }
      }
      clearInterval(this.interval)
    },
    loop () {
      if (this.stopAnim) return
      if (this.type === 'trail') {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
        this.trail = this.trail.filter((tp) => Date.now() - tp.createdAt < 500)
        this.bezierTrail()
      } else if (this.type === 'projectile') {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
        // // Move and Draw the projectiles
        for (const projectile of this.projectiles) {
          projectile.draw()
          projectile.move()
        }
      } else if (this.type === 'spring') {
        this.updateParticlesSpring()
      } else {
        this.updateParticles()
      }
      requestAnimationFrame(this.loop)
    },
    launchEffect (e) {
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

        if ((distBetweenPoints > this.distance) || this.activateOnClick) {
          if (this.particleType && this.particleType === 'image') {
            this.addParticle(
              this.cursor.x + 30,
              this.cursor.y + 30,
              this.canvImages[this.indexCounter(this.images.length)]
            )
            if (this.randomChars && this.counter2 >= (this.images.length - 1)) {
              // console.log('randomchars')
              this.shuffleArray(this.canvImages)
            }
          } else {
            if (!this.fullWords) {
              this.addParticle(
                this.cursor.x + 30,
                this.cursor.y + 30,
                this.canvImages[this.indexCounter(this.charList.length)]
              )
            } else if (this.fullWords && !this.endReached) {
              // let currentWordIndex = this.wordIndex
              // console.log('wordIndex', this.indexCounterWord(this.charList.length))
              this.addParticle(
                this.cursor.x + 30,
                this.cursor.y + 30,
                this.canvWords[this.wordCounter][(this.indexCounter(this.charList[this.wordCounter].length, false, true))].canv
              )
            } else if (this.randomChars && this.counter2 >= (this.charList.length - 1)) {
              this.shuffleArray(this.canvImages)
            }
          }
          this.lastPos.x = this.cursor.x
          this.lastPos.y = this.cursor.y
        }
      } else if (this.type === 'ghost') {
        const imageObject = new Image()
        imageObject.src = this.images[Math.floor(Math.random() * this.images.length)]
        this.addParticle(this.cursor.x, this.cursor.y, imageObject)
      } else if (this.type === 'string') {
        const polyline = document.getElementById('cursorCanvas')
        if (!this.cursor.x || !this.cursor.y) return
        if (!this.points.length) return this.points.push([this.cursor.x, this.cursor.y])
        const [px, py] = this.points[this.points.length - 1]
        const d = this.dist(this.cursor.x, this.cursor.y, px, py)
        if (d < this.minDist) return
        this.points.push([this.lastPos.x, this.lastPos.y])
        const pathString = this.points.reduce((acc, [x, y]) => {
          return acc + ` ${this.cursor.x},${this.cursor.y}`
        }, '')
        polyline.setAttribute('points', pathString)
        if (this.points.length > this.maxPoints) this.points.shift()
      }
    },
    indexCounter (qty, random, stop) {
      if (random) {
        this.counter2 = Math.floor(Math.random() * (qty - 1))
      } else if (this.counter2 < (qty - 1)) {
        this.counter2++
      } else if (stop) {
        this.endReached = true
        this.counter2 = 0
      } else {
        this.counter2 = 0
      }
      return this.counter2
    },
    indexCounterWord: debounce(function indexCounterWord (qty, random) {
      if (random) {
        this.wordCounter = Math.floor(Math.random() * (qty - 1))
      } else if (this.wordCounter < (qty - 1)) {
        this.wordCounter++
      } else {
        this.wordCounter = 0
      }
      this.endReached = false
      return this.wordCounter
    }, 50),
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
        this.particles.push(new this.GhostParticle(x, y, elem, this.decay, this.fade))
      } else if (this.type === 'spring') {
        this.particles.push(new this.SpringParticle(x, y, elem))
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
            x: -this.particles[i].velocity.x * this.resistance,
            y: -this.particles[i].velocity.y * this.resistance
          }
          const accel = {
            x: (spring.x + resist.x) / this.mass,
            y: (spring.y + resist.y) / this.mass + this.gravity
          }
          this.particles[i].velocity.x += this.deltaT * accel.x
          this.particles[i].velocity.y += this.deltaT * accel.y

          if (
            Math.abs(this.particles[i].velocity.x) < this.stopVel &&
            Math.abs(this.particles[i].velocity.y) < this.stopVel &&
            Math.abs(accel.x) < this.stopAcc &&
            Math.abs(accel.y) < this.stopAcc
          ) {
            this.particles[i].velocity.x = 0
            this.particles[i].velocity.y = 0
          }

          this.particles[i].position.x += this.particles[i].velocity.x
          this.particles[i].position.y += this.particles[i].velocity.y

          const height = this.canvas.clientHeight
          const width = this.canvas.clientWidth

          if (this.particles[i].position.y >= height - this.dotSize - 1) {
            if (this.particles[i].velocity.y > 0) {
              this.particles[i].velocity.y = this.bounce * -this.particles[i].velocity.y
            }
            this.particles[i].position.y = height - this.dotSize - 1
          }

          if (this.particles[i].position.x >= width - this.dotSize) {
            if (this.particles[i].velocity.x > 0) {
              this.particles[i].velocity.x = this.bounce * -this.particles[i].velocity.x
            }
            this.particles[i].position.x = width - this.dotSize - 1
          }

          if (this.particles[i].position.x < 0) {
            if (this.particles[i].velocity.x < 0) {
              this.particles[i].velocity.x = this.bounce * -this.particles[i].velocity.x
            }
            this.particles[i].position.x = 0
          }
          if (this.drawEffects) {
            this.particles[i].draw(this.context)
          }
        }
      }
    },
    springForce (i, j, spring) {
      const dx = this.particles[i].position.x - this.particles[j].position.x
      const dy = this.particles[i].position.y - this.particles[j].position.y
      const len = Math.sqrt(dx * dx + dy * dy)
      if (len > this.seglen) {
        const springF = this.springK * (len - this.seglen)
        spring.x += (dx / len) * springF
        spring.y += (dy / len) * springF
      }
    },
    bezierTrail () {
      const points = [null, null, null, null]
      for (let i = 0; i < this.trail.length; i++) {
        const trailPoint = this.trail[i]
        points[0] = points[1]
        points[1] = points[2]
        points[2] = trailPoint

        if (points[0] == null) continue

        const lifeLeft = 1 - (Date.now() - trailPoint.createdAt) / 500
        const radius = this.trailSize * lifeLeft
        const p0 = points[0]
        const p1 = points[1]
        const p2 = points[2]
        const x0 = (p0.x + p1.x) / 2
        const y0 = (p0.y + p1.y) / 2
        const x1 = (p1.x + p2.x) / 2
        const y1 = (p1.y + p2.y) / 2

        this.context.beginPath()
        this.context.lineWidth = radius * 2
        this.context.lineCap = 'round'
        this.context.strokeStyle = this.trailColor
        this.context.moveTo(x0, y0)
        this.context.quadraticCurveTo(p1.x, p1.y, x1, y1)
        this.context.stroke()
      }
    },
    addPoint (point) {
      this.trail.push({
        x: point.x,
        y: point.y,
        createdAt: Date.now()
      })
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
      this.position = { x: x, y: y }
      this.canv = canvasItem
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
        if (spin) {
          context.save()
          context.translate(this.position.x, this.position.y) // sets scales and origin
          context.rotate(this.rot)
          context.drawImage(
            this.canv, -this.canv.width / 2, -this.canv.height / 2, this.canv.width, this.canv.height
          )
          context.restore()
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
      }
    },
    GhostParticle (x, y, canvasItem, decay, fade) {
      this.initialLifeSpan = decay // ms
      this.lifeSpan = decay // ms
      // Random ghost scattering
      // const randomA = Math.floor(Math.random() * 100)
      // const randomB = Math.floor(Math.random() * 100)
      this.position = { x: x, y: y }
      this.image = canvasItem
      this.update = function (context) {
        this.lifeSpan--
        if (fade) {
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
    generateProjectiles (pos) {
      this.projectiles.push(this.createProjectile(pos))
    },
    createProjectile (pos) {
      const thus = this
      return {
        bullet: this.projectileType === 'text' ? this.charList[Math.floor(this.charList.length * Math.random())] : this.images[Math.floor(this.images.length * Math.random())],
        size: Math.random() * 25 + 5,
        speed: this.projectileSpeed,
        direction: Math.floor(Math.random() * 180) + 180,
        angle: 0,
        x: this.customCursorPosX,
        y: this.customCursorPosY,
        spin: 0,
        life: 60,
        maxLife: 60,
        move: function () {
          if (this.life > 1) {
            this.life -= 1
            const speed = Math.ceil(this.life / this.maxLife * this.speed)
            this.x -= speed
            this.y -= speed
            // this.angle += this.spin
          }
        },
        draw: function () {
          if (this.life > 1) {
            thus.drawProjectile({
              bullet: this.bullet,
              x: this.x,
              y: this.y,
              size: this.size,
              angle: this.angle,
              alpha: this.life / this.maxLife
            })
          } else {
            thus.projectiles.shift()
          }
        }
      }
    },
    drawProjectile (info) {
      this.context.font = this.fontStyle
      // this.context.textAlign = 'center'
      // this.context.textBaseline = 'middle'
      this.context.save()
      this.context.globalAlpha = info.alpha || 1
      this.context.translate(info.x, info.y)
      this.context.rotate(info.angle)
      if (this.projectileType === 'text') {
        this.context.fillText(info.bullet, 0, 0)
      } else {
        const image = new Image()
        image.src = info.bullet
        this.context.drawImage(
          image, 0, 0, image.width, image.height
        )
      }
      this.context.restore()
    },
    clearCursor () {
      this.cursorElement.removeEventListener('mousemove', this.onMouseMove)
      this.cursorElement.removeEventListener('mousedown', this.onMouseDown)
      this.cursorElement.removeEventListener('mouseup', this.onMouseUp)
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
      // this.baseImage = new Image()
      this.canvImages = []
      this.image = null
      this.images = null
      this.dustColors = [
        '#ff004d',
        '#7e2753',
        '#fcccac'
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
      this.fade = false
      this.particleType = null
      this.spin = false
      this.nDots = 7
      this.resistance = 1
      this.gravity = 10
      this.hideTrailOnClick = false
      this.fullWords = false
      this.activateOnClick = false
      this.endReached = false
      this.interval = null
      this.stopAnim = false
      this.projectiles = []
      this.projectileHold = true
      this.projectileDelay = 200
      this.projectileTimeout = null
      this.projectileType = 'text'
      this.projectileSpeed = 50
      this.trail = []
      this.trailSize = 10
      this.trailColor = '#feffd9'
    }
  }
}
