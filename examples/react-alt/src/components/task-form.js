"use strict";

import React from "react";
import taskActions from "../actions/task-actions";
import taskStore from "../stores/task-store";
import TaskItem from "./task-item";

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
            let task = this.input.value;

            taskActions.addTask({task, done: false, id: uuid()});

            this.input.value = "";
        }
    },
    render() {
        let { tasks } = this.state,
            filteredTasks = tasks.filter((t) => !t.get("archived"));

        return (
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input type="text" ref={(c) => (this.input = c)}
                        className="new-todo" placeholder="What needs to be done"
                        onKeyDown={this.handleKeyPress}/>
                </header>
                <ul className="list-group">
                    {filteredTasks.map((task, i) => (
                        <TaskItem key={task.get("id")} className="list-group-item"
                            id={task.get("id")} task={task}/>
                    ))}
                </ul>
            </div>
        );
    }
});

export default TaskForm;
