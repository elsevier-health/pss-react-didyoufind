import React from "react";
import axios from "axios";
import "./Modal.scss";


const Modal = (props) => {


    const maxCharsInFeedback = 2550;

    const submitFeedback = (event) => {

        const [e] = document.getElementsByClassName("tellUsMoreTextAreaSelector");
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
        const [submitBtn] = document.getElementsByClassName("didYouFindModalSubmitBtn");
        const [overLimit] = document.getElementsByClassName("overTheCharacterLimitSelector");
        if (feedbackLength > maxCharsInFeedback) {
            const over = feedbackLength - maxCharsInFeedback;
            overLimit.innerText = over + " over the limit";
            submitBtn.disabled = true;
        } else {
            submitBtn.disabled = false;
            overLimit.innerText = "";
        }
    };

    if (props.show) {
        return (
            <div className="didyoufind-modal didYouFindModalSelector">
                <div className="thanksForRespondingModal thanksForRespondingModalSelector">
                    Thanks for responding
                </div>
                <div className="tellUsMoreLabel tellUsMoreLabelSelector">
                    Please tell us more about what you were looking for
                </div>
                <div>
                    <textarea onPaste={onPasteEntry} onKeyUp={onTextEntry} className="tellUsMoreTextArea tellUsMoreTextAreaSelector"/>
                </div>
                <div>
                    <span className="overTheCharacterLimitSelector"></span>

                    <button className="didYouFindModalSubmitBtn didYouFindModalSubmitBtnSelector c-els-button" onClick={e => {
                        submitFeedback(e)
                    }}>
                        Submit
                    </button>

                    <button className="didYouFindModalCloseBtn didYouFindModalCloseBtnSelector" onClick={e => {
                        onClose(e)
                    }}>
                        Close
                    </button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Modal;


