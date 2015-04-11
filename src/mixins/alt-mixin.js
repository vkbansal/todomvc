module.exports = {
    componentDidMount() {
        if (!this.watchStores || Object.prototype.toString.call(this.watchStores) !== "[object Object]") {
            throw new Error("Your must provide watchStores");
        }
        this._bindAltListeners();
    },
    componentWillUnmount() {
        this._unbindAltListeners();
    },
    _bindAltListeners() {
        for (let key in this.watchStores) {
            if(this.watchStores.hasOwnProperty(key)) {
                this.watchStores[key].listen(this[key]);
            }
        }
    },
    _unbindAltListeners() {
        for (let key in this.watchStores) {
            if(this.watchStores.hasOwnProperty(key)) {
                this.watchStores[key].unlisten(this[key]);
            }
        }
    }
}
