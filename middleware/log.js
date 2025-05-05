import morgan from 'morgan';
import chalk from 'chalk';




const loggerBasic = morgan('dev')
const loggerCustom = morgan((tokens, req, res) => {
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];
    const params = JSON.stringify(req.params);
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);
    const responseTime = tokens['response-time'](req, res);
    const date = new Date().toLocaleString();
    let log = "";
if (method === 'GET') {log += `
    ${chalk.blue(method)} 
    ${chalk.blue(url)} 
    ${chalk.blue(status)} 
    ${chalk.blue(ip)} \n`};
if (method === 'POST') {log += `
    ${chalk.green(method)} 
    ${chalk.green(url)} 
    ${chalk.green(status)} 
    ${chalk.green(ip)} \n`;}
if (method === 'PUT') {log += `
    ${chalk.yellow(method)}
    ${chalk.yellow(url)}
    ${chalk.yellow(status)}
    ${chalk.yellow(ip)} \n`;}
if (method === 'DELETE') {log += `
    ${chalk.red(method)}
    ${chalk.red(url)}
    ${chalk.red(status)}
    ${chalk.red(ip)} \n`;}

method === 'GET' ? console.log("Es un GET") : console.log("No es un GET");

    log += `${method} ${url} ${status} \n`;
    log += ` ${responseTime} ${date}\n`;
    log += `IP: ${ip}\n`
    log += `User-Agent: ${userAgent}\n`;
    log += ` Params: ${params}\n`;
    log += ` Body: ${body}\n`;
    log += ` Query: ${query}\n`;
    return log;
})

export { loggerBasic, loggerCustom };
// loggerBasic es un middleware que se encarga de logear las peticiones que llegan al servidor
// loggerCustom es un middleware que se encarga de logear las peticiones que llegan al servidor