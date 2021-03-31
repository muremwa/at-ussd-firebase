import dispatcher from '../dispatcher/dispatcher';


export function fetchNames () {
    const names = [
        {
            name: "Jane Fonda Action",
            progress: "6 months",
            status: "Okay",
            statusNum: 1
        },
        {
            name: "Esther Wainaina",
            progress: "2 months",
            status: "Semi-Okay",
            statusNum: 2
        },
        {
            name: "Carol Wangui Njogu",
            progress: "6 months",
            status: "Not-Okay",
            statusNum: 3
        }
    ];

    const dispatchNamesToStore = (data) => {
        dispatcher.dispatch({
            type: 'FETCH_NAMES',
            payload: data
        });
    };

    setTimeout(() => {
        dispatchNamesToStore(names);
    }, 3000)

};