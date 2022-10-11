/************************************************************************************************/
/*    _____               _                  _______         _  _         _          __         */
/*   / ____|             | |                |__   __|       (_)| |       | |        / _|        */
/*  | |  __   __ _   ___ | |__    __ _  ______ | |__      __ _ | |_  ___ | |__     | |_  _ __   */
/*  | | |_ | / _` | / __|| '_ \  / _` ||______|| |\ \ /\ / /| || __|/ __|| '_ \    |  _|| '__|  */
/*  | |__| || (_| || (__ | | | || (_| |        | | \ V  V / | || |_| (__ | | | | _ | |  | |     */
/*   \_____| \__,_| \___||_| |_| \__,_|        |_|  \_/\_/  |_| \__|\___||_| |_|(_)|_|  |_|     */
/*                                                                                              */
/*              By Docomiot                                              12/11/2021             */
/*       ~/client/src/components/InstanceView/AdminPage/CardGenerator/CardLayerEditor.jsx       */
/************************************************************************************************/

import React from 'react'
import '../../../../styles/cardlayereditor.css'
import UtilsButton from '../../../Utils/UtilsButton'
import LayerElement from './LayerElement'
import axios from 'axios'
import Position from '../../../../utils/position'

class CardLayerEditor extends React.Component {
  state = {
    handlefinish: this.props.handlefinish,
    mainLayer: new Position(400, 300, 500, 200),
    layers: []
  }

  componentDidMount() {}

  isImg = async Url => {
    let response = false
    await axios
      .get(Url, {
        headers: {
          Authorization: 'image/png'
        }
      })
      .then(res => {
        if (res.status === 200) {
          response = true
        }
      })
      .catch(error => {
        console.log('error')
      })
    return response
  }

  addLayer = async () => {
    const { layers, mainLayer, urlInput } = this.state

    // let newLayer = {
    //   position: new Position(mainLayer.width * 0.3, mainLayer.height * 0.3, 0, 0),
    //   content: {}
    // }
    let newLayer = new Position(mainLayer.width * 0.3, mainLayer.height * 0.3, 0, 0)
    if (await this.isImg(urlInput)) newLayer.img = urlInput

    this.setState({
      layers: [...layers, newLayer]
    })
  }

  positionHandle = name => {
    let Final_Y
    let Final_X
    const element = document.getElementById(`resizeMe${name}`)

    // The current position of mouse
    let x = 0
    let y = 0

    // The position of the element
    let top = 0
    let left = 0

    const mouseDownHandlerPos = e => {
      // Get the current mouse position
      x = e.clientX
      y = e.clientY

      // Calculate the position of element
      const style = window.getComputedStyle(element)
      top = parseInt(style.top, 10)
      left = parseInt(style.left, 10)

      // Attach the listeners to `document`
      document.addEventListener('mousemove', mouseMoveHandlerPos)
      document.addEventListener('mouseup', mouseUpHandlerPos)
    }

    const mouseMoveHandlerPos = function (e) {
      const { layers, mainLayer } = this.state
      let params = layers
      // How far the mouse has been moved

      const original_X = mainLayer.x
      const original_Y = mainLayer.y
      const width = mainLayer.width
      const height = mainLayer.height

      const tl = [original_X, original_Y]
      const tr = [original_X + width, original_Y]
      const bl = [original_X, original_Y + height]
      const dx = e.clientX - x
      const dy = e.clientY - y
      Final_Y = top + dy
      Final_X = left + dx
      if (Final_X < 0) Final_X = 0
      if (Final_Y < 0) Final_Y = 0
      if (Final_X > width - params[name].width) Final_X = width - params[name].width
      if (Final_Y > height - params[name].height) Final_Y = height - params[name].height

      let Final_Params = new Position(
        params[name].height,
        params[name].width,
        Final_X,
        Final_Y
      )
      Final_Params.img = params[name].img

      params[name] = Final_Params
      this.setState({ layers: params })
    }.bind(this)
    const mouseUpHandlerPos = function () {
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener('mousemove', mouseMoveHandlerPos)
      document.removeEventListener('mouseup', mouseUpHandlerPos)
    }
    const resizers = element.querySelectorAll(`.position${name}`)
    ;[].forEach.call(resizers, function (resizer) {
      resizer.addEventListener('mousedown', mouseDownHandlerPos)
    })
  }

  sizeHandle = name => {
    const { layers, mainLayer } = this.state
    const resizers = document.querySelectorAll(`.resizer${name}`)
    const width = mainLayer.width
    const height = mainLayer.height
    const maximum_width = mainLayer.width
    const maximum_height = mainLayer.height
    const minimum_size =
      mainLayer.width < mainLayer.height ? mainLayer.width / 10 : mainLayer.height / 10
    let original_width = 0
    let original_height = 0
    let original_x = 0
    let original_y = 0
    let original_mouse_x = 0
    let original_mouse_y = 0
    resizers.forEach(currentResizer => {
      let params = this.state.layers
      //
      currentResizer.addEventListener('mousedown', e => {
        e.preventDefault()
        original_width = params[name].width
        original_height = params[name].height
        original_x = params[name].x
        original_y = params[name].y
        original_mouse_x = e.pageX
        original_mouse_y = e.pageY
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
      })
      const resize = e => {
        if (currentResizer.classList.contains('bot-right')) {
          const width = original_width + (e.pageX - original_mouse_x)
          const height = original_height + (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            params[name].width = width
          }
          if (height > minimum_size) {
            params[name].height = height
          }
          if (width > maximum_width) {
            params[name].width = maximum_width
          }
          if (height > maximum_height) {
            params[name].height = maximum_height
          }
        } else if (currentResizer.classList.contains('bot-left')) {
          const height = original_height + (e.pageY - original_mouse_y)
          const width = original_width - (e.pageX - original_mouse_x)
          if (height > minimum_size) {
            params[name].height = height
          }
          if (width > minimum_size) {
            params[name].width = width
            params[name].x = original_x + (e.pageX - original_mouse_x)
          }
          if (width > maximum_width) {
            params[name].width = maximum_width
          }
          if (height > maximum_height) {
            params[name].height = maximum_height
          }
        } else if (currentResizer.classList.contains('top-right')) {
          const width = original_width + (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            params[name].width = width
          }
          if (height > minimum_size) {
            params[name].height = height
            params[name].y = original_y + (e.pageY - original_mouse_y)
          }
          if (width > maximum_width) {
            params[name].width = maximum_width
          }
          if (height > maximum_height) {
            params[name].height = maximum_height
          }
        } else {
          const width = original_width - (e.pageX - original_mouse_x)
          const height = original_height - (e.pageY - original_mouse_y)
          if (width > minimum_size) {
            params[name].width = width
            params[name].x = original_x + (e.pageX - original_mouse_x)
          }
          if (height > minimum_size) {
            params[name].height = height
            params[name].y = original_y + (e.pageY - original_mouse_y)
          }
          if (width > maximum_width) {
            params[name].width = maximum_width
          }
          if (height > maximum_height) {
            params[name].height = maximum_height
          }
        }
        // let Final_left = params[name].x
        // let Final_top = params[name].y
        // if (Final_left < 0) Final_left = 0
        // if (Final_top < 0) Final_top = 0
        // if (Final_left > width - layers[name].width)
        //   Final_left = width - layers[name].width
        // if (Final_top > height - layers[name].height)
        //   Final_top = height - layers[name].height
       
        this.setState({ layers: params })
      }
      function stopResize() {
        window.removeEventListener('mousemove', resize)
      }
    })
  }

  render() {
    const { layers, mainLayer, urlInput } = this.state
    return (
      <div className='cardlayereditor-container'>
        <div className='add-header'>
          <UtilsButton text='Add element' handleClick={this.addLayer} />
          <input
            type='text'
            value={urlInput || ''}
            onChange={event => this.setState({ urlInput: event.target.value })}
          />
        </div>
        <div className='params-side'></div>
        <div className='layers-editor' style={mainLayer.style}>
          {layers.map((layer, i) => (
            <LayerElement
              key={`${i}${JSON.stringify(layer)}`}
              name={i}
              mainLayer={mainLayer}
              layer={layer}
              sizeHandle={this.sizeHandle}
              positionHandle={this.positionHandle}
            />
          ))}
        </div>
      </div>
    )
  }
}
export default CardLayerEditor
