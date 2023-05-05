import React, { useState } from "react";
import classnames from "classnames";
import { bool, string } from "prop-types";
import axios from "axios";

import ThankYou from "./ThankYou/ThankYou";
import ThankYouNo from "./ThankYouNo/ThankYouNo";
import Modal from "./Modal/Modal";
import logger from "./logger";

import "./DidYouFind.scss";

const DidYouFind = (props) => {

    const [answer, setAnswer] = useState("");
    const [ showModal, setShowModal ] = useState(false);

    const handleSelection = (selection) => {
        setAnswer(selection);

        axios.put("/search/outcome", {
            searchTerm: props.searchTerm,
            documentName: props.documentName,
            documentId: props.documentId,
            outcome: selection,
            documentUrl: props.documentUrl
        })
            .then(response => {
                logger.log('success');
            })
            .catch((err) => {
                logger.error("Error " + err);
            });
    };

    const onFeedbackSubmit = (event) => {
        setAnswer("yes");
    };

    const className = classnames(
        "didyoufind",
        "didYouFindSelector",
        {
            "dark": props.darkMode
        }
    );

    return (
        <div className={className} data-testid="qa-didyoufind">
            {answer === "" ?
                <div>
                    <span className="didYouFindMessageSelector" >
                        Is this information what you were looking for?
                    </span>
                    <span className="didyoufind-form" >
                        <span className="didyoufind-form-field">
                            <label>
                                <input
                                    className="radioYesSelector"
                                    data-testid="qa-didyoufind-yes-radio"
                                    name="input-type-radio"
                                    type="radio"
                                    id="yes"
                                    onClick={() => {
                                        handleSelection("yes")
                                    }}
                                />
                                <span className="didyoufind-label labelYesSelector">
                                    <span className="didyoufind-label-switch" />
                                    Yes
                                </span>
                            </label>
                        </span>
                    </span>
                    <span className="didyoufind-form" >
                        <span className="didyoufind-form-field">
                            <label>
                                <input
                                    className="radioNoSelector"
                                    data-testid="qa-didyoufind-no-radio"
                                    name="input-type-radio"
                                    type="radio"
                                    id="no"
                                    onClick={() => {
                                        handleSelection("no")
                                    }}
                                />
                                <span className="labelNoSelector didyoufind-label">
                                    <span className="didyoufind-label-switch" />
                                    No
                                </span>
                            </label>
                        </span>
                    </span>
                </div>
                : answer === "yes" ?
                    <ThankYou darkMode={props.darkMode} />
                    : <ThankYouNo darkMode={props.darkMode} setShowModal={setShowModal}/>

            }
            <Modal
                darkMode={props.darkMode}
                searchTerm={props.searchTerm}
                documentId={props.documentId}
                documentName={props.documentName}
                documentUrl={props.documentUrl}
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
                onSubmitFeedback={onFeedbackSubmit}
            />
        </div>
    );
};

DidYouFind.propTypes = {
    darkMode: bool,
    documentId: string,
    documentName: string,
    documentUrl: string,
    searchTerm: string
};

DidYouFind.defaultProps = {
    darkMode: false
}

export default DidYouFind;
