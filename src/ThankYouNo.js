import React, { useState } from "react";
import Modal from "./Modal";


const ThankYouNo = (props) => {
    //user clicked no


    const [ show, setShow ] = useState(false);

    const showModal = (event) => {
        setShow(true);
    };

    const closeModal = (event) => {
        setShow(false);
    };

    const onSubmitFeedback = (event) => {
        props.onFeedbackSubmit(event);
    };

    return (
        <div className="didYouFindNoSelector">
            <span>
                Thank you
                <span className="didyoufind-label">
                    <input className="didyoufind-feedback-btn" type="button" value="What were you looking for?" onClick={ e => showModal(e)} />
                </span>
            </span>
            <Modal searchTerm={props.searchTerm} documentId={props.documentId} documentName={props.documentName} show={show} onClose={e => closeModal(e)} onSubmitFeedback={e => onSubmitFeedback(e)} >
            </Modal>
        </div>
    );
};

export default ThankYouNo;
