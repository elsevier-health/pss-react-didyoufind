import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./ThankYouNo.scss";
import "@els/els-styleguide-core/images/icon-sprite-hmds.svg";

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
            <span className="didYouFindMessageSelector">
                Thank you.
                <button className="didyoufind-feedback-btn" onClick={ e => showModal(e)}>
                    <svg className="didyoufind-icon-note">
                        <use href={"#icon-sprite-hmds_icon__note"}></use>
                    </svg>
                    <span className="didYouFindQuestionSelector">What were you looking for?</span>
                </button>
            </span>
            <Modal searchTerm={props.searchTerm} documentId={props.documentId} documentName={props.documentName} show={show} onClose={e => closeModal(e)} onSubmitFeedback={e => onSubmitFeedback(e)} >
            </Modal>
        </div>
    );
};

export default ThankYouNo;
