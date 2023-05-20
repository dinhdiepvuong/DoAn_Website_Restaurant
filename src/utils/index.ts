import moment from 'moment';

export enum GENDER {
    MALE = 0,
    FEMALE = 1
}

export const ORDER_STATUS = {
    NOT_USE: 0,
    USING: 1,
    USED: 2,
    CANCELED: 3
};

export enum ENTITY_STATUS {
    ACTIVATED = 0,
    DEACTIVATED = 1
}

export const getDate = (now: Date): { start: Date; end: Date; name: string } => {
    const start = moment(now).startOf('d').add(7, 'hour');
    const end = moment(now).endOf('d').add(7, 'hour');

    return {
        start: new Date(start.format()),
        end: new Date(end.format()),
        name: start.format('DD/MM/YYYY')
    };
};

export const getDayOfWeek = (now: Date, unit: number): { start: Date; end: Date; name: string } => {
    const start = moment(now).startOf('week').add('d', unit);
    const end = moment(now).startOf('week').endOf('d').add('d', unit);

    return {
        start: new Date(start.format()),
        end: new Date(end.format()),
        name: start.format('DD/MM/YYYY')
    };
};

export const getRangeWeek = (now: Date): { start: Date; end: Date; name: string } => {
    const start = moment(now).startOf('week').add(7, 'hour');
    const end = moment(now).endOf('week').endOf('d').add(7, 'hour');

    return {
        start: new Date(start.format()),
        end: new Date(end.format()),
        name: start.format('DD/MM/YYYY')
    };
};

export const getRangeMonth = (now: Date): { start: Date; end: Date; name: string } => {
    const start = moment(now).startOf('month').add(7, 'hour');
    const end = moment(now).endOf('month').endOf('d').add(7, 'hour');

    return {
        start: new Date(start.format()),
        end: new Date(end.format()),
        name: start.format('DD/MM/YYYY')
    };
};
