"use strict";

let alt = require("../alt"),
    { List, Map } = require("immutable"),
    taskActions = require("../actions/task-actions");

class TaskStore {
    constructor() {
        this.bindActions(taskActions);
        this.tasks = List([]);
    }

    onAddTask(task) {
        this.setState({
            tasks: this.tasks.push(Map(task))
        });
    }

    onUpdateTask(item) {
        console.log(item);
        const { id, done } = item;

        let index = this.tasks.findIndex( t => t.get("id") === id);

        this.setState({
            tasks: this.tasks.setIn([index, "done"], done)
        });
    }

    onDeleteTask(id) {
        let index = this.tasks.findIndex( t => t.get("id") === id);

        this.setState({
            tasks: this.tasks.delete(index)
        });
    }

    onReorderTasks(data) {
        const { source, target } = data;

        let sourceIndex = this.tasks.findIndex( t => t.get("id") === source),
            targetIndex = this.tasks.findIndex( t => t.get("id") === target);

        this.setState({
            tasks: this.tasks.delete(sourceIndex)
                        .splice(targetIndex, 0, this.tasks.get(sourceIndex))
        });
    }

    onArchiveTask(id) {
        let index = this.tasks.findIndex( t => t.get("id") === id);

        this.setState({
            tasks: this.tasks.setIn([index, "archived"], true)
        });
    }
}

module.exports = alt.createStore(TaskStore);
