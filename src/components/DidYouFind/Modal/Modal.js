import React, { useState } from "react";
import axios from "axios";
import "./Modal.scss";
import "@els/els-styleguide-core/images/icon-sprite-hmds.svg";

const Modal = (props) => {

    const maxCharsInFeedback = 2550;
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const submitFeedback = (event) => {
        if (submitButtonDisabled) {
            return;
        }

        const [textarea] = document.getElementsByClassName("tellUsMoreTextAreaSelector");

        const feedback = textarea.value;

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
        updateEditableText();

        const length = paste.length;
        updateOverLimit(length);
    };

    const onTextEntry = (e) => {
        const txtArea = e.target;
        const text = txtArea.value;
        updateEditableText();

        const length = text.length;
        updateOverLimit(length);
    };

    const onScroll = (e) => {
        const [textarea] = document.getElementsByClassName("tellUsMoreTextAreaSelector");
        const [readOnly] = document.getElementsByClassName("tellUsMoreTextAreaReadOnlySelector");

        const scrollTop = textarea.scrollTop;
        readOnly.scrollTop = scrollTop;
    };

    const highlightOverage = () => {
        const [textarea] = document.getElementsByClassName("tellUsMoreTextAreaSelector");
        const [readOnly] = document.getElementsByClassName("tellUsMoreTextAreaReadOnlySelector");

        const text = textarea.value;
        const overage = text.slice(maxCharsInFeedback, text.length);
        readOnly.innerHTML = applyHighlight(text, overage);
    };

    const applyHighlight = (text, overage) => {
        const regex = new RegExp(`${escapeRegExp(overage)}$`);
        text = text.replace(regex, `<span class="highlight">${overage}</span>`);
        return replaceCarriageReturns(text);
    };

    const escapeRegExp = (text) => {
        return text.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&');
    };

    const replaceCarriageReturns = (text) => {
        return text.replace(/\n/g,"<br>");
    };

    const updateEditableText = () => {
        const [textarea] = document.getElementsByClassName("tellUsMoreTextAreaSelector");
        const [readOnly] = document.getElementsByClassName("tellUsMoreTextAreaReadOnlySelector");

        const text = textarea.value;
        readOnly.innerHTML = replaceCarriageReturns(text);

        const scrollTop = textarea.scrollTop;
        readOnly.scrollTop = scrollTop;
    };

    const updateOverLimit = (feedbackLength) => {
        const [overLimit] = document.getElementsByClassName("overTheCharacterLimitSelector");

        setSubmitButtonDisabled(feedbackLength > maxCharsInFeedback || feedbackLength === 0);

        if (feedbackLength > maxCharsInFeedback) {
            const over = feedbackLength - maxCharsInFeedback;
            overLimit.innerText = over + " over the limit";
            highlightOverage();
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
                    <textarea
                        onPaste={onPasteEntry}
                        onKeyUp={onTextEntry}
                        onScroll={onScroll}
                        className="tellUsMoreTextArea tellUsMoreTextAreaSelector"
                        rows="10" />
                    <div contentEditable={true}
                         className="tellUsMoreTextAreaReadOnly tellUsMoreTextAreaReadOnlySelector" />
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


