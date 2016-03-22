"use stict";

import React from "react";
import classnames from "classnames";

import * as actions from "../actions/task-actions";

let { PropTypes } = React;

const TaskItem = React.createClass({
    displayName: "TaskItem",
    propTypes: {
        id: PropTypes.string.isRequired,
        moveTask: PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            editing: false
        };
    },
    handleToggle(e) {
        let done = e.target.checked,
            { id, dispatch } = this.props;

        dispatch(actions.toggleTaskStatus(id, done));
    },
    handleEditing() {
        this.setState({editing: true});
    },
    handleClose() {
        this.setState({editing: false});
    },
    handleKeyPress(event) {
        if (event.keyCode === 13) {
            let task = this.input.value,
                { id, dispatch } = this.props;

            dispatch(actions.updateTask(id, task));
            this.handleClose();
        } else if (event.keyCode === 27) {
            this.handleClose();
        }
    },
    handleDelete() {
        this.props.dispatch(actions.deleteTask(this.props.id));
    },
    render() {
        let liClassName = classnames({
            completed: this.props.done,
            editing: this.state.editing
        });

        return (
            <li className={liClassName}>
                <div className="view">
                    <input className="toggle" type="checkbox"
                        checked={this.props.done} onChange={this.handleToggle}/>
                    <label onDoubleClick={this.handleEditing}>{this.props.task}</label>
                    <button className="destroy" onClick={this.handleDelete}/>
                </div>
                <input ref={(c) => (this.input = c)} className="edit" type="text"
                    defaultValue={this.props.task} onBlur={this.handleClose}
                    onKeyDown={this.handleKeyPress}/>
            </li>
        );
    }
});

export default TaskItem;
