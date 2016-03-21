"use stict";

import React from "react";
import taskActions from "../actions/task-actions";

let { PropTypes } = React;

const TaskItem = React.createClass({
    displayName: "TaskItem",
    propTypes: {
        id: PropTypes.string.isRequired,
        moveTask: PropTypes.func.isRequired
    },
    handleChange() {
        let done = React.findDOMNode(this.refs.status).checked,
            { id } = this.props;
        taskActions.updateTask({ id: this.props.id, done });
    },
    handleDelete() {
        taskActions.archiveTask(this.props.id);
    },
    render() {
        return (
            <li className="list-group-item">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="checkbox">
                            <label>
                                <input ref="status" type="checkbox" checked={this.props.task.get("done")} onChange={this.handleChange}/>
                                {(this.props.task.get("done")) ? (
                                    <strike className="text-muted">
                                        {this.props.task.get("task")}
                                    </strike>
                                ) : (
                                    <span>
                                        {this.props.task.get("task")}
                                    </span>
                                )}
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-3 text-right">
                        <button className="btn btn-danger" onClick={this.handleDelete}>
                            Archive
                        </button>
                    </div>
                </div>
            </li>
        );
    }
});

export default TaskItem;
