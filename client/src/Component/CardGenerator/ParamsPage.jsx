import React, { Component } from 'react';

class ParamsPage extends Component {
    state= {
        layers : this.props.layers,
        isModified : this.props.isModified,
        positionHandle : this.props.positionHandle
    }

    
    render() {
        const {layers, positionHandle, isModified} = this.state
        return (
            <div className="layer-ParamsPage">
            <div
              className={"position1000"}
              style={{ position: "absolute", height: "100%", width: "100%" }}
            ></div>
            {typeof isModified != "number" ? (
              ""
            ) : (
              <div className={`layer-Modifiers`}>
                <label htmlFor={`WidthParam`}> Width</label>
                <input
                  type="number"
                  key={layers[isModified].width}
                  id={`WidthParam`}
                  value={layers[isModified].width}
                  onChange={(e) => {
                    this.setState({ [layers[isModified]]: e.target.value });
                  }}
                />
      
                <label htmlFor={`HeightParam`}>Height</label>
                <input
                  type="number"
                  key={layers[isModified].height}
                  id={`HeightParam`}
                  value={layers[isModified].height}
                  onChange={(e) => {
                    this.setState({ [layers[isModified]]: e.target.value });
                  }}
                />
      
                <label htmlFor={`XParam`}> X</label>
                <input
                  type="number"
                  key={layers[isModified].x}
                  id={`XParam`}
                  value={layers[isModified].x}
                  onChange={(e) => {
                    this.setState({ [layers[isModified]]: e.target.value });
                  }}
                />
      
                <label htmlFor={`YParam`}> Y </label>
                <input
                  type="number"
                  key={layers[isModified].y}
                  id={`YParam`}
                  value={layers[isModified].y}
                  onChange={(e) => {
                    this.setState({ [layers[isModified]]: e.target.value });
                  }}
                />
              </div>
            )}
          </div>
        );
    }
}

export default ParamsPage;