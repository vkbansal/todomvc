"use strict";

import React from "react";
import R from "ramda";
import TaskItem from "./task-item";

function uid() {
    return Math.random().toString(36).substr(9);
}

function getClass(visibilityFilter, status) {
    return visibilityFilter === status.toUpperCase() ? "selected" : "";
}

function findTask(tasks, id) {
    return R.findIndex(R.propEq("id", id))(tasks);
}

const TaskForm = React.createClass({
    displayName: "TaskForm",
    getInitialState() {
        return {
            tasks: [],
            visibilityFilter: "ALL"
        };
    },
    handleKeyPress(event) {
        if (event.keyCode === 13) {
            let task = this.input.value;

            this.setState({
                tasks: R.concat(this.state.tasks, {task, done: false, id: uid()})
            });

            this.input.value = "";
        }
    },
    handleFilter(e, status) {
        e.preventDefault();
        this.setState({
            visibilityFilter: status.toUpperCase()
        });
    },
    handleClear() {
        this.setState({
            tasks: R.filter((t) => !t.done, this.state.tasks)
        });
    },
    handleToggleAll(e) {
        let status = e.target.checked;

        this.setState({
            tasks: R.map((t) => R.assoc("done", status, t), this.state.tasks)
        });
    },
    toggleTaskStatus({id, done}) {
        let index = findTask(this.state.tasks, id),
            path = R.compose(
                R.lensIndex(index),
                R.lensProp("done")
            );

        this.setState({
            tasks: R.set(path, done, this.state.tasks)
        });
    },
    deleteTask(id) {
        let index = findTask(this.state.tasks, id);

        this.setState({
            tasks: R.remove(index, 1, this.state.tasks)
        });
    },
    updateTask({ id, task }) {
        let index = findTask(this.state.tasks, id),
            path = R.compose(
                R.lensIndex(index),
                R.lensProp("task")
            );

        this.setState({
            tasks: R.set(path, task, this.state.tasks)
        });
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
                                <TaskItem key={task.id} {...task}
                                    deleteTask={this.deleteTask}
                                    updateTask={this.updateTask}
                                    toggleTaskStatus={this.toggleTaskStatus}/>
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
