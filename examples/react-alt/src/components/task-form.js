"use strict";

import React from "react";
import taskActions from "../actions/task-actions";
import taskStore from "../stores/task-store";
import TaskItem from "./task-item";

function uid() {
    return Math.random().toString(36).substr(9);
}

function getClass(visibilityFilter, status) {
    return visibilityFilter === status.toUpperCase() ? "selected" : "";
}

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

            taskActions.addTask({task, done: false, id: uid()});
            this.input.value = "";
        }
    },
    handleFilter(e, status) {
        e.preventDefault();
        taskActions.setVisibilityFilter(status.toUpperCase());
    },
    handleClear() {
        taskActions.clearCompleted();
    },
    handleToggleAll(e) {
        taskActions.toggleAll(e.target.checked);
    },
    render() {
        let { tasks, visibilityFilter } = this.state,
            filteredTasks = tasks,
            tasksLeft = tasks.filter((t) => !t.done).length;

        if (visibilityFilter === "ACTIVE") {
            filteredTasks = filteredTasks.filter((t) => !t.done);
        } else if (visibilityFilter === "COMPLETED") {
            filteredTasks = filteredTasks.filter((t) => t.done);
        }

        return (
            <div>
                <header className="header">
                    <h1>todos</h1>

                    <input type="text" ref={(c) => (this.input = c)}
                        className="new-todo" placeholder="What needs to be done"
                        onKeyDown={this.handleKeyPress}/>
                </header>

                {tasks.length ? (
                    <section className="main">
                        <input className="toggle-all" id="toggle-all" type="checkbox"
                            checked={tasks.every((t) => t.done)} onChange={this.handleToggleAll}/>
                        <label htmlFor="toggle-all">Mark all as complete</label>

                        <ul className="todo-list">
                            {filteredTasks.map((task) => (
                                <TaskItem key={task.id} {...task}/>
                            ))}
                        </ul>
                    </section>
                ) : null}

                {tasks.length ? (
                    <footer className="footer">
                        <span className="todo-count">{`${tasksLeft} item${tasksLeft > 1 ? "s" : ""} left`}</span>

                        <ul className="filters">
                            {["All", "Active", "Completed"].map((status) => (
                                <li key={status.toLowerCase()}>
                                    <a href="#" className={getClass(visibilityFilter, status)}
                                        onClick={(e) => this.handleFilter(e, status)}>
                                    {status}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {tasks.length - tasksLeft > 0 ? (
                            <button className="clear-completed" onClick={this.handleClear}>
                            Clear completed
                            </button>
                        ) : null}
                    </footer>
                ) : null}
            </div>
        );
    }
});

export default TaskForm;
