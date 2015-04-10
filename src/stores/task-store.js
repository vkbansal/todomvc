let alt = require("../alt"),
    taskActions = require("../actions/task-actions");

module.exports = alt.createStore({
    displayName: "TaskStore",
    bindListeners: {
        onAddTask: taskActions.addTask,
        onUpdateTask: taskActions.updateTask,
        onDeleteTask: taskActions.deleteTask
    },
    state: {
        tasks: []
    },
    onAddTask(task) {
        this.state.tasks.push(task);
    },
    onUpdateTask(item) {
        let {tid, done} = item;
        this.state.tasks[tid].done = done;
    },
    onDeleteTask(tid) {
        this.state.tasks.splice(tid, 1);
    }
});