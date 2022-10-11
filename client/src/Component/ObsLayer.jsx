import React, { Component, createRef } from "react";
import "../css/ObsLayer.css";
import CreateElement from "./CreateElement";
import axios from "axios";
import { UtilsButton, PopupMessage } from "./Utils";

class ObsLayer extends Component {
  state = {
    backgroundLink: undefined,
    addItem: false,
    background: false,
    elements: [[500, 600, 400, 200]],
  };

  addLayer = async (Url) => {
    let response = false;
    await axios
      .get(Url, {
        headers: {
          Authorization: "image/png",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          response = true;
        }
      })
      .catch((error) => {
        console.log("error");
      });
    return response;
  };
  positionHandle = (name) => {
    const { elements } = this.state;
    let params = elements;
    let Final_top;
    let Final_left;
    const element = document.getElementById(`resizeMe${name}`);

    // The current position of mouse
    let x = 0;
    let y = 0;

    // The position of the element
    let top = 0;
    let left = 0;
    const mouseDownHandlerPos = (e) => {
      // Get the current mouse position
      x = e.clientX;
      y = e.clientY;

      // Calculate the position of element
      const style = window.getComputedStyle(element);
      top = parseInt(style.top, 10);
      left = parseInt(style.left, 10);

      // Attach the listeners to `document`
      document.addEventListener("mousemove", mouseMoveHandlerPos);
      document.addEventListener("mouseup", mouseUpHandlerPos);
    };

    const mouseMoveHandlerPos = function (e) {
      // How far the mouse has been moved
      if (name === 0) {
        const dx = e.clientX - x;
        const dy = e.clientY - y;

        params[name][3] = top + dy;
        params[name][2] = left + dx;
      } else {
        const original_X = elements[0][2];
        const original_Y = elements[0][3];
        const width = elements[0][0];
        const height = elements[0][1];

        const tl = [original_X, original_Y];
        const tr = [original_X + width, original_Y];
        const bl = [original_X, original_Y + height];
        const dx = e.clientX - x;
        const dy = e.clientY - y;

        Final_top = top + dy;
        Final_left = left + dx;
        if (Final_left < 0) Final_left = 0;
        if (Final_top < 0) Final_top = 0;
        if (Final_left > width - elements[name][0])
          Final_left = width - elements[name][0];
        if (Final_top > height - elements[name][1])
          Final_top = height - elements[name][1];

        params[name][2] = Final_left;
        params[name][3] = Final_top;
      }
      this.setState({ elements: params });
    }.bind(this);
    const mouseUpHandlerPos = function () {
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener("mousemove", mouseMoveHandlerPos);
      document.removeEventListener("mouseup", mouseUpHandlerPos);
    };
    const resizers = element.querySelectorAll(`.position${name}`);
    [].forEach.call(resizers, function (resizer) {
      resizer.addEventListener("mousedown", mouseDownHandlerPos);
    });
  };
  sizeHandle = (name) => {
    const { elements } = this.state;
    let params = elements;
    const element = document.getElementById(`resizeMe${name}`);
    const resizers = document.querySelectorAll(`.resizer${name}`);

    const original_X = elements[0][2];
    const original_Y = elements[0][3];
    const width = elements[0][0];
    const height = elements[0][1];

    const maximum_width = elements[0][0];
    const maximum_height = elements[0][1];
    const minimum_size = 100;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    resizers.forEach((currentResizer, i) => {
      currentResizer.addEventListener("mousedown", function (e) {
        e.preventDefault();
        original_width = elements[name][0];
        original_height = elements[name][1];
        original_x = elements[name][2];
        original_y = elements[name][3];
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResize);
      });

      const resize = function (e) {
        if (currentResizer.classList.contains("bot-right")) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height + (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            params[name][0] = width;
          }
          if (height > minimum_size) {
            params[name][1] = height;
          }
          if (width > maximum_width) {
            params[name][0] = maximum_width;
          }
          if (height > maximum_height) {
            params[name][1] = maximum_height;
          }
        } else if (currentResizer.classList.contains("bot-left")) {
          const height = original_height + (e.pageY - original_mouse_y);
          const width = original_width - (e.pageX - original_mouse_x);
          if (height > minimum_size) {
            params[name][1] = height;
          }
          if (width > minimum_size) {
            params[name][0] = width;
            params[name][2] = original_x + (e.pageX - original_mouse_x);
          }
          if (width > maximum_width) {
            params[name][0] = maximum_width;
          }
          if (height > maximum_height) {
            params[name][1] = maximum_height;
          }
        } else if (currentResizer.classList.contains("top-right")) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height - (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            params[name][0] = width;
          }
          if (height > minimum_size) {
            params[name][1] = height;
            params[name][3] = original_y + (e.pageY - original_mouse_y);
          }
          if (width > maximum_width) {
            params[name][0] = maximum_width;
          }
          if (height > maximum_height) {
            params[name][1] = maximum_height;
          }
        } else {
          const width = original_width - (e.pageX - original_mouse_x);
          const height = original_height - (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            params[name][0] = width;
            params[name][2] = original_x + (e.pageX - original_mouse_x);
          }
          if (height > minimum_size) {
            params[name][1] = height;
            params[name][3] = original_y + (e.pageY - original_mouse_y);
          }
          if (width > maximum_width) {
            params[name][0] = maximum_width;
          }
          if (height > maximum_height) {
            params[name][1] = maximum_height;
          }
        }
        let Final_left = params[name][2];
        let Final_top = params[name][3];
        if (Final_left < 0) Final_left = 0;
        if (Final_top < 0) Final_top = 0;
        if (Final_left > width - elements[name][0])
          Final_left = width - elements[name][0];
        if (Final_top > height - elements[name][1])
          Final_top = height - elements[name][1];
        params[name][2] = Final_left;
        params[name][3] = Final_top;
        this.setState({ elements: params });
      }.bind(this);
      function stopResize() {
        window.removeEventListener("mousemove", resize);
      }
    });
  };
  ApplyChangment = (e, index) => {
    const { elements } = this.state;
    let params = elements;
    params[index][0] = parseInt(e.target.value);
    console.log(elements);
    this.setState({ elements: params });
  };
  addDiv = () => {
    const { elements } = this.state;
    let props;

    const width = Math.round(elements[0][0] * 0.3);
    const height = Math.round(elements[0][1] * 0.3);
    const x = Math.round(100);
    const y = Math.round(100);
    props = [width, height, x, y];
    this.setState({ elements: [...elements, props] });
  };
  handleClick = async (e) => {
    switch (e.target.classList[1]) {
      case "addItem":
        this.setState({ addItem: !this.state.addItem });
        break;
      case "addBackground":
        this.setState({ backgroundLink: "" });
        break;
      case "setBackground":
        const isGoodLayer = await this.addLayer(e);
        if (isGoodLayer) break;
      default:
        break;
    }
  };

  render() {
    const { elements, addItem, background, backgroundLink, LayerParamIndex } =
      this.state;
    console.log(elements);
    return (
      <div className="ObsLayer">
        <div className="parameter-nav">
          <div
            className="addDiv"
            onClick={() => {
              this.addDiv();
            }}
          >
            Add div !
          </div>
          <UtilsButton
            handleClick={this.handleClick}
            text={"+"}
            className={"addItem"}
          />
          {addItem ? (
            <div className="addItemView">
              {!background ? (
                backgroundLink === undefined ? (
                  <UtilsButton
                    handleClick={this.handleClick}
                    text={"Ajouter un background"}
                    className={"addBackground"}
                  />
                ) : (
                  <div className="setBackgroundByUrl">
                    <input
                      type="text"
                      className="backgroundLink"
                      value={backgroundLink}
                      onChange={(e) => {
                        this.setState({ backgroundLink: e.target.value });
                      }}
                    />
                    <UtilsButton
                      handleClick={this.handleClick}
                      className={"setBackground"}
                      text={"ajouter"}
                    />
                  </div>
                )
              ) : (
                <UtilsButton
                  handleClick={this.handleClick}
                  text={"addLayer"}
                  className={"addLayer"}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        {/*-----------------------------------------------------------------------------------------*/}

        <div
          className="resizeMe0"
          id="resizeMe0"
          style={{
            width: elements[0][0],
            height: elements[0][1],
            left: elements[0][2],
            top: elements[0][3],
          }}
        >
          {elements.length < 2
            ? ""
            : elements.map((element, index) => {
                return index === 0 ? (
                  ""
                ) : (
                  <CreateElement
                    key={`${index}${element[0]}${element[1]}${element[2]}${
                      element[3]
                    }${Math.random()}`}
                    name={index}
                    width={element[0]}
                    height={element[1]}
                    x={element[2]}
                    y={element[3]}
                    sizeHandle={this.sizeHandle}
                    positionHandle={this.positionHandle}
                    zIndex={index + 10}
                    img={elements[4] || undefined}
                  />
                );
              })}
        </div>
        <div className="layers" id="layers">
          <div className="ParamLayer">
            {LayerParamIndex ? (
              !elements[LayerParamIndex][0] ? (
                ""
              ) : (
                <div key={Math.random() * 1000} className={`WidthLabel`}>
                  <label htmlFor={`WidthParam`}></label>
                  <input
                    type="number"
                    key={Math.random() * 1000}
                    id={`WidthParam`}
                    value={elements[LayerParamIndex][0]}
                    onChange={(e) => {
                      this.ApplyChangment(e, LayerParamIndex);
                    }}
                  />
                  Width
                </div>
              )
            ) : (
              ""
            )}
            {LayerParamIndex ? (
              !elements[LayerParamIndex][1] ? (
                ""
              ) : (
                <div key={Math.random() * 1000} className={`HeightLabel`}>
                  <label htmlFor={`HeightParam`}></label>
                  <input
                    type="number"
                    key={Math.random() * 1000}
                    id={`HeightParam`}
                    value={elements[LayerParamIndex][1]}
                    onChange={(e) => {
                      this.ApplyChangment(e, LayerParamIndex);
                    }}
                  />
                  Height
                </div>
              )
            ) : (
              ""
            )}
            {LayerParamIndex ? (
              !elements[LayerParamIndex][2] ? (
                ""
              ) : (
                <div key={Math.random() * 1000} className={`XLabel`}>
                  <label htmlFor={`XParam`}></label>
                  <input
                    type="number"
                    key={Math.random() * 1000}
                    id={`XParam`}
                    value={elements[LayerParamIndex][2]}
                    onChange={(e) => {
                      this.ApplyChangment(e, LayerParamIndex);
                    }}
                  />
                  X
                </div>
              )
            ) : (
              ""
            )}
            {LayerParamIndex ? (
              !elements[LayerParamIndex][3] ? (
                ""
              ) : (
                <div key={Math.random() * 1000} className={`YLabel`}>
                  <label htmlFor={`YParam`}></label>
                  <input
                    type="number"
                    key={Math.random() * 1000}
                    id={`YParam`}
                    value={elements[LayerParamIndex][3]}
                    onChange={(e) => {
                      this.ApplyChangment(e, LayerParamIndex);
                    }}
                  />
                  Y
                </div>
              )
            ) : (
              ""
            )}
          </div>
          <div className="layersItems" id="layersItems">
            {elements.map((element, index) => {
              return index === 0 ? (
                ""
              ) : (
                <div
                  key={index}
                  className={`LayerNumber${index}`}
                  onClick={(e) => {
                    this.setState({ LayerParamIndex: index });
                  }}
                >
                  Layer numéro {index}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ObsLayer;
//img text ou int
