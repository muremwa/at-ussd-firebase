export function cleanNames (name = {}) {
    const [hasName, hasDate, hasStatus] = [name.hasOwnProperty('name'), name.hasOwnProperty('dueDate'), name.hasOwnProperty('status')];

    const progress = (() => {
        const milliMonth = 1000 * 60 * 60 * 24 * 7 * 4;
        const today = new Date();
        const dueDate = hasDate? new Date(name.dueDate): new Date();
        return 9 - Math.floor((dueDate - today) / milliMonth);
    })();

    const status = hasStatus? name.status: 0;

    return {
        name: hasName? name.name: '*',
        progress: hasDate? `${progress} month${progress > 1? 's': ''}`: '*',
        statusNum: status,
        status: status === 0? 'Okay': status === 1? 'semi-okay': 'not-okay',
        phone: name.phoneNumber
    };
};