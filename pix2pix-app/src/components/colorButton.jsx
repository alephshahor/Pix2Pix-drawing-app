import React from 'react'
import "../stylesheets/colorButton.css"

/*Icons made by <a href="https://www.flaticon.com/authors/vectors-market" 
title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>*/

export default function ColorButton(props) {
    const colorName = props.colorName;
    return (
        <div id="color-button-wrapper">
            <button id="color-button" class="bg-dark" type="button">{colorName}</button>
            <img id="color-image" src={require('../images/colors/' + colorName + ".png")} alt="Color"/>
        </div>
    )
}