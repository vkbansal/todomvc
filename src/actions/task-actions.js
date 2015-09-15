"use strict";

import alt from "../alt";

class TaskActions {
    constructor() {
        this.generateActions(
            "addTask",
            "deleteTask",
            "updateTask",
            "reorderTasks"
        );
    }
}

export default alt.createActions(TaskActions);
