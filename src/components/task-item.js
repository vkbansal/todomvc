let React = require("react"),
    { PropTypes } = React,
    taskActions = require("../actions/task-actions");

module.exports = React.createClass({
    displayName: "TaskItem",
    propTypes: {
        tid: PropTypes.number.isRequired,
        done: PropTypes.bool
    },
    render() {
        return (
            <li className="list-group-item">
                <div className="row">
                    <div className="col-sm-9">
                        <div className="checkbox">
                            <label>
                                <input ref="status" type="checkbox" checked={this.props.done} onChange={this.handleChange}/>
                                { (this.props.done) ? (
                                    <strike className="text-muted">{this.props.task}</strike>
                                ) : (
                                    <span>{this.props.task}</span>
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
})