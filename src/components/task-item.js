let React = require("react"),
    PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin"),
    taskActions = require("../actions/task-actions");

let { PropTypes } = React;

module.exports = React.createClass({
    displayName: "TaskItem",
    mixins: [PureRenderMixin],
    propTypes: {
        tid: PropTypes.number.isRequired
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
                            <i className="glyphicon glyphicon-trash"/>
                        </button>
                    </div>
                </div>
            </li>
        );
    },
    handleChange() {
        let done = React.findDOMNode(this.refs.status).checked,
            { tid } = this.props;
        taskActions.updateTask({ tid, done });
    },
    handleDelete() {
        taskActions.deleteTask(this.props.tid);
    }
});
