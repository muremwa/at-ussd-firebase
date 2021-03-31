import dispatcher from '../dispatcher/dispatcher';
import ajax from './ajaxWrapper';
import { namesUrl } from '../index';


export function fetchNames (errorHandler) {
    const dispatchNamesToStore = (data) => {
        dispatcher.dispatch({
            type: 'FETCH_NAMES',
            payload: data
        });
    };

    const options = {
        url: namesUrl,
        responseType: 'json',
        success: (response) => {
            dispatchNamesToStore(response.response)
        },
        error: () => errorHandler(),
    };

    ajax.get(options);

};