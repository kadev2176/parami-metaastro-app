export const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

export const errorParse = (error: string) => {
    let header: string = '';
    let subHeader: string = '';
    let body: any;
    let method: string = '';
    let transaction: any = '';
    let code: string = '';
    let version: string = '';
    const headerArray = error.match(`.*?;`);
    const subHeaderArray = error.match(`; .*?\\(`);
    const bodyArray = error.match(`error=.*?\\}, method`);
    const methodArray = error.match(`method=.*?,`);
    const transactionArray = error.match(`transaction=.*?}, code`);
    const codeArray = error.match(`code=.*?,`);
    const versionArray = error.match(`version=.*?\\)`);
    if (headerArray) {
        header = headerArray[0].slice(0, -1);
    }
    if (subHeaderArray) {
        subHeader = subHeaderArray[0].slice(2, -1);
    }
    if (bodyArray) {
        const bodyStr = bodyArray[0].slice(6, -8);
        body = JSON.parse(bodyStr);
    }
    if (methodArray) {
        method = methodArray[0].slice(8, -2);
    }
    if (transactionArray) {
        transaction = transactionArray[0].slice(12, -6);
    }
    if (codeArray) {
        code = codeArray[0].slice(5, -1);
    }
    if (versionArray) {
        version = versionArray[0].slice(8, -1);
    }

    return {
        header,
        subHeader,
        body,
        method,
        transaction,
        code,
        version,
    }
};

export const isLeapYear = (year: number) => {
    if (year % 4 != 0) {
        return false;
    }
    if (year % 100 != 0) {
        return true;
    }
    if (year % 400 != 0) {
        return false;
    }
    return true;
};

export const pad2 = (n: number) => {
    return (n < 10 ? '0' : '') + n;
};

export const todayYYYYMMDD = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = pad2(date.getMonth() + 1);
    const day = pad2(date.getDate());
    return `${year}-${month}-${day}`;
};
