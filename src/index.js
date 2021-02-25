import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import React from "react";
import ReactDOM from "react-dom";
import DidYouFind from "./components/DidYouFind/DidYouFind";

const root = document.getElementById("didyoufind");
ReactDOM.render(<DidYouFind {...root.dataset} />, root);
