/*document.write("its work");
require("../js/greeter.js");
require("../css/test.css");*/


/*var greeter = require("./greeter.js");
document.getElementById("root").appendChild(greeter());*/

import React from 'react';
import {render} from 'react-dom';
import greeter from './greeter.js';
import "../css/test.css";
import styles from "../css/greeter.css";

document.getElementById("root").appendChild(greeter());