import React, { Component } from 'react'
import '../stylesheets/drawingCanvas.css'
import PropTypes from 'prop-types'

import Layer from './layer'

export default class DrawingCanvas extends Component {
  render () {
    return (
      <div id="canvas-wrapper">
        {this.props.layers.map((layer, index) => {
          return <Layer
            key={index}
            id={layer.id}
            elements={layer.elements}
            order={layer.order}
            selectedColor={this.props.selectedColor}
            addLayerElement={this.props.addLayerElement}
          >
          </Layer>
        })
        }
      </div>
    )
  }
}

DrawingCanvas.propTypes = {
  layers: PropTypes.array,
  selectedColor: PropTypes.string,
  addLayerElement: PropTypes.func
}
