"use strict";

import { createStore } from "redux";
import rootReducer from "../reducers";

export default function(initialState) {
    let store = createStore(rootReducer, initialState);

    return store;
}
