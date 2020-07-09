import React from "react";

const Modal = (props) => {

    const submitFeedback = (event) => {
        //do axios stuff
        props.onSubmitFeedback(event);
    };

    const onClose = (event) => {
        props.onClose(event);
    };

    if (props.show) {
        return (
            <div className="didyoufind-modal">
                <div>
                    Thanks for responding
                </div>
                <div>
                    Please tell us more about what you were looking for
                </div>
                <div>
                    <textarea/>
                </div>
                <div>
                    <button onClick={e => {onClose(e)}}>
                        Close
                    </button>

                    <button onClick={e  => {submitFeedback(e)} }>
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


