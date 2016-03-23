"use strict";

import { View } from "backbone";
import _ from "underscore";
import $ from "jquery";

import Todos from "../collections/todos";
import TodoView from "./task-item";

function uid() {
    return Math.random().toString(36).substr(9);
}

let TaskFormView = View.extend({
    el: "#todoapp",
    footerTemplate: _.template($("#footer-template").html()),
    events: {
        "keypress #new-todo": "createOnEnter",
        "change #toggle-all": "toggleAllStatus",
        "click #clear-completed": "clearCompleted",
        "click #filters a": "filterTasks"
    },
    initialize() {
        this.$input = this.$("#new-todo");
        this.$allCheckbox = this.$("#toggle-all");
        this.$list = this.$("#todo-list");
        this.$main = this.$("#main");
        this.$footer = this.$("#footer");
        this.filter = "";

        this.todos = new Todos();

        this.listenTo(this.todos, "add", this.addOne);
        this.listenTo(this.todos, "all", this.render);
    },
    render() {
        let completed = this.todos.completed().length,
            active = this.todos.active().length;

        if (this.todos.length) {
            this.$main.show();
            this.$footer.show();
            this.$footer.html(this.footerTemplate({
                completed,
                active,
                filter: this.filter
            }));
        } else {
            this.$main.hide();
            this.$footer.hide();
        }

        this.$allCheckbox.prop("checked", !active);
    },
    createOnEnter(e) {
        let val = this.$input.val().trim();

        if (e.keyCode === 13 && val) {
            this.todos.add({
                task: val,
                id: uid()
            });
            this.$input.val("");
        }
    },
    addOne(todo) {
        let view = new TodoView({model: todo});

        this.$list.append(view.render().$el);
    },
    toggleAllStatus(e) {
        let completed = e.target.checked;

        this.todos.forEach((todo) => todo.set("done", completed));
    },
    clearCompleted() {
        this.todos.completed().forEach((todo) => todo.trigger("destroy", todo));
        return false;
    },
    filterTasks(e) {
        e.preventDefault();

        let filter = $(e.target).attr("href").substring(1);

        this.filter = filter;
        this.todos.forEach((todo) => todo.trigger("visible", filter));
    }
});

export default TaskFormView;
