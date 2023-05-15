import React from "react";
import classnames from "classnames";
import { bool } from "prop-types";

import "./ThankYou.scss";

const ThankYou = props => {

    const className = classnames(
        "didYouFindYes",
        "didYouFindYesSelector",
        {
            "dark": props.darkMode
        }
    );

    //User clicked yes
    return (
        <div className={className} data-testid="qa-didyoufind-thankyou">
            <span className="didYouFindMessageSelector">
                Thanks for responding.
            </span>
        </div>
    );
};

ThankYou.propTypes = {
    dark: bool
};

ThankYou.defaultProps = {
    dark: false
}

export default ThankYou;
