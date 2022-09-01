import React from 'react';
import "./ToggleButton.css"
import Modal_Popup from '../modal_renderer/Modal_Popup';

const ToggleButton = ({ on, off, handleToggle, status, checked }) => {
  return (
    <>
      
          <label className="switch" >
            <input type="checkbox" id="togBtn" defaultChecked={status} onChange={handleToggle} checked={checked}/>
            {console.log(checked,"checkedValue")}
            <div className="slider round">

              {/* <span className="on">on </span> */}
              {/* <span className="off"></span> */}

            </div>
          </label>
      
    </>
  );
};

export default React.memo(ToggleButton);