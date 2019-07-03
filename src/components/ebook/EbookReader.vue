<template>
  <div class="ebook-reader">
    <div id="read"></div>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import Epub from 'epubjs'
  global.ePub = Epub
  export default {
    name: 'EbookReader',
    mixins: [ebookMixin],
    methods: {
      prePage () {
        if (this.rendition) {
          this.hideTitleAndMenu()
          this.rendition.prev()
        }
      },

      nextPage () {
        if (this.rendition) {
          this.hideTitleAndMenu()
          this.rendition.next()
        }
      },
      toggleTitleAndMenu () {
        if (this.menuVisible) {
          this.setSettingVisible(-1)
        }
        this.setMenuVisible(!this.menuVisible)
      },
      hideTitleAndMenu () {
        this.setSettingVisible(-1)
        this.setMenuVisible(false)
      },
      initEpub () {
        const url = `http://localhost:3004/${this.fileName}.epub`
        this.book = new Epub(url)
        this.setCurrentBook(this.book)
        this.rendition = this.book.renderTo('read', {
          width: innerWidth,
          height: innerHeight,
          method: 'default'
        })
        this.rendition.display()

        this.rendition.on('touchstart', event => {
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
        })

        this.rendition.on('touchend', event => {
          const offsetX = event.changedTouches[0].clientX - this.touchStartX
          const time = event.timeStamp - this.touchStartTime
          if (time < 500 && offsetX > 40) {
            this.prePage()
          } else if (time < 500 && offsetX < -40) {
            this.nextPage()
          } else {
            this.toggleTitleAndMenu()
          }
          event.preventDefault() // 禁止事件调用
          event.stopPropagation()
        })
      }
    },
    mounted () {
      // const baseUrl = "http://localhost:3004/epub/2015_Book_PlantSelectionForBioretentionS.epub"
      const fileName = this.$route.params.fileName.split('|').join('/')
      this.setFileName(fileName).then(() => {
        this.initEpub()
      })
    }
  }
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
</style>
