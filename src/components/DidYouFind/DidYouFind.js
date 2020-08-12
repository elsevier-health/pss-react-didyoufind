import React, { useState } from 'react';
import axios from "axios";
import ThankYou from "./ThankYou/ThankYou";
import ThankYouNo from "./ThankYouNo/ThankYouNo";
import "./DidYouFind.scss";


const DidYouFind = (props) => {

    const [answer, setAnswer] = useState("");
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ documentId, setDocumentId] = useState("");
    const [ documentName, setDocumentName] = useState("");

    const handleSelection = (event) => {
        setAnswer(event.target.id);

        const [e] = document.getElementsByClassName("documentContainerSelector");
        const docId = e.getAttribute("data-document-id");
        const docName = e.getAttribute("data-slug");

        setSearchTerm(window.searchTerm);
        setDocumentId(docId);
        setDocumentName(docName);

        const data = {
            searchTerm: window.searchTerm,
            documentName: docName,
            documentId: docId,
            outcome: event.target.id
        };

        axios.put("/search/outcome", data)
            .then(response => {
                if (console) {
                    console.log("success");
                }
            })
            .catch((err) => {
                if (console) {
                    console.log("Error " + err);
                }
            });
    };


    const onFeedbackSubmit = (event) => {
        setAnswer("yes");
    };

    return (
        <div className="didyoufind didYouFindSelector">
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
                                    name="input-type-radio"
                                    type="radio"
                                    id="yes"
                                    onClick={handleSelection} />
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
                                    name="input-type-radio"
                                    type="radio"
                                    id="no"
                                    onClick={handleSelection} />
                                <span className="labelNoSelector didyoufind-label">
                                    <span className="didyoufind-label-switch" />
                                    No
                                </span>
                            </label>
                        </span>
                    </span>
                </div>
                : answer === "yes" ?
                    <ThankYou/>
                    : <ThankYouNo searchTerm={searchTerm} documentId={documentId} documentName={documentName} onFeedbackSubmit={e => onFeedbackSubmit(e)}/>

            }
        </div>
    );


};

export default DidYouFind;
