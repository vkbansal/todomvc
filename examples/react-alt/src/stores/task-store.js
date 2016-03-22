"use strict";

import R from "ramda";
import alt from "../alt";
import taskActions from "../actions/task-actions";

function findTask(tasks, id) {
    return R.findIndex(R.propEq("id", id))(tasks);
}

class TaskStore {
    constructor() {
        this.bindActions(taskActions);

        this.state = {
            tasks: [],
            visibilityFilter: "ALL"
        };
    }

    onAddTask(task) {
        this.setState({
            tasks: R.concat(this.state.tasks, task)
        });
    }

    onDeleteTask(id) {
        let index = findTask(this.state.tasks, id);

        this.setState({
            tasks: R.remove(index, 1, this.state.tasks)
        });
    }

    onToggleTaskStatus({id, done}) {
        let index = findTask(this.state.tasks, id),
            path = R.compose(
                R.lensIndex(index),
                R.lensProp("done")
            );

        this.setState({
            tasks: R.set(path, done, this.state.tasks)
        });
    }

    onUpdateTask({ id, task }) {
        let index = findTask(this.state.tasks, id),
            path = R.compose(
                R.lensIndex(index),
                R.lensProp("task")
            );

        this.setState({
            tasks: R.set(path, task, this.state.tasks)
        });
    }

    onSetVisibilityFilter(visibilityFilter) {
        this.setState({visibilityFilter});
    }

    onClearCompleted() {
        this.setState({
            tasks: R.filter((t) => !t.done, this.state.tasks)
        });
    }

    toggleAll(status) {
        this.setState({
            tasks: R.map((t) => R.assoc("done", status, t), this.state.tasks)
        });
    }
}

export default alt.createStore(TaskStore);
