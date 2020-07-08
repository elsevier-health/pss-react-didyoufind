import React, {useState, useEffect} from 'react';
import axios from "axios";
import ThankYou from "./ThankYou";
import ThankYouNo from "./ThankYouNo";


const DidYouFind = (props) => {

    const [answer, setAnswer] = useState("");

    const handleSelection = (event) => {
        setAnswer(event.target.id);

        const [e] = document.getElementsByClassName("documentContainerSelector");
        const docId = e.getAttribute("data-document-id");
        const docName = e.getAttribute("data-slug");


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


    return (
        <div className="didyoufind">
            {answer === "" ?
                <span>
                    Is this information what you were looking for?
                    <span className="didyoufind-label">
                        <input  type="radio" id="yes" name="dyf" onClick={handleSelection}/>
                        <label  htmlFor="yes">Yes</label>
                        <input  type="radio" id="no" name="dyf" onClick={handleSelection}/>
                        <label  htmlFor="no">No</label>
                    </span>

                </span>
                : answer === "yes" ?
                    <ThankYou/>
                    : <ThankYouNo/>

            }
        </div>
    );


};

export default DidYouFind;
