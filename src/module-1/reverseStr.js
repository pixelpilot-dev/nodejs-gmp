import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export function reverseStr() {
  rl.setPrompt(`Give me a word, I'll reverse it \n`);

  rl.prompt();

  rl.on('line', (line) => {
    const reverseStr = line.split('').reverse().join('');
    readline.moveCursor(process.stdout, 0, -1);
    console.log(`${reverseStr} \n`);
  }).on('close', () => {
    process.exit(0);
  });
}
