let React = require("react"),
    taskActions = require("../actions/task-actions"),
    taskStore = require("../stores/task-store"),
    TaskItem = require("./task-item"),
    AltMixin = require("../mixins/alt-mixin");

module.exports = React.createClass({
    displayName: "TaskForm",
    mixins: [AltMixin],
    watchStores: {
        handleUpdate: taskStore
    },
    getInitialState() {
        return taskStore.getState();
    },
    render() {
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <div className="form-group">
                    <input type="text"
                        ref="input"
                        className="form-control"
                        placeholder="Enter a task"
                        onKeyDown={this.handleKeyPress}
                    />
                </div>
                <ul className="list-group">
                    {this.state.tasks.map((task, i) => {
                        return (
                            <TaskItem key={i} tid={i} className="list-group-item" {...task} />
                        );
                    })}
                </ul>
            </div>
        );
    },
    handleKeyPress(event) {
        if (event.keyCode === 13) {
            let task = React.findDOMNode(this.refs.input).value;
            taskActions.addTask({task, done: false});
            React.findDOMNode(this.refs.input).value = "";
        }
    },
    handleUpdate(tasks) {
        this.setState(this.getInitialState());
    }
});