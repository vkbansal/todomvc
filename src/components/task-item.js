let React = require("react"),
    { DragSource, DropTarget } = require("react-dnd"),
    taskActions = require("../actions/task-actions"),
    ItemTypes = require("../item-types"),
    flow = require("lodash/function/flow");

let { PropTypes } = React;

const dragSpec = {
    beginDrag(props) {
        return {id: props.id};
    }
};

const dropSpec = {
    hover(props, monitor) {
        props.moveTask(monitor.getItem().id, props.id);
    }
};

const TaskItem = React.createClass({
    displayName: "TaskItem",
    propTypes: {
        id: PropTypes.string.isRequired,
        moveTask: PropTypes.func.isRequired
    },
    render() {
        let {connectDragSource, connectDropTarget, isDragging } = this.props;
        const opacity = isDragging ? 0 : 1;

        const styles = {
            background: isDragging ? "#ddd" : "transparent",
            opacity: isDragging ? 0.5 : 1
        };

        return flow(connectDropTarget, connectDragSource)(
            <li className="list-group-item" style={styles}>
                <div className="row" style={{ opacity }}>
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
            { id } = this.props;
        taskActions.updateTask({ id: this.props.id, done });
    },
    handleDelete() {
        taskActions.deleteTask(this.props.id);
    }
});

module.exports = flow(
    DragSource(
        ItemTypes.TASK,
        dragSpec,
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        })
    ),
    DropTarget(
        ItemTypes.TASK,
        dropSpec,
        (connect/*, monitor*/) => ({
            connectDropTarget: connect.dropTarget()
        })
    )
)(TaskItem);
