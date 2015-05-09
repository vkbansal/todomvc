let alt = require("../alt");

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

module.exports = alt.createActions(TaskActions);
