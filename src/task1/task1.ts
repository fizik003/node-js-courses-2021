import { pipeline, Transform } from 'stream';

const readStream = process.stdin;
const writeStream = process.stdout;

class MyTransformStream extends Transform {
  _transform(chank, encoding, callBack) {
    try {
      const inputString: string = chank.toString();
      const resultString = [...inputString.split('').reverse(), '\n'].join('');
      callBack(null, resultString);
    } catch (error) {
      callBack(error);
    }
  }
}

console.time();
const myTransformStream = new MyTransformStream();

pipeline(readStream, myTransformStream, writeStream, (err) => {
  if (err) {
    console.error('error:' + err.message);
  } else {
    console.log('Ok');
  }
});
