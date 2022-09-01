import Modal from "react-bootstrap/Modal";
// import "bootstrap/dist/css/bootstrap.min.css";
import ToggleButton from "../Toggle_Button/ToggleButton";
import React from "react";
import "./Modal_Popup.css"


function Modal_Popup({ status, onClick, message }) {
    // console.log(props.data,"Modal_Popup");
    const [isOpen, setIsOpen] = React.useState(false);
    const [statusIs, setStatusIs] = React.useState(status);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const handleAffirmation = () => {
        setStatusIs(!status);
        onClick();
    }
    return (
        <>
            <ToggleButton handleToggle={showModal} status={status} checked={statusIs} />
            <div className="modal fade DeletePopup">
                <Modal show={isOpen} onHide={hideModal} centered>
                {/* <Modal.Header>ALERT!</Modal.Header> */}
                <Modal.Body>
                   <p>{message}</p>
                   <div class="modal-btn1">
                    <button className="btn btn-danger CancelBtn" onClick={hideModal}>Cancel</button>
                    <button className="btn submitBtn" onClick={() => { hideModal(); handleAffirmation(); }}>Yes</button>
                    </div>
                </Modal.Body>
            </Modal>
            </div>
        </>
    );
};
export default React.memo(Modal_Popup);