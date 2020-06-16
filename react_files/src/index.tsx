import * as React from "react";
import * as ReactDOM from "react-dom";

import { Column } from "./components/column";

let location = {name: "Italy"};

ReactDOM.render(
    <Column location={location} />,
    document.getElementById("main")
);