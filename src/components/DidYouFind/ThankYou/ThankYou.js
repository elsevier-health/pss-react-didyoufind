import React from "react";
import "./ThankYou.scss";

const ThankYou = props => {

    const className = props.darkMode ? "didYouFindYes didYouFindYesSelector dark" : "didYouFindYes didYouFindYesSelector";
    //User clicked yes
    return (
        <div className={className}>
            <span className="didYouFindMessageSelector">
                Thanks for responding.
            </span>
        </div>
    );
};

export default ThankYou;
