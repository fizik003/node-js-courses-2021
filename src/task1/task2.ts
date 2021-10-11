import { createReadStream, createWriteStream } from 'fs';
import csv from 'csvtojson';

const input = './csv/nodejs-hw1.csv';
const output = './csv/output.txt';

const errorHandler = (err: Error) => console.log('Error: ', err);

const csvToJson = () => {
  return csv({ headers: ['book', 'author', 'amount', 'price'] }).subscribe((line) => {
    delete line['amount'];
  });
};

const readStream = createReadStream(input);
const writeStream = createWriteStream(output);

readStream.on('error', errorHandler);
writeStream.on('error', errorHandler);

readStream.pipe(csvToJson()).pipe(writeStream);
