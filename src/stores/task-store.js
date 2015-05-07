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
            onDeleteTask: taskActions.deleteTask,
            onReorderTasks: taskActions.reorderTasks
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
        const { id, done } = item;
        const { tasks } = this.state;

        let index = tasks.findIndex( t => t.get(id) === id);

        this.setState({
            tasks: tasks.setIn([index, "done"], done)
        });
    }

    onDeleteTask(id) {
        const { tasks } = this.state;

        let index = tasks.findIndex( t => t.get(id) === id);

        this.setState({
            tasks: tasks.splice(index, 1)
        });
    }

    onReorderTasks(data) {
        const { source, target } = data;
        const { tasks } = this.state;

        let sourceIndex = tasks.findIndex( t => t.get(id) === source);
        let targetIndex = tasks.findIndex( t => t.get(id) === target);

        this.setState({
            tasks: tasks.splice(sourceIndex, 1)
        });
    }
}

module.exports = alt.createStore(TaskStore);
