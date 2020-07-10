import React, {useState, useEffect} from 'react';
import axios from "axios";
import ThankYou from "./ThankYou";
import ThankYouNo from "./ThankYouNo";


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
            body: {
                searchTerm: window.searchTerm,
                documentName: docName,
                documentId: docId,
                outcome: event.target.id
            }
        };
        axios.put("/search/outcome", data)
            .then(response => {
                console.log("success");
            })
            .catch((err) => {
                console.log("Bad shit happened");
            });
    };

    // useEffect(() => {
    // });

    const onFeedbackSubmit = (event) => {
        setAnswer("yes");
    };

    return (
        <div className="didyoufind">
            {answer === "" ?
                <span>
                    Is this information what you were looking for?
                    <span className="didyoufind-label" >
                        <input className="didyoufind-element" type="radio" id="yes" name="dyf" onClick={handleSelection}/>
                        <label className="didyoufind-element"  htmlFor="yes">Yes</label>
                        <input className="didyoufind-element" type="radio" id="no" name="dyf" onClick={handleSelection}/>
                        <label className="didyoufind-element"  htmlFor="no">No</label>
                    </span>

                </span>
                : answer === "yes" ?
                    <ThankYou/>
                    : <ThankYouNo searchTerm={searchTerm} documentId={documentId} documentName={documentName} onFeedbackSubmit={e => onFeedbackSubmit(e)}/>

            }
        </div>
    );


};

export default DidYouFind;
