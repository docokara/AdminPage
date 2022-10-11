/************************************************************************************************/
/*    _____               _                  _______         _  _         _          __         */
/*   / ____|             | |                |__   __|       (_)| |       | |        / _|        */
/*  | |  __   __ _   ___ | |__    __ _  ______ | |__      __ _ | |_  ___ | |__     | |_  _ __   */
/*  | | |_ | / _` | / __|| '_ \  / _` ||______|| |\ \ /\ / /| || __|/ __|| '_ \    |  _|| '__|  */
/*  | |__| || (_| || (__ | | | || (_| |        | | \ V  V / | || |_| (__ | | | | _ | |  | |     */
/*   \_____| \__,_| \___||_| |_| \__,_|        |_|  \_/\_/  |_| \__|\___||_| |_|(_)|_|  |_|     */
/*                                                                                              */
/* By Docomiot   ~/client/src/components/utils/UtilsButton/UtilsButton.jsx        06/11/2021    */
/*                                                                                              */
/************************************************************************************************/

import React from 'react'

class UtilsButton extends React.Component {
  render() {
    const { handleClick, img, text, alt, disable, className, selected } = this.props
    return disable ? (
      ''
    ) : (
      <div
        className={`utils-button ${className || ''} ${selected ? 'selected' : ''}`}
        onClick={handleClick}>
        {img ? <img src={img} alt={alt || 'img'} /> : ''}
        {text || ''}
      </div>
    )
  }
}
export default UtilsButton