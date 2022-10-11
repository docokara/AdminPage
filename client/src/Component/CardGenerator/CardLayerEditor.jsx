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

import React from "react";
import "../../css/cardlayereditor.css";
import UtilsButton from "../Utils/UtilsButton";
import Moover from "./Moover";
import axios from "axios";
import ParamsPage from "./ParamsPage";

class CardLayerEditor extends React.Component {
  state = {
    handlefinish: this.props.handlefinish,
    mainLayer: new Position(400, 300, 900, 400),
    layers: [0],
    isInvisible: [],
  };

  componentDidMount() {}

  isImg = async (Url) => {
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

  addLayer = async () => {
    const { layers, mainLayer, urlInput } = this.state;

    const newElement = document.getElementById(`resizeMe0`).style.width;
    // console.log(newElement);

    this.setState({
      layers: [...layers, layers.length + 1],
    });
  };

  render() {
    const { layers, mainLayer, urlInput, isModified, isInvisible } = this.state;
    console.log(isInvisible);
    return (
      <div className="cardlayereditor-container">
        <div className="add-header">
          <UtilsButton text="Add element" handleClick={this.addLayer} />
          <input
            type="text"
            value={urlInput || ""}
            onChange={(event) =>
              this.setState({ urlInput: event.target.value })
            }
          />
        </div>
        <div className="params-side">
          <div className="param-side-layerItems">
            {!layers
              ? ""
              : layers.map((layer, i) => (
                  <div
                    key={i}
                    className={`layerItem${i} ${
                      isModified === i ? "isModified" : ""
                    }`}
                  >
                    {" "}
                    <div
                      className="numOfLayer"
                      onClick={() => {
                        this.setState({ isModified: i });
                      }}
                    >
                      {" "}
                      Layer numéro {i}
                    </div>
                    <img
                      alt={`layerItem${i}`}
                      src="https://img.icons8.com/windows/50/000000/visible--v1.png"
                      onClick={() => {
                        if (!isInvisible.includes(JSON.stringify(i))) {
                          this.setState({
                            isInvisible: [...isInvisible, JSON.stringify(i)],
                          });
                        }
                      }}
                    />
                  </div>
                ))}
          </div>
          {typeof isModified !== "number" ? (
            ""
          ) : (
            <div className="param-side-modifiers">
              {typeof isModified != "number" ? (
                ""
              ) : (
                <div className={`layer-Modifiers`}>
                  <label htmlFor={`WidthParam`}> Width</label>
                  <input
                    type="text"
                    key={layers[isModified].width}
                    id={`WidthParam`}
                    value={layers[isModified].width}
                    onChange={(e) => {
                      this.setState({ [layers[isModified]]: e.target.value });
                    }}
                  />
                  <label htmlFor={`HeightParam`}>Height</label>
                  <input
                    type="text"
                    key={layers[isModified].height}
                    id={`HeightParam`}
                    value={layers[isModified].height}
                    onChange={(e) => {
                      this.setState({ [layers[isModified]]: e.target.value });
                    }}
                  />
                  <label htmlFor={`XParam`}> X</label>
                  <input
                    type="text"
                    key={layers[isModified].x}
                    id={`XParam`}
                    value={layers[isModified].x}
                    onChange={(e) => {
                      this.setState({ [layers[isModified]]: e.target.value });
                    }}
                  />
                  <label htmlFor={`YParam`}> Y </label>
                  <input
                    type="text"
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
          )}
        </div>
        <div className="layers-editor">
          {layers.map((layer, i) => (
            <Moover
              key={`${i}${JSON.stringify(layer)}`}
              name={i}
              isVisible={isInvisible}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default CardLayerEditor;

class Position {
  constructor(height, width, x, y, z = 0) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.z = z;

    this.left = this.x;
    this.top = this.y;
    this.zIndex = this.z;

    this.style = {
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left,
    };
  }

  setStyle() {
    this.style = {
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left,
    };
  }

  setHeight(height) {
    this.height = height;
    this.setStyle();
  }
  setWidth(width) {
    this.width = width;
    this.setStyle();
  }
  setTop(top) {
    this.top = top;
    this.y = top;
    this.setStyle();
  }
  setLeft(left) {
    this.left = left;
    this.x = left;
    this.setStyle();
  }
  setZindex(zIndex) {
    this.z = zIndex;
    this.zIndex = zIndex;
    this.setStyle();
  }

  // alias
  setY(y) {
    this.setTop(y);
  }

  setX(x) {
    this.setLeft(x);
  }
}
