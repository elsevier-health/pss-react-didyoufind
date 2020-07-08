import React, { useState } from "react";
import Modal from "./Modal";


const ThankYouNo = () => {
    //user clicked no


    const [ show, setShow ] = useState(false);

    const showModal = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    };

    return (
        <div>
            <span>
                Thank you
                <span className="didyoufind-label">
                    <input className="didyoufind-feedback-btn" type="button" value="What were you looking for?" onClick={ e => showModal(e)} />
                </span>
            </span>
            <Modal onClose={e => closeModal(e)} show={show}>
            </Modal>
        </div>
    );
};

export default ThankYouNo;
