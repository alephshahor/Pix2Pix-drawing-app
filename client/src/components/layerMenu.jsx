import React from 'react'
import PropTypes from 'prop-types'
import LayerButton from './layerButton'
import AddLayerButton from './addLayerButton'

import '../stylesheets/layerMenu.css'

export default function LayerMenu (props) {
  const layers = props.layers
  return (
    <div id="layer-menu-wrapper">
      <AddLayerButton
        addLayer={props.addLayer}
      ></AddLayerButton>
      {
        layers.sort((a, b) => (a.order > b.order) ? -1 : 1)
          .map((layer, index) => {
            return <LayerButton
              key={index}
              layer={layer}
              deleteLayer={props.deleteLayer}
              changeLayerName={props.changeLayerName}
              increaseLayerOrder={props.increaseLayerOrder}
              decreaseLayerOrder={props.decreaseLayerOrder}
            ></LayerButton>
          })
      }
    </div>
  )
}

LayerMenu.propTypes = {
  layers: PropTypes.array,
  addLayer: PropTypes.func,
  deleteLayer: PropTypes.func,
  increaseLayerOrder: PropTypes.func,
  decreaseLayerOrder: PropTypes.func,
  changeLayerName: PropTypes.func
}