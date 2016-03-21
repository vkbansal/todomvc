"use strict";

import alt from "../alt";

class TaskActions {
    constructor() {
        this.generateActions(
            "addTask",
            "deleteTask",
            "archiveTask",
            "updateTask",
            "reorderTasks"
        );
    }
}

export default alt.createActions(TaskActions);
