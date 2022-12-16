import fs from 'fs';
import { pipeline } from 'stream';
import csv from 'csvtojson';

export function parseCSV(): void {
  const PATH_TO_CSV_FILE = 'csv/file.csv';
  const PATH_TO_OUTPUT_FILE = 'csv/file.txt';

  pipeline(
    fs.createReadStream(PATH_TO_CSV_FILE),
    csv(),
    fs.createWriteStream(PATH_TO_OUTPUT_FILE),
    (error) => {
      if (error) {
        console.error('Pipeline failed.', error);
      } else {
        console.log('Pipeline succeeded.');
      }
    },
  );
}
