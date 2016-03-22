"use strict";

const whiteList = ["ALL", "ACTIVE", "COMPLETED"];

export default function(state = whiteList[0], action) {
    return action.type === "SET_VISIBILITY_FILTER" && whiteList.indexOf(action.filter) > -1
        ? action.filter
        : whiteList[0];
}
