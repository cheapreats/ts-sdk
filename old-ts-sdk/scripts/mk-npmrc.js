const path = require('path');
const fs = require('fs');

const location = path.resolve(__dirname, '..', '.npmrc');
let res = `@cheapreats:registry=https://npm.pkg.github.com/cheapreats`;

if (process.env.AUTO && process.env.AUTO.toUpperCase() === 'TRUE') {
    res += `\r\n//npm.pkg.github.com/:_authToken=${process.env.GIT_AUTH_TOKEN}`
}

res += `\r\n`;
fs.writeFileSync(location, res);
