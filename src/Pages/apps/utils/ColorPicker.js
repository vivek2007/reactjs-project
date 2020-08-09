import React, { Component } from 'react'
import { BlockPicker } from 'react-color'

/* eslint-disable */
class ColorPicker extends Component {
  stopPropagation = event => {
    event.stopPropagation()
  }

  onChange = color => {
    const { onChange } = this.props
    onChange('color', color.hex)
  }

  renderModal = () => {
    const { color } = this.props.currentState
    return (
      <div onClick={this.stopPropagation}>
        <BlockPicker color={color} onChangeComplete={this.onChange} />
      </div>
    )
  }

  render() {
    const { expanded, onExpandEvent } = this.props
    return (
      <div aria-haspopup="true" aria-expanded={expanded} aria-label="rdw-color-picker">
        <div onClick={onExpandEvent}>Color</div>
        {expanded ? this.renderModal() : undefined}
      </div>
    )
  }
}

export default ColorPicker
