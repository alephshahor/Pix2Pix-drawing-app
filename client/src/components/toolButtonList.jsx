import React from 'react'
import PropTypes from 'prop-types'
import ToolButton from './toolButton'
import '../stylesheets/toolButtonList.css'

/**
 * ToolButtonList component returns a list of ToolButton components
 * @component
 */
function ToolButtonList (props) {
  const toolList = props.toolList
  return (
    <ul className="tool-button-unordered-list">
      {
        toolList.map((toolName, index) => {
          const toolFunction = props[toolName]

          return <li className="tool-button-list-element" key={index}>
            <ToolButton toolName={toolName}
              toolFunction={toolFunction === undefined ? function () {} : toolFunction}
              selectedTool={props.selectedTool}
              changeSelectedTool={props.changeSelectedTool}/>
          </li>
        })
      }
    </ul>
  )
}

/**
 * ToolButtonList proptypes
 * @param {Array} toolList a list with the tool names
 * @param {String} selectedTool the name of the currently selected tool
 * @param {Function} changeSelectedTool a function for changing the currently selected tool
 */
ToolButtonList.propTypes = {
  toolList: PropTypes.array,
  selectedTool: PropTypes.string,
  changeSelectedTool: PropTypes.func
}

export default ToolButtonList
