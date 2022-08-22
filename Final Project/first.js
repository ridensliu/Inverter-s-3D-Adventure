const init = async () => {
  const data = await fetch('data.json')
  const text = await data.text()
  document.querySelector('a-scene').setAttribute('scene-flow', { imgdata: text })
}

init()

AFRAME.registerComponent('scene-flow', {
  schema: {
    imgdata: { type: 'string' }
  },

  init: function() {
    this.createObjects()
  },
  
  update: function () {
    if (this.data.imgdata) {
      this.pixelInfo = JSON.parse(this.data.imgdata)
      
      for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
          const info = this.pixelInfo[i][j]
          this.boxes[j][31 - i].setAttribute('color', `rgba(${ info[0] }, ${ info[1] }, ${ info[2] }, ${ info[3] })`)
        }
      }
    }
  },
  
  createObjects: function () {
    //structure:
    // a-scene
    //==> a-entity
    //====> a-box
    
    this.mStage = document.createElement('a-entity')//create new entity
    this.el.appendChild(this.mStage)
    this.boxes = []

    for (let i = 0; i < 32; i++) {
      const boxList = []
      
      for (let j = 0; j < 32; j++) {
        const el = document.createElement('a-box')//create new boxes
        boxList.push(el)
        
        el.setAttribute('position', `${ (i - 16) / 10 } ${ (j - 16) / 10 + 2 } -55`)

        const size = 0.07
        el.setAttribute('width', size)
        el.setAttribute('height', size)
        el.setAttribute('depth', size)
        
        el.setAttribute('material', 'shader: data-block;')
        
        el.setAttribute('color', `hsl(${ Math.sqrt(i * i + j * j) * 1.5 }, 100%, 70%)`)
        
        const dist = Math.sqrt(Math.pow(i - 16, 2) + Math.pow(j - 16, 2) )

        //position animation
        el.setAttribute('animation__pos', {
          property: 'object3D.position.z',
          // to: 2.7,
          to: Math.random() * 80.5 + 1.5,
          
          dur: 5000,
          dir: 'alternate',
          loop: true,
          delay: dist * 100,
        })

        //rotation animation
        el.setAttribute('animation__rot', {
          property: 'rotation',
          to: '0 360 360',
          dur: 2500,
          // dir: 'alternate',
          loop: true,
          delay: dist * 500,
        })

        this.mStage.appendChild(el)
      }
      
      this.boxes.push(boxList)
    }
  }
})
