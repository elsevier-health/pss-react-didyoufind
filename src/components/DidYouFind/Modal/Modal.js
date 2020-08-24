import React, { useState } from "react";
import axios from "axios";
import "./Modal.scss";
import "@els/els-styleguide-core/images/icon-sprite-hmds.svg";


const Modal = (props) => {

    const maxCharsInFeedback = 2550;
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const submitFeedback = (event) => {
        const [e] = document.getElementsByClassName("tellUsMoreTextAreaSelector");
        const [submitBtn] = document.getElementsByClassName("didYouFindModalSubmitBtnSelector");

        if (submitBtn.disabled) {
            return;
        }

        const feedback = e.value;

        const data = {
            searchTerm: props.searchTerm,
            documentId: props.documentId,
            documentName: props.documentName,
            feedback: feedback

        };
        axios.put("/search/feedback", data)
            .then(response => {
                if (console) {
                    console.log("success"); //todo do we put a logger here. where does it log to?
                }
            })
            .catch((err) => {
                if (console) {
                    console.log("Error " + err);
                }
            });
        props.onSubmitFeedback(event);
    };

    const onClose = (event) => {
        props.onClose(event);
    };

    const onPasteEntry = (e) => {
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        updateOverLimit(paste.length);
    };

    const onTextEntry = (e) => {
        const txtArea = e.target;
        updateOverLimit(txtArea.value.length);
    };

    const updateOverLimit = (feedbackLength) => {
        const [overLimit] = document.getElementsByClassName("overTheCharacterLimitSelector");

        setSubmitButtonDisabled(feedbackLength > maxCharsInFeedback || feedbackLength === 0);

        if (feedbackLength > maxCharsInFeedback) {
            const over = feedbackLength - maxCharsInFeedback;
            overLimit.innerText = over + " over the limit";
        } else {
            overLimit.innerText = "";
        }
    };

    if (props.show) {
        return (
            <div className="didyoufind-modal didYouFindModalSelector">
                <div className="thanksForRespondingModal thanksForRespondingModalSelector">
                    Thanks for responding
                    <button className="didyoufind-modal-close-icon didYouFindCloseIconSelector" onClick={ e => { onClose(e) } } >
                        <svg className="didyoufind-icon-x">
                            <use href={"#icon-sprite-hmds_icon__close"} />
                        </svg>
                    </button>
                </div>
                <div className="tellUsMoreLabel tellUsMoreLabelSelector">
                    Please tell us more about what you were looking for
                </div>
                <div className="tellUsMoreTextAreaContainer">
                    <label className="tellUsMoreTextAreaLabel">
                        <textarea
                            onPaste={onPasteEntry}
                            onKeyUp={onTextEntry}
                            className="tellUsMoreTextArea tellUsMoreTextAreaSelector"
                            rows="10" />
                    </label>

                </div>
                <div className="didyoufind-modal-button-container">
                    <span className="overTheCharacterLimitSelector overTheCharacterLimit"></span>

                    <button className="didYouFindModalSubmitBtn didYouFindModalSubmitBtnSelector c-els-button"
                            disabled={submitButtonDisabled}
                            onClick={submitFeedback}>
                        <span className="didYouFindModalSubmitBtn-label">
                            Submit
                        </span>
                    </button>

                    <button className="didYouFindModalCloseBtn didYouFindModalCloseBtnSelector" onClick={e => { onClose(e) } }>
                        <span className="didYouFindModalCloseBtn-label didYouFindModalCloseBtnLabelSelector">Close</span>
                    </button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Modal;


