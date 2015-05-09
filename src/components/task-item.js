let React = require("react"),
    PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin"),
    { DragDropMixin } = require("react-dnd"),
    taskActions = require("../actions/task-actions"),
    ItemTypes = require("../item-types");

let { PropTypes } = React;

const dragSource = {
    beginDrag(component) {
        return {
            item: {
                id: component.props.id
            }
        };
    }
};

const dropTarget = {
    over(component, item) {
        component.props.moveTask(item.id, component.props.id);
    }
};

module.exports = React.createClass({
    displayName: "TaskItem",
    mixins: [PureRenderMixin, DragDropMixin],
    propTypes: {
        id: PropTypes.string.isRequired,
        moveTask: PropTypes.func.isRequired
    },
    statics: {
        configureDragDrop(register) {
            register(ItemTypes.TASK, {
                dragSource,
                dropTarget
            });
        }
    },
    render() {
        const { isDragging } = this.getDragState(ItemTypes.TASK);
        const opacity = isDragging ? 0 : 1;

        const styles = {
            background: isDragging ? "#ddd" : "transparent",
            opacity: isDragging ? 0.5 : 1
        };

        return (
            <li className="list-group-item"
                style={styles}
                {...this.dragSourceFor(ItemTypes.TASK)}
                {...this.dropTargetFor(ItemTypes.TASK)}
            >
                <div className="row"
                    style={{ opacity }}
                >
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
