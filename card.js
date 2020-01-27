/**
 * You found the secrets!!!
 */

// Set up the console thingy.
var con = new SimpleConsole({
	handleCommand: handleCommand,
	placeholder: "For usage instructions, type 'usage'...",
	storageID: "lskrurzdpftu4ept"
});
document.body.appendChild(con.element);

// Define a helper function to pause execution
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// The opening message
const message = [
  ["Dear Lucy...", 2500],
  ["I know you as a person to be curious,"],
  ["And this use of time to be suprious..."],
  ["But as I sat down to write a card this year,"],
  ["I realised I had in you, a peer,"],
  ["So instead of moonpig, a German card or a poem with rhythm...", 3500],
  ["I wrote you some JavaScript, and a small algorithm ;)"]
];

// A function to print the opening message
async function printAll(arr) {
  if (arr.length == 0) {
    return;
  }
  const [message, timeout = 2000] = arr[0];
  con.log(message);
  await sleep(timeout);
  printAll(arr.slice(1));
}

// Define some birthday greetings
const greetings = [
  "Happy birthday Lucy!",
  "Have a lovely day Lucy!",
  // Happy birthday in binary
  "01101000 01100001 01110000 01110000 01111001 00100000 01100010 01101001 01110010 01110100 01101000 01100100 01100001 01111001",
  "Congratulations on another orbit around the sun!",
];

// Print a greeting
// Select a random greeting if none is passed in
function greeting(num) {
  if (num === undefined) {
    num = Math.floor(Math.random() * greetings.length);
  }
  if (num < 0 || num >= greetings.length) {
    con.error("There is no greeting like that...");
    return;
  }
  con.success(greetings[num]);
}

// Compute the n'th fibbonaci number. Don't use with big numbers ;)
function fib(num) {
  // Maybe this could be optimised... ;) Left as an exercise for the reader!
  function compute(num) {
    if (num <= 0) {
      return 0;
    } else if (num == 1) {
      return 1;
    } else {
      return compute(num - 2) + compute(num - 1);
    }
  }
  con.info("Computing 'fib ' " + num + "'...");
  con.success(compute(num).toString());
}

// Print the number of days until Christmas
function untilChristmas() {
  const today = new Date();
  var christmas = new Date(today.getFullYear(), 11, 25);
  if (today.getMonth() == 11 && today.getDate()>25) {
    christmas.setFullYear(christmas.getFullYear() + 1);
  }
  const oneDay = 1000 * 60 * 60 * 24;
  const difference = Math.ceil(christmas.getTime() - today.getTime());
  con.success(parseInt(difference / oneDay) + " days left until Christmas!");
}

// Handles user input
function handleCommand(command){
  if (command === 'usage') {
    con.info("Usage");
    con.info("> greeting <number>");
    con.info("> fib number");
    con.info("> until_christmas");
    con.info("> clear");
  } else if(command.match(/^clear/i)){
    location.reload();
  } else if(command.match(/^greeting/i)){
    const number = command.match(/\d+/g);
    if (number) {
      greeting(parseInt(number));
    } else {
      greeting();
    }
  } else if (command == 'until_christmas') {
    untilChristmas();
  } else if(command.match(/^fib.\d+/i)){
    const number = command.match(/\d+/g);
    fib(parseInt(number));
  } else {
    con.error('I\'m not sure what to do with \'' + command + '\'');
  }
};

// Print the opening message!
printAll(message);

/* P.s. Say hi to Toby! */
