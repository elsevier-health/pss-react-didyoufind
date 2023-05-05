import React from "react";
import classnames from "classnames";
import { bool, func } from "prop-types";

import "./ThankYouNo.scss";
import "@els/els-styleguide-core/images/icon-sprite-hmds.svg";

const ThankYouNo = props => {
    //user clicked no
    const className = classnames(
        "didYouFindNo",
        "didYouFindNoSelector",
        {
            "dark": props.darkMode
        }
    );

    return (
        <div className={className} data-testid="qa-didyoufind-thankyouno">
            <span className="didYouFindMessageSelector">
                Thank you.
                <button className="didyoufind-feedback-btn" onClick={ () => { props.setShowModal(true) }}>
                    <svg className="didyoufind-icon-note">
                        <use href={"#icon-sprite-hmds_icon__note"} />
                    </svg>
                    <span className="didYouFindQuestionButtonSelector">
                        What were you looking for?
                    </span>
                </button>
            </span>

        </div>
    );
};

ThankYouNo.propTypes = {
    darkMode: bool,
    setShowModal: func.isRequired
};

ThankYouNo.defaultProps = {
    darkMode: false
}

export default ThankYouNo;
