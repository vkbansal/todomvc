import riot from "riot";

<item>
    <li class={editing: editing}>
        <div class="view">
            <input class="toggle" type="checkbox" checked={ done } onchange={ toggle } />
            <label ondblclick={ edit }>{ todo }</label>
            <button class="destroy" onclick={ destory }></button>
        </div>
        <input class="edit" type="text" value={ todo } onkeyup={ change }/>
    </li>

    <script>
        this.editing = false;

        this.destory = () => {
            opts.destory(this.id);
        };

        this.toggle = (e) => {
            opts.toggle(this.id, e.target.checked);
        }

        this.change = (e) => {
            let value = e.target.value;

            if (e.keyCode === 27) {
                this.editing = false;
                e.target.value = this.todo;
                return;
            } else if (e.keyCode === 13 && value !== "") {
                opts.update(this.id, value);
                this.editing = false;
            }
        };

        this.edit = () => {
            this.editing = true;
        }
    </script>
</item>
