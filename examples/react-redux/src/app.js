"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./stores/configure-stores";

import TaskForm from "./components/task-form.js";

const store = configureStore();

const App = (
    <Provider store={store}>
        <TaskForm/>
    </Provider>
);

ReactDOM.render(App, document.getElementById("todoapp"));
