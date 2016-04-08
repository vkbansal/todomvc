"use strict";

import assign from "object-assign";
import alt from "../alt";
import taskActions from "../actions/task-actions";

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
            tasks: this.state.tasks.concat(task)
        });
    }

    onDeleteTask(id) {
        this.setState({
            tasks: this.state.tasks.filter((t) => t.id !== id)
        });
    }

    onToggleTaskStatus({id, done}) {
        let tasks = this.state.tasks
                        .map((t) => (t.id === id
                            ? assign({}, t, {done})
                            : t
                        ));

        this.setState({ tasks });
    }

    onUpdateTask({ id, task }) {
        let tasks = this.state.tasks
                        .map((t) => (t.id === id
                            ? assign({}, t, {task})
                            : t
                        ));

        this.setState({ tasks });
    }

    onSetVisibilityFilter(visibilityFilter) {
        this.setState({visibilityFilter});
    }

    onClearCompleted() {
        this.setState({
            tasks: this.state.tasks.filter((t) => !t.done)
        });
    }

    toggleAll(done) {
        this.setState({
            tasks: this.state.tasks.map((t) => assign({}, t, {done}))
        });
    }
}

export default alt.createStore(TaskStore);
