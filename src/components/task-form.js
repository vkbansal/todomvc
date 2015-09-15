let React = require("react"),
    taskActions = require("../actions/task-actions"),
    taskStore = require("../stores/task-store"),
    TaskItem = require("./task-item");

import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd/modules/backends/HTML5";

function uuid() {
    return Math.random().toString(36).substring(3);
}

const TaskForm = React.createClass({
    displayName: "TaskForm",
    getInitialState() {
        return taskStore.getState();
    },
    componentDidMount() {
        taskStore.listen(this.handleUpdate);
    },
    componentWillUnmount() {
        taskStore.unlisten(this.handleUpdate);
    },
    handleUpdate() {
        this.setState(this.getInitialState());
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
                            <TaskItem
                                key={task.get("id")}
                                id={task.get("id")}
                                className="list-group-item"
                                task={task}
                                moveTask={this.handleReorder}
                            />
                        );
                    })}
                </ul>
            </div>
        );
    },
    handleKeyPress(event) {
        if (event.keyCode === 13) {
            let task = React.findDOMNode(this.refs.input).value;
            taskActions.addTask({task, done: false, id: uuid()});
            React.findDOMNode(this.refs.input).value = "";
        }
    },
    handleUpdate() {
        this.setState(this.getInitialState());
    },
    handleReorder(source, target) {
        taskActions.reorderTasks({source, target});
    }
});

module.exports = DragDropContext(HTML5Backend)(TaskForm);
