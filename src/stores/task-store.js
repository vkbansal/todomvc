let alt = require("../alt"),
    immutable = require("alt/utils/immutableUtil"),
    { List, Map } = require("immutable"),
    taskActions = require("../actions/task-actions");

@immutable
class TaskStore {
    constructor() {
        this.bindListeners({
            onAddTask: taskActions.addTask,
            onUpdateTask: taskActions.updateTask,
            onDeleteTask: taskActions.deleteTask
        });

        this.state = {
            tasks: List([])
        };
    }

    onAddTask(task) {
        const { tasks } = this.state;
        this.setState({
            tasks: tasks.push(Map(task))
        });
    }

    onUpdateTask(item) {
        const { tid, done } = item;
        const { tasks } = this.state;

        let currentTask = tasks.get(tid);

        currentTask = currentTask.set("done", done);

        this.setState({
            tasks: tasks.splice(tid, 1, currentTask)
        });
    }

    onDeleteTask(tid) {
        const { tasks } = this.state;

        this.setState({
            tasks: tasks.splice(tid, 1)
        });
    }
}

module.exports = alt.createStore(TaskStore);
