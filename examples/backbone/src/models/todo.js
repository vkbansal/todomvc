"use strict";

import { Model } from "backbone";

let TodoModel = Model.extend({
    defaults: {
        done: false
    },
    toggle() {
        this.set("done", !this.get("done"));
    }
});

export default TodoModel;
