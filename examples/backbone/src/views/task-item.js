"use stict";

import { View } from "backbone";
import _ from "underscore";
import $ from "jquery";

let TaskItemView = View.extend({
    tagName: "li",
    template: _.template($("#todo-item").html()),
    events: {
        "click .toggle": "toggleCompleted",
        "dblclick label": "edit",
        "click .destroy": "clear",
        "keypress .edit": "updateOnEnter",
        "keydown .edit": "revertOnEscape",
        "blur .edit": "close"
    },
    initialize() {
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "destroy", this.remove);
        this.listenTo(this.model, "visible", this.toggleVisible);
    },
    render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass("completed", this.model.get("done"));
        this.$input = this.$(".edit");
        return this;
    },
    toggleCompleted() {
        this.model.toggle();
    },
    toggleVisible(filter) {
        this.$el.toggleClass("hidden", this.isHidden(filter));
    },
    isHidden(filter) {
        return this.model.get("done")
            ? filter === "active"
            : filter === "completed";
    },
    edit() {
        this.$el.addClass("editing");
        this.$input.focus();
    },
    updateOnEnter(e) {
        if (e.keyCode === 13) {
            this.close();
        }
    },
    revertOnEscape(e) {
        if (e.keyCode === 27) {
            this.$el.removeClass("editing");
            this.$input.val(this.model.get("task"));
        }
    },
    close() {
        if (!this.$editing.hasClass("editing")) {
            return;
        }

        let value = this.$input.val().trim();

        if (value) {
            this.model.set("task", value);
        } else {
            this.clear();
        }

        this.$el.removeClass("editing");
    },
    clear() {
        this.model.trigger("destroy", this.model);
    }
});

export default TaskItemView;
