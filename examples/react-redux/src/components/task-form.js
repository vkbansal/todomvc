"use strict";

import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/task-actions";
import TaskItem from "./task-item";

function getClass(visibilityFilter, status) {
    return visibilityFilter === status.toUpperCase() ? "selected" : "";
}

const TaskForm = React.createClass({
    displayName: "TaskForm",
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },
    handleKeyPress(event) {
        if (event.keyCode === 13) {
            let task = this.input.value;

            this.props.dispatch(actions.addTask({
                task,
                done: false,
                id: Math.random().toString(36).substr(2)
            }));
            this.input.value = "";
        }
    },
    handleFilter(e, status) {
        e.preventDefault();
        this.props.dispatch(actions.setVisibilityFilter(status.toUpperCase()));
    },
    handleClear() {
        this.props.dispatch(actions.clearCompleted());
    },
    handleToggleAll(e) {
        this.props.dispatch(actions.toggleAll(e.target.checked));
    },
    render() {
        let { tasks, visibilityFilter, dispatch } = this.props,
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
                                <TaskItem key={task.id} dispatch={dispatch} {...task}/>
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

export default connect((state) => state)(TaskForm);
