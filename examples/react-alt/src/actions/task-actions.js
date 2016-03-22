"use strict";

import alt from "../alt";

class TaskActions {
    constructor() {
        this.generateActions(
            "addTask",
            "deleteTask",
            "toggleTaskStatus",
            "updateTask",
            "setVisibilityFilter",
            "clearCompleted",
            "toggleAll"
        );
    }
}

export default alt.createActions(TaskActions);
