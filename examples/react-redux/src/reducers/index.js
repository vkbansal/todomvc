"use strict";

import { combineReducers } from "redux";


import tasks from "./task-reducer";
import visibilityFilter from "./visibility-reducer";

let rootReducer = combineReducers({
    tasks, visibilityFilter
});

export default rootReducer;
