class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.states  = config.states
        this.state   = config.initial
        this.initial = config.initial
        this.history = []
        this.revers = []
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.states[state]) {
            this.history.push(this.state)
            this.state = state
            this.revers = []
        } else {
            throw new Error
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.states[this.state].transitions[event]) {
            this.history.push(this.state)
            this.state = this.states[this.state].transitions[event]
            this.revers = []
        } else {
            throw new Error
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initial
        this.history = []
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = []

        for (let state in this.states) {
            if (!event || this.states[state].transitions[event]) {
                states.push(state)
            }
        }

        return states
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length) {
            this.revers.push(this.state)
            this.state = this.history.pop()

            return true
        }

        return false
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.revers.length) {
            this.history.push(this.state)
            this.state = this.revers.pop()

            return true
        }

        return false
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history.length = 0
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
