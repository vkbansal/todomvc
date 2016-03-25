"use stict";

import React from "react";
import classnames from "classnames";

let { PropTypes } = React;

const TaskItem = React.createClass({
    displayName: "TaskItem",
    propTypes: {
        deleteTask: PropTypes.func.isRequired,
        done: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        task: PropTypes.string.isRequired,
        toggleTaskStatus: PropTypes.func.isRequired,
        updateTask: PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            editing: false
        };
    },
    handleToggle(e) {
        let done = e.target.checked,
            { id } = this.props;

        this.props.toggleTaskStatus({ id, done });
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
                { id } = this.props;

            this.props.updateTask({task, id});
            this.handleClose();
        } else if (event.keyCode === 27) {
            this.handleClose();
        }
    },
    handleDelete() {
        this.props.deleteTask(this.props.id);
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
