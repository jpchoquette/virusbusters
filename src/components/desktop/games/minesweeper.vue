<script>
// import UpdatePreferences from '@/mixins/updatePreferences.js'
// import AnimatedCursors from '@/mixins/animatedCursors.js'

export default {
  name: 'Minesweeper',
  components: {
  },
  data () {
    return {
      activeSize: {
        title: 'Small',
        value: 'small',
        quantity: 6
      },
      activeDifficulty: {
        title: 'Normal',
        value: 'normal',
        quantity: 0.4
      },
      rowsCount: 8,
      colsCount: 8,
      bombsCount: 10,
      virusImages: [],
      components: {
        // num_of_rows: 8,
        // num_of_cols: 8,
        // num_of_bombs: 10,
        bomb: '💣',
        alive: true,
        colors: { 1: 'blue', 2: 'green', 3: 'red', 4: 'purple', 5: 'maroon', 6: 'turquoise', 7: 'black', 8: 'grey' }
      },
      resetComponents: {
        // num_of_rows: 8,
        // num_of_cols: 8,
        // num_of_bombs: 10,
        bomb: '💣',
        virusImages: null,
        alive: true,
        colors: { 1: 'blue', 2: 'green', 3: 'red', 4: 'purple', 5: 'maroon', 6: 'turquoise', 7: 'black', 8: 'grey' }
      },
      gameLoading: false,
      gameStarted: false,
      gameFinished: false,
      gameWon: false,
      gameSizes: [
        {
          title: 'Small',
          value: 'small',
          quantity: 6
        },
        {
          title: 'Medium',
          value: 'medium',
          quantity: 10
        },
        {
          title: 'Large',
          value: 'large',
          quantity: 14
        },
        {
          title: 'X-Large',
          value: 'xlarge',
          quantity: 20
        }
      ],
      gameDifficulties: [
        {
          title: 'Easy',
          value: 'easy',
          quantity: 0.4
        },
        {
          title: 'Normal',
          value: 'normal',
          quantity: 0.6
        },
        {
          title: 'Hard',
          value: 'hard',
          quantity: 0.7
        },
        {
          title: 'Impossible',
          value: 'impossible',
          quantity: 0.8
        }
      ]
    }
  },
  mixins: [],
  computed: {
  },
  methods: {
    startGame () {
      console.log('gogogo on start')
      this.gameStarted = true
      this.gameLoading = true
      setTimeout(() => {
        this.components.bombs = this.placeBombs()
        document.getElementById('field').appendChild(this.createTable())
      }, 1000)
      for (let i = 0; i < 3; i++) {
        const img = document.createElement('img')
        img.setAttribute('class', 'virusImage')
        img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAA/CAYAAACSLYpOAAAAAXNSR0IArs4c6QAAA61JREFUaIHtWj1MFEEYfXsQiQiYINrAeQ0mdFyo/DkLchQaJCY0qMTGRKINsbvqtDAxIaGiMEYTG3Kaay4xaGIhsWBFyqP2Gn4KYy6o53liBMZC5pyd3fnbPZbV8Kq7nZ3Zt+973zczuwscIBgs/gAhxHiQSiYPAFodO6bGXNd0kbL+nhIzZhMyAitYyeTNJQesjqkxcSOjYLOPwQGYhTUIfIV4l1wg6I7hV8GgytH+6oRx9VR40KfnpBx4P/ryYCPC6gcmId7zhPCCkmBY2SqC7zJjivZsWtRESLUMq63LM2EiP5OEQpBXzy6WYBdLjmOkWiakWnb1lRIk1TJahvsaQNE/hB4k1TKqtU20DXSTQwPdjjZ69/1zK8oLLI8kkGL6pIcGHe0nTg0DANbePwIAsmAvObwoLNSkWiaUTHpoEPNv3gIAUsne+rnf7s8rCdLwtnTFpef9LK/Vf8faj9d5uRRcsJcIS+Tq7WkAzjung7Vn01okeb+ZIPJZ7FKQDSEAfPrwytUpfuYWgLpvpLCLJaSSvRgfvQAAyBVeByOoAy/SIvTPrQDJXjx9/AQAkCs4vUiJU9jFkiMvIhfi86nTjv8uBamh+VCzuHfnoW8CbLZ6wFVVlGUGAG5M3Kx752PXReHozePifcbySAKA+MbZufj/2NVRBT/3TQS6gExV0R5Zd0Vtfb87C3BrwaMvrkkJfb38zPF/K+deictIu0jwB9g9yUbPKACQmdYmPFh9CQD48W5We3AKnjRF53pBqWDkPWhcqA+fuy5t91KYtQWr5kbPKAFgda4XhOM1XMHa5q/NRo6n5UEAmGltAoC6F03Aq8p50qVgQ57NmIC1hazQeyG0XZ2AmPLRR2gEvSBLDgptgpO17T8/Tl7y5UO/kBKMpc4ilog7ZoPJ2jayHqVEVX78IvKFWqvMNI+POVSkJSf73DmnsiqypYWf6uhcHHSxUB9oK5d3/KZ+FM2xLHTOkUEa4p0V6eo3FBiHmA+3KdilVuAQs1nsFW4eIuIm6z9XX1kjWV3Dlr0IXkHhYAGIiCB/urW6/x70lcV7oZQI/3ahBoAvV6YRS8SJjgdNETiLAWDHXsSO7R3uMKAkyC8YwiQHaHgwlpA/Gd1rKBXklTsIMX99WWMlk4fVdiQsLp5QetA61kloWIMuFPxAWQfpy8T9qoORn0mUSbL7Ntyq7D5hiPJcbAGwws5i7X0x/a6gkslbMH/BrXyCoN1R58Me0w8rdD6HYsEmSeTxGz10e2t8eXx9AAAAAElFTkSuQmCC'
        this.virusImages.push(img)
      }
    },
    placeBombs () {
      const rows = []
      for (let i = 0; i < this.bombsCount; i++) {
        this.placeSingleBomb(rows)
      }
      return rows
    },
    placeSingleBomb (bombs) {
      // console.log('on place les bombes', bombs)
      // const nrow, ncol, row, col
      const nrow = Math.floor(Math.random() * this.rowsCount)
      const ncol = Math.floor(Math.random() * this.colsCount)
      let row = bombs[nrow]
      if (!row) {
        row = []
        bombs[nrow] = row
      }
      const col = row[ncol]
      if (!col) {
        // console.log('pas de colone')
        row[ncol] = true
      } else {
        // console.log('on place une bombe')
        this.placeSingleBomb(bombs)
      }
    },
    cellID (i, j) {
      // console.log('cellid', 'cell-' + i + '-' + j)
      return 'cell-' + i + '-' + j
    },
    createTable () {
      // var table, row, td, i, j
      const table = document.createElement('table')

      for (let i = 0; i < this.rowsCount; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j < this.colsCount; j++) {
          const td = document.createElement('td')
          td.id = this.cellID(i, j)
          row.appendChild(td)
          this.addCellListeners(td, i, j)
        }
        table.appendChild(row)
      }
      this.gameLoading = false
      return table
    },
    addCellListeners (td, i, j) {
      // console.log('cell listener!', td, i, j)
      const thus = this
      // let clicked = false
      td.addEventListener('mousedown', function (event) {
        // console.log('on click la cell:', i, j, td, thus.components)
        if (!thus.components.alive) {
          return
        }
        thus.components.mousewhiches += event.which
        if (event.which === 3) {
          return
        }
        if (thus.flagged) {
          return
        }
        this.style.backgroundColor = 'lightGrey'
      })

      td.addEventListener('mouseup', function (event) {
        if (!thus.components.alive) {
          return
        }
        if (this.clicked && thus.components.mousewhiches === 4) {
          thus.performMassClick(thus.components, i, j)
        }
        thus.components.mousewhiches = 0
        if (event.which === 0) {
          console.log('LEFT CLICK!')
        }
        if (event.which === 3) {
          if (this.clicked) {
            return
          }
          if (this.flagged) {
            this.flagged = false
            this.textContent = ''
          } else {
            this.flagged = true
            this.textContent = thus.components.flag
          }
          // console.log('test', this.flagged, this.textContent)
          event.preventDefault()
          event.stopPropagation()
          return false
        } else {
          // console.log('click', thus.components)
          thus.handleCellClick(this, i, j)
        }
      })
      td.oncontextmenu = function () {
        return false
      }
    },
    handleCellClick (cell, i, j) {
      const thus = this
      if (!thus.components.alive) {
        return
      }
      if (cell.flagged) {
        return
      }
      cell.style = {}
      cell.clicked = true
      if (cell.clicked) {
        cell.classList.add('clicked-cell')
      }
      // console.log('vuetify', thus.$vuetify.theme)
      // console.log('thus.components.bombs[i][j]', thus.components.bombs, i, j)
      if (thus.components.bombs[i] && thus.components.bombs[i][j]) {
        cell.style.backgroundColor = thus.$vuetify.theme.themes.light.accent
        cell.style.color = 'white'
        // cell.textContent = thus.components.bomb
        cell.appendChild(this.virusImages[1])
        thus.gameOver()
        // console.log('cell', cell)
      } else {
        cell.style.backgroundColor = thus.$vuetify.theme.themes.light.primary
        thus.bombsCount = thus.adjacentBombs(i, j)
        if (thus.bombsCount) {
          cell.style.color = thus.components.colors[thus.bombsCount]
          cell.textContent = thus.bombsCount
          cell.style.fontFamily = 'Daydream'
          cell.style.fontSize = '14px'
        } else {
          thus.clickAdjacentBombs(i, j)
        }
      }
    },
    adjacentBombs (row, col) {
      let numOfBombs = 0
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (this.components.bombs[row + i] && this.components.bombs[row + i][col + j]) {
            numOfBombs++
          }
        }
      }
      return numOfBombs
    },
    adjacentFlags (row, col) {
      let numFlags = 0
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const cell = document.getElementById(this.cellID(row + i, col + j))
          if (!!cell && cell.flagged) {
            numFlags++
          }
        }
      }
      return numFlags
    },
    clickAdjacentBombs (row, col) {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue
          }
          const cell = document.getElementById(this.cellID(row + i, col + j))
          if (!!cell && !cell.clicked && !cell.flagged) {
            this.handleCellClick(cell, row + i, col + j)
          }
        }
      }
    },
    performMassClick (cell, row, col) {
      if (this.adjacentFlags(row, col) === this.adjacentBombs(row, col)) {
        this.clickAdjacentBombs(row, col)
      }
    },
    gameOver () {
      this.gameFinished = true
      this.components.alive = false
    },
    resetGame () {
      this.gameStarted = false
      this.gameFinished = false
      this.components = this.resetComponents
      const element = document.getElementById('field')
      this.clearAllChildren(element)
    },
    clearAllChildren (parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
      }
    },
    updateValSize (val) {
      console.log('val', val)
      this.activeSize = this.gameSizes[val]
      this.rowsCount = this.gameSizes[val].quantity
      this.colsCount = this.gameSizes[val].quantity
      this.bombsCount = Math.floor(this.rowsCount * 2 * this.activeDifficulty.quantity)
      console.log(this.rowsCount, this.activeDifficulty.quantity)
      console.log('bombcounts', this.bombsCount)
    },
    updateValDifficulty (val) {
      console.log('val', val)
      this.activeDifficulty = this.gameDifficulties[val]
      this.bombsCount = Math.floor(this.activeSize.quantity * 2 * this.gameDifficulties[val].quantity)
      console.log(this.activeSize.quantity, this.gameDifficulties[val].quantity)
      console.log('bombcounts', this.bombsCount)
      // this.colsCount = this.gameSizes[val].quantity
    },
    handler: function (e) {
      // do stuff
      console.log('test!')
      e.preventDefault()
    }
  }
}
</script>
<template lang='pug'>
  .minesweeper-window
    transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn animate__faster', leave-active-class='animate__animated animate__fadeOut animate__faster', mode='out-in')
      div.game-setup(v-if='!gameStarted')
        h2 Risky Click!
        div.i.mb3.mt2 A.K.A. Minesweeper
        v-item-group(@change='updateValSize', mandatory)
          v-container
            .options-subtitle Grid size
            div
              template(v-for='(size, index) in gameSizes')
                v-item.ma1(v-slot='{ active, toggle }', :key='index')
                  v-btn(:color="active ? 'secondary' : ''", @click='toggle') {{size.title}}
        v-item-group(@change='updateValDifficulty', mandatory)
          v-container
            .options-subtitle Game difficulty
            div
              template(v-for='(diff, index) in gameDifficulties')
                v-item.ma1(v-slot='{ active, toggle }', :key='index')
                  v-btn(:color="active ? 'secondary' : ''", @click='toggle') {{diff.title}}

        v-btn.mt2(@click='startGame()', x-large, color='accent') Start!
      div#box(v-else-if='gameStarted')
        h2 Risky Click!
        div.parameters__wrapper
          div Grid size: {{activeSize.title}}
          div Difficulty: {{activeDifficulty.title}} ({{bombsCount}} viruses)

        #field(@contextmenu='handler($event)')
          transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn animate__faster', leave-active-class='animate__animated animate__fadeOut animate__faster', mode='out-in')

            #lost(v-if='gameFinished')
              h3 Infected !
              v-btn(@click='resetGame()', color='accent') Try Again
</template>
<style lang='sass'>
  .minesweeper-window
    height: 100%
    .game-setup
      height: 100%
      text-align: center
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      position: relative
      h2
        font-family: $display-font
      .options-subtitle
        // font-family: $display-font
        margin-bottom: 10px
        text-align: center
    #box
      text-align: center
      display: flex
      flex-direction: column
      align-items: center
      position: relative
      h2
        font-family: $display-font
        margin-bottom: 20px

      #field
        position: relative
        #lost
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          background-color: rgba(0,0,0,0.5)
          z-index: 10
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          color: white
          h3
            font-family: $display-font
            margin-bottom: 20px
        table
          border-collapse: collapse
          font-size: 150%
          font-family: sans-serif
          font-weight: bold
          display: inline-block

          tr
            max-height: 40px !important
            // border:1 solid 1px black
            td
              background-color: var(--v-light-base)
              width: 40px
              min-width: 40px
              height: 40px
              min-height: 40px
              max-width: 40px!important
              max-height: 40px!important
              border: 2px solid black
              position: relative
              &::before
                content: ''
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                border-top: 5px solid rgba(0,0,0,0.15)
                border-left: 5px solid rgba(0,0,0,0.45)
                border-bottom: 5px solid rgba(0,0,0,0.55)
                border-right: 5px solid rgba(0,0,0,0.25)
              &::after
                content: ''
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                opacity: 0
                background-color: black
              &:hover
                &::after
                  opacity: 0.25
              &.clicked-cell
                &::before
                  border: none
                  box-shadow: inset 0px 0px 6px rgb(0 0 0 / 70%)
                  // border-top: 5px solid rgba(0,0,0,0.15)
                  // border-left: 5px solid rgba(0,0,0,0.25)
                  // border-bottom: 5px solid rgba(0,0,0,0.45)
                  // border-right: 5px solid rgba(0,0,0,0.55)
              .virusImage
                width: 100%
                height: 100%
                max-width: 35px
                max-height: 30px
                object-fit: contain

</style>
