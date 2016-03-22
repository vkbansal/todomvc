"use strict";

export function addTask(task) {
    return {
        type: "ADD_TASK",
        task
    };
}

export function deleteTask(id) {
    return {
        type: "DELETE_TASK",
        id
    };
}

export function toggleTaskStatus(id, status) {
    return {
        type: "TOGGLE_TASK_STATUS",
        id,
        status
    };
}

export function updateTask(id, task) {
    return {
        type: "UPDATE_TASK",
        id,
        task
    };
}

export function setVisibilityFilter(filter) {
    return {
        type: "SET_VISIBILITY_FILTER",
        filter
    };
}

export function clearCompleted() {
    return {
        type: "CLEAR_COMPLETED"
    };
}

export function toggleAll(status) {
    return {
        type: "TOGGLE_ALL",
        status
    };
}
