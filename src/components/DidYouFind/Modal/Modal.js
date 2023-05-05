import React, { useState } from "react";
import classnames from "classnames";
import { bool, func, string } from "prop-types";
import axios from "axios";

import logger from "../logger";

import "./Modal.scss";
import "@els/els-styleguide-core/images/icon-sprite-hmds.svg";

const Modal = ({
    dark,
    documentId,
    documentName,
    documentUrl,
    onClose,
    onSubmitFeedback,
    searchTerm,
    show
}) => {

    const maxCharsInFeedback = 2550;
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

    const submitFeedback = (event) => {
        const [textarea] = document.getElementsByClassName("tellUsMoreTextAreaSelector");

        const feedback = textarea.value;

        const data = {
            searchTerm: searchTerm,
            documentId: documentId,
            documentName: documentName,
            documentUrl: documentUrl,
            feedback: feedback

        };

        axios.put("/search/feedback", data)
            .then(response => {
                logger.log("success");
            })
            .catch((err) => {
                logger.error("Error " + err);
            });
        onSubmitFeedback(event);
    };

    const onPasteEntry = (e) => {
        /* istanbul ignore next */
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
        text = text.replace(regex, `<span class="highlight" data-testid="highlight">${overage}</span>`);
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

    const className = classnames(
        "didyoufind-modal",
        "didYouFindModalSelector",
        {
            "dark": dark
        }
    );

    if (show) {
        return (
            <div className={className} data-testid="qa-didyoufind-modal">
                <div className="thanksForRespondingModal thanksForRespondingModalSelector">
                    Thanks for responding
                    <button
                        className="didyoufind-modal-close-icon didYouFindCloseIconSelector"
                        data-testid="qa-didyoufind-modal-close-icon"
                        onClick={ e => { onClose(e) } }
                    >
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
                         className="tellUsMoreTextAreaReadOnly tellUsMoreTextAreaReadOnlySelector"
                         data-testid="qa-didyoufind-modal-readonly"
                    />
                </div>
                <div className="didyoufind-modal-button-container">
                    <span className="overTheCharacterLimitSelector overTheCharacterLimit"></span>

                    <button className="didYouFindModalSubmitBtn didYouFindModalSubmitBtnSelector c-els-button"
                            data-testid="qa-didyoufind-submit-btn"
                            disabled={submitButtonDisabled}
                            onClick={submitFeedback}>
                        <span className="didYouFindModalSubmitBtn-label">
                            Submit
                        </span>
                    </button>

                    <button
                        className="didYouFindModalCloseBtn didYouFindModalCloseBtnSelector"
                        data-testid="qa-didyoufind-modal-close-btn"
                        onClick={e => { onClose(e) } }
                    >
                        <span className="didYouFindModalCloseBtn-label didYouFindModalCloseBtnLabelSelector">Close</span>
                    </button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

Modal.propTypes = {
    dark: bool,
    documentId: string,
    documentName: string,
    documentUrl: string,
    onClose: func,
    onSubmitFeedback: func,
    searchTerm: string,
    show: bool
};

Modal.defaultProps = {
    dark: false,
    show: false
}

export default Modal;
