import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./ThankYouNo.scss";
import "@els/els-styleguide-core/images/icon-sprite-hmds.svg";

const ThankYouNo = props => {
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

    const className = props.darkMode ? "didYouFindNo didYouFindNoSelector dark" : "didYouFindNo didYouFindNoSelector";

    return (
        <div className={className}>
            <span className="didYouFindMessageSelector">
                Thank you.
                <button className="didyoufind-feedback-btn" onClick={ e => showModal(e)}>
                    <svg className="didyoufind-icon-note">
                        <use href={"#icon-sprite-hmds_icon__note"} />
                    </svg>
                    <span className="didYouFindQuestionButtonSelector">What were you looking for?</span>
                </button>
            </span>
            <Modal darkMode={props.darkMode} searchTerm={props.searchTerm} documentId={props.documentId} documentName={props.documentName} documentUrl={props.documentUrl} show={show} onClose={e => closeModal(e)} onSubmitFeedback={e => onSubmitFeedback(e)} >
            </Modal>
        </div>
    );
};

export default ThankYouNo;
