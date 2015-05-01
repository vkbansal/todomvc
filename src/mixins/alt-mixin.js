module.exports = {
    getInitialState() {
        if (!this.getAltState || typeof this.getAltState !== "function") {
            throw new Error("Your must provide getAltState");
        }
        return this.getAltState();
    },
    componentDidMount() {
        if (!this.watchStores || !Array.isArray(this.watchStores)) {
            throw new Error("Your must provide watchStores");
        }
        this._bindAltListeners();
    },
    componentWillUnmount() {
        this._unbindAltListeners();
    },
    handleAltStoresUpdate() {
        this.setState(this.getAltState());
    },
    _bindAltListeners() {
        for (let i = 0, l = this.watchStores.length; i < l; i++) {
            this.watchStores[i].listen(this.handleAltStoresUpdate);
        }
    },
    _unbindAltListeners() {
        for (let i = 0, l = this.watchStores.length; i < l; i++) {
            this.watchStores[i].unlisten(this.handleAltStoresUpdate);
        }
    }
};
