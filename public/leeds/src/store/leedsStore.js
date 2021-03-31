import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher';

class LeedsStore extends EventEmitter {
    namesLoaded = false;
    names = [];
    actions = {
        NEW_NAMES: 'names_loaded'
    };

    getNames () {
        return this.names;
    };

    handleActions (action) {
        switch (action.type) {
            case 'FETCH_NAMES':
                this.names = Array.isArray(action.payload)? action.payload: [];
                this.namesLoaded = true;
                this.emit(this.actions.NEW_NAMES);
                break;
        
            default:
                break;
        }
    };
};

const leedsStore = new LeedsStore();
dispatcher.register(leedsStore.handleActions.bind(leedsStore));
export default leedsStore;