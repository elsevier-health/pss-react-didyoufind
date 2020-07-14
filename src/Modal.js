import React from "react";
import axios from "axios";

const Modal = (props) => {

    const submitFeedback = (event) => {

        const data = {
            body: {
                searchTerm: props.searchTerm,
                documentId: props.documentId,
                documentName: props.documentName,
                feedback: "Hi I am a feed back"

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
                <div className="thanksForRespondingModalSelector">
                    Thanks for responding
                </div>
                <div className="tellUsMoreLabelSelector">
                    Please tell us more about what you were looking for
                </div>
                <div className="tellUsMoreTextAreaSelector">
                    <textarea/>
                </div>
                <div>
                    <button className="didYouFindModalCloseBtnSelector" onClick={e => {onClose(e)}}>
                        Close
                    </button>

                    <button className="didYouFindModalSubmitBtnSelector" onClick={e  => {submitFeedback(e)} }>
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


