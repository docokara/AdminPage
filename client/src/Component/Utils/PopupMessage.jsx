/************************************************************************************************/
/*    _____               _                  _______         _  _         _          __         */
/*   / ____|             | |                |__   __|       (_)| |       | |        / _|        */
/*  | |  __   __ _   ___ | |__    __ _  ______ | |__      __ _ | |_  ___ | |__     | |_  _ __   */
/*  | | |_ | / _` | / __|| '_ \  / _` ||______|| |\ \ /\ / /| || __|/ __|| '_ \    |  _|| '__|  */
/*  | |__| || (_| || (__ | | | || (_| |        | | \ V  V / | || |_| (__ | | | | _ | |  | |     */
/*   \_____| \__,_| \___||_| |_| \__,_|        |_|  \_/\_/  |_| \__|\___||_| |_|(_)|_|  |_|     */
/*                                                                                              */
/* By Docomiot   ~/client/src/components/utils/PopupMesssage.jsx        06/11/2021              */
/*                                                                                              */
/************************************************************************************************/

import React from 'react'
import '../../css/Utils.css'

class PopupMessage extends React.Component {
  render() {
    const { message, options, simpleOk, isError } = this.props
    return (
      <div className='popup-message-container'>
        <div className={`popup-message`}>
          <div className='message' style={{ color: isError ? '#c92f00' : 'wheat' }}>
            <b>{message}</b>
          </div>
          <div className='options'>
            {!simpleOk ? (
              ''
            ) : (
              <div
                className='option-button'
                style={{ background: 'green' }}
                onClick={simpleOk}>
                <b>Ok</b>
              </div>
            )}
            {!options
              ? ''
              : options.map(option => {
                  const { text, color, onClick } = option
                  return (
                    <div
                      className='option-button'
                      style={{ background: color }}
                      onClick={onClick}>
                      <b>{text}</b>
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    )
  }
}
export default PopupMessage