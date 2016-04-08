"use strict";

import assign from "object-assign";

export default function(state = [], action) {
    switch (action.type) {
        case "ADD_TASK":
            return state.concat(action.task);
        case "DELETE_TASK":
            return state.filter((t) => t.id !== action.id);
        case "TOGGLE_TASK_STATUS":
            return state.map((t) => (
                t.id === action.id
                ? assign({}, t, {done: action.status})
                : t
            ));
        case "UPDATE_TASK":
            return state.map((t) => (
                t.id === action.id
                ? assign({}, t, {task: action.task})
                : t
            ));
        case "CLEAR_COMPLETED":
            return state.filter((t) => !t.done);
        case "TOGGLE_ALL":
            return state.map((t) => assign({}, t, {done: action.status}));
        default:
            return state;
    }
}
