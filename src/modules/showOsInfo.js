import os from 'os';

export const showOsInfo = (infoType) => {
    switch (infoType) {
        case '--EOL':
            console.log(os.EOL);
            break;
        case '--cpus':
            console.log(os.cpus());
            break;
        case '--homedir':
            console.log(os.homedir());
            break;
        case '--username':
            console.log(os.userInfo().username);
            break;
        case '--architecture':
            console.log(process.arch);
            break;
        default:
            console.log('Invalid input');
    }
};