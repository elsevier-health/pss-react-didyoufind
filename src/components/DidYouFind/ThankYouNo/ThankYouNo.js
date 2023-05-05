import React from "react";
import classnames from "classnames";
import { bool, func } from "prop-types";

import "./ThankYouNo.scss";
import "@els/els-styleguide-core/images/icon-sprite.svg";

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
                <button
                    className="didyoufind-feedback-btn u-els-anchorize c-els-link c-els-link--with-icon"
                    onClick={ () => { props.setShowModal(true) }}
                >
                    <svg className="didyoufind-icon-note c-els-link__icon o-els-icon-svg o-els-icon-svg--1x o-els-icon-svg--middle">
                        <use href={"#icon-sprite-hmds_icon__note"} />
                    </svg>
                    <span className="didYouFindQuestionButtonSelector c-els-link__text">
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
