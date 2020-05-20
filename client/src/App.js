import React, { Component } from 'react'

import Navbar from './components/navbar'
import ColorButtonList from './components/colorButtonList'
import ToolButtonList from './components/toolButtonList'
import DrawingCanvas from './components/drawingCanvas'
import LayerMenu from './components/layerMenu'
import NewLayerPopup from './components/newLayerPopup'
import toolList from './config/toolList'

import './stylesheets/app.css'
import utils from './utils'
import ExecutionHistory from './utils/executionHistory'

export default class App extends Component {

  constructor(){
    super()
    this.executionHistory = new ExecutionHistory;
    this.executionHistory.push(this.state.layers)
    this.redoExecuted = false
    this.undoExecuted = false
  }

  state = {
    displayNewLayerPopup: false,
    selectedColor: '#00aaff',
    selectedTool: 'square',
    layers: []
  }

  componentDidUpdate(prevProps, prevState) {
    if(!utils.arraysAreEqual(prevState.layers, this.state.layers)){
      if(!this.redoExecuted && !this.undoExecuted){
         this.executionHistory.push(this.state.layers)
      }
      this.redoExecuted = false
      this.undoExecuted = false
    }else{
    }
  }

  redo = () => {
    const redoLayers = this.executionHistory.redo()
    if(redoLayers !== null){
      this.redoExecuted = true
      this.setState({
        layers: redoLayers,
      })
    }
  }

  undo = () => {
    const undoLayers = this.executionHistory.undo()
    if(undoLayers !== null){
      this.undoExecuted = true
      this.setState({
        layers: undoLayers,
      })
    }
  }

  addLayer (layer) {
    const layers_ = this.state.layers
    layers_.push(layer)
    this.setState({
      layers: [...layers_]
    })
  }

  deleteLayer (layerId) {
    const layers_ = this.state.layers.filter(layer => layer.id !== layerId)
    this.setState({
      layers: [...layers_]
    })
  }

  sortLayers (layers) {
    const layersCopy = layers.slice(0)

    function swap (arr, x, y) {
      const temp = arr[x]
      arr[x] = arr[y]
      arr[y] = temp
    }

    for (const i in layersCopy) {
      let maxElement = i
      for (let j = i; j < layers.length; j++) {
        if (layersCopy[j].order > layersCopy[maxElement].order) {
          maxElement = j
        }
      }
      swap(layersCopy, i, maxElement)
    }

    return layersCopy
  }

  displayNewLayerPopup () {
    this.setState({
      displayNewLayerPopup: true
    })
  }

  closeNewLayerPopup () {
    this.setState({
      displayNewLayerPopup: false
    })
  }

  addNewLayer = (layerName) => {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    const newLayer = {
      name: layerName,
      id: randomId,
      order: this.state.layers.length,
      elements: []
    }
    const layers_ = this.state.layers

    this.setState({
      layers: [...layers_, newLayer],
      displayNewLayerPopup: false
    })
  }

  changeSelectedColor (colorCode) {
    this.setState({
      selectedColor: colorCode
    })
  }

  changeLayerProperty (layerId, property, newValue) {
    const layers_ = this.state.layers.map((layer) => {
      if (layer.id === layerId) {
        layer[property] = newValue
      }
      return layer
    })
    this.setState({
      layers: layers_
    })
  }

  changeLayerName (layerId, newName) {
    this.changeLayerProperty(layerId, 'name', newName)
  }

  increaseLayerOrder (layerId, newOrder) {
    if (newOrder >= this.state.layers.length) { return }

    const layers_ = this.state.layers.map((layer) => {
      if (layer.id === layerId) {
        layer.order = newOrder
      } else if (layer.order === newOrder) {
        layer.order = newOrder - 1
      }
      return layer
    })
    this.setState({
      layers: layers_
    })
  }

  decreaseLayerOrder(layerId, newOrder) {
    if (newOrder < 0) { return }

    const layers_ = this.state.layers.map((layer) => {
      if (layer.id === layerId) {
        layer.order = newOrder
      } else if (layer.order === newOrder) {
        layer.order = newOrder + 1
      }
      return layer
    })
    this.setState({
      layers: layers_
    })
  }

  addLayerElement = (layerId, newElement) => {
    const layers_ = this.state.layers.map((layer) => {
      if(layer.id === layerId){
        return {
          name: layer.name,
          id: layer.id,
          order: layer.order,
          elements: [...layer.elements, newElement]
        }
      }else return layer
    })
    this.setState({
      layers: layers_
    })
  }

  /*
  changeLayerOrder(layerId, newOrder){
    this.changeLayerProperty(layerId, "order", newOrder)
  }
  */

  changeSelectedTool = (tool) => {
    this.setState({
      selectedTool: tool
    })
  }

  render () {
    return (
      <div>
        <Navbar></Navbar>
        <div className="container-fluid">
          <div className="row" id="row-1">
            <div className="col-2">
            </div>
            <div className="col-4" id="tool-button-list-col">
              <ToolButtonList toolList={toolList.slice(0, 5)}
                              redo={this.redo}
                              undo={this.undo}
                              selectedTool={this.state.selectedTool}
                              changeSelectedTool={this.changeSelectedTool}>
              </ToolButtonList>
              <ToolButtonList toolList={toolList.slice(5, 10)}
                              selectedTool={this.state.selectedTool}
                              changeSelectedTool={this.changeSelectedTool}>
              </ToolButtonList>
            </div>
            <div className="col-2">

            </div>
            <div className="col-4" id="output-button-list-col">
              <ToolButtonList toolList={toolList.slice(2, 3)}></ToolButtonList>
            </div>
          </div>
          <div className="row" id="row-2">
            <div className="col-2" id="color-button-list-col">
              <ColorButtonList selectedColor={this.state.selectedColor}
                changeSelectedColor={this.changeSelectedColor.bind(this)}>
              </ColorButtonList>
            </div>
            <div className="col-4" id="drawing-canvas-col">
              <DrawingCanvas
                layers={this.state.layers}
                selectedColor={this.state.selectedColor}
                selectedTool={this.state.selectedTool}
                addLayerElement={this.addLayerElement}
              ></DrawingCanvas>
            </div>
            <div className="col-2" id="layers-menu-col">
              <LayerMenu
                layers = {this.state.layers}
                addLayer = {this.displayNewLayerPopup.bind(this)}
                deleteLayer = {this.deleteLayer.bind(this)}
                changeLayerName = {this.changeLayerName.bind(this)}
                increaseLayerOrder = {this.increaseLayerOrder.bind(this)}
                decreaseLayerOrder = {this.decreaseLayerOrder.bind(this)}
              ></LayerMenu>
            </div>
            <div className="col-4" id="output-canvas-col">

            </div>
          </div>
        </div>
        {this.state.displayNewLayerPopup &&
      <NewLayerPopup
        addNewLayer={this.addNewLayer.bind(this)}
        close={this.closeNewLayerPopup.bind(this)}>
      </NewLayerPopup>
        }
      </div>
    )
  }
}
