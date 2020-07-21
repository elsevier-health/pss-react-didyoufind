import React from "react";
import axios from "axios";

const Modal = (props) => {


    const maxCharsInFeedback = 25;

    const submitFeedback = (event) => {

        const [e] = document.getElementsByClassName("tellUsMoreTextAreaSelector");
        const feedback = e.value;

        const data = {
            body: {
                searchTerm: props.searchTerm,
                documentId: props.documentId,
                documentName: props.documentName,
                feedback: feedback

            }
        };
        axios.put("/search/feedback", data)
            .then(response => {
                console.log("success"); //todo do we put a logger here. where does it log to?
            })
            .catch((err) => {
                console.log("Error " + err);
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
        if (feedbackLength > 25) {
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
                    <button className="didYouFindModalCloseBtn didYouFindModalCloseBtnSelector" onClick={e => {
                        onClose(e)
                    }}>
                        Close
                    </button>

                    <button className="didYouFindModalSubmitBtn didYouFindModalSubmitBtnSelector" onClick={e => {
                        submitFeedback(e)
                    }}>
                        Submit
                    </button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Modal;


