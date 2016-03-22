"use strict";

import R from "ramda";

function findTask(tasks, id) {
    return R.findIndex(R.propEq("id", id))(tasks);
}

export default function(state = [], action) {
    switch (action.type) {
        case "ADD_TASK":
            return R.concat(state, action.task);
        case "DELETE_TASK":
            return R.remove(findTask(state, action.id), 1, state);
        case "TOGGLE_TASK_STATUS":
            return R.set(
                    R.compose(
                        R.lensIndex(findTask(state, action.id)),
                        R.lensProp("done")
                    ),
                    action.status,
                    state
                );

        case "UPDATE_TASK":
            return R.set(
                R.compose(
                    R.lensIndex(findTask(state, action.id)),
                    R.lensProp("task")
                ),
                action.task,
                state
            );
        case "CLEAR_COMPLETED":
            return R.filter((t) => !t.done, state);
        case "TOGGLE_ALL":
            return R.map((t) => R.assoc("done", action.status, t), state);
        default:
            return state;
    }
}
