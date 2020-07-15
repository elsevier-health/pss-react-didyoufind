import React from "react";
import axios from "axios";

const Modal = (props) => {

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
                console.log("success");
            })
            .catch((err) => {
                console.log("More Bad shit happened");
            });
        props.onSubmitFeedback(event);
    };

    const onClose = (event) => {
        props.onClose(event);
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
                    <textarea className="tellUsMoreTextArea tellUsMoreTextAreaSelector" />
                </div>
                <div>
                    <button className="didYouFindModalCloseBtn didYouFindModalCloseBtnSelector" onClick={e => {onClose(e)}}>
                        Close
                    </button>

                    <button className="didYouFindModalSubmitBtn didYouFindModalSubmitBtnSelector" onClick={e  => {submitFeedback(e)} }>
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


