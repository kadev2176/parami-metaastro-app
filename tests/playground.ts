const date1 = new Date();
console.log(date1.getTime());
const d = Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate());
console.log(d);
