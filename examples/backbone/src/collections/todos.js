"use strict";

import { Collection } from "backbone";
import TodoModel from "../models/todo";

let TodoCollection = Collection.extend({
    model: TodoModel,
    active() {
        return this.where({done: false});
    },
    completed() {
        return this.where({done: true});
    }
});

export default TodoCollection;
