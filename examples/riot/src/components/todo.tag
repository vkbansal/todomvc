import riot from "riot";

import "./item.tag";

<todo>
    <header class="header">
        <h1>todos</h1>
        <input type="text" class="new-todo" placeholder="What needs to be done" onkeyup={ addTask }/>
    </header>
    <section if={items.length} class="main">
        <input class="toggle-all" type="checkbox" onchange={ toggleAll } />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <item each={ currentItems() } toggle={ toggleTaskStatus }
                destroy={ deleteTask } update={ updateTask }></item>
        </ul>
    </section>
    <footer id="footer" class="footer" if={items.length > 0}>
        <span class="todo-count">{active().length} {active().length === 1 ? "item" : "items"} left</span>

        <ul id="filters" class="filters">
            <li>
                <a href="#" class={selected: filter === ""} onclick={ setfilter }>
                    All
                </a>
            </li>
            <li>
                <a href="#active" class={selected: filter === "active"} onclick={ setfilter }>
                    Active
                </a>
            </li>
            <li>
                <a href="#completed" class={selected: filter === "completed"} onclick={ setfilter }>
                    Completed
                </a>
            </li>
        </ul>
        <button if={completed()} class="clear-completed" onclick= { clearCompleted }>
        Clear completed
        </button>
    </footer>

    <script>
    this.items = [];
    this.filter = "";

    this.completed = () => {
        return this.items.filter((i) => i.done);
    };

    this.active = () => {
        return this.items.filter((i) => !i.done);
    };

    this.currentItems = () => {
        switch (this.filter) {
            case "active":
                return this.active();
            case "completed":
                return this.completed();
            default:
                return this.items;
        }
    };

    this.setfilter = (e) => {
        let filter = e.target.getAttribute("href").substr(1);
        this.filter = filter;
    };

    this.addTask = (e) => {
        let val = e.target.value;

        if (e.keyCode === 13 && e.target.value !== "") {
            this.items.push({
                todo: val,
                done: false,
                id: Math.random().toString(36).substr(7)
            });
            e.target.value = "";
        }
    };

    this.toggleTaskStatus = (id, done) => {
        let index = this.items.findIndex((i) => i.id == id);

        if (index === -1) return;

        this.items[index].done = done;
    };

    this.deleteTask = (id) => {
        let index = this.items.findIndex((i) => i.id == id);

        if (index === -1) return;

        this.items.splice(index, 1);
    };

    this.updateTask = (id, value) => {
        let index = this.items.findIndex((i) => i.id == id);

        if (index === -1) return;

        this.items[index].todo = value;
    };

    this.clearCompleted = () => {
        this.items = this.active();
    };

    this.toggleAll = (e) => {
        let done = e.target.checked;

        this.items.forEach((item) => (item.done = done));
    };
    </script>
</todo>
