const path = require('path');
const { spawn } = require('child_process');

const location = path.resolve(__dirname, '..', 'graphql-api/');
let url = `https://github.com/cheapreats/CheaprEats-GraphQL-API`;

if (process.env.AUTO && process.env.AUTO.toUpperCase() === 'TRUE') {
    url = `https://${process.env.GIT_AUTH_TOKEN}@github.com/cheapreats/CheaprEats-GraphQL-API`;
}

let git = spawn('git', ['clone', url, location]);
git.stdout.on('data', (data) => {
    console.log(data.toString());
});
git.stderr.on('data', (data) => {
    console.error(data.toString());
});
