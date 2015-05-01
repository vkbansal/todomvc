let alt = require("../alt");

class TaskActions {
    constructor() {
        this.generateActions("addTask", "deleteTask", "updateTask");
    }
}

module.exports = alt.createActions(TaskActions);
