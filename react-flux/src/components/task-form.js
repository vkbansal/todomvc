"use strict";

import React from "react";
import taskActions from "../actions/task-actions";
import taskStore from "../stores/task-store";

const TaskForm = React.createClass({
    displayName: "TaskForm",
    getInitialState() {
        return taskStore.getState();
    },
    componentDidMount() {
        taskStore.listen(this.handleUpdate);
    },
    componentWillUnmount() {
        taskStore.unlisten(this.handleUpdate);
    },
    handleUpdate() {
        this.setState(this.getInitialState());
    },
    handleKeyPress(event) {
        if (event.keyCode === 13) {
            let task = React.findDOMNode(this.refs.input).value;
            taskActions.addTask({task, done: false, id: uuid()});
            React.findDOMNode(this.refs.input).value = "";
        }
    },
    render() {
        let { tasks } = this.state,
             filteredTasks = tasks.filter(t => !t.get("archived"));
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <div className="form-group">
                    <input type="text"
                        ref="input"
                        className="form-control"
                        placeholder="Enter a task"
                        onKeyDown={this.handleKeyPress}
                    />
                </div>
                <ul className="list-group">
                    {filteredTasks.map((task, i) => {
                        return (
                            <TaskItem key={task.get("id")} className="list-group-item"
                                id={task.get("id")} task={task} moveTask={this.handleReorder}/>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

export default TaskForm;
