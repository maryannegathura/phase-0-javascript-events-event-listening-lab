function addingEventListener() {
}// Consolidated code in one file (e.g., test-and-helper.js)

const { JSDOM } = require('jsdom');
const { expect } = require('chai');
const sinon = require('sinon');

// Helpers.js - Define the function addingEventListener
function addingEventListener() {
  const button = document.getElementById('button');
  button.addEventListener('click', function() {
    // Event handling logic
    console.log('Button clicked!');
  });
}

// index.js - Call addingEventListener
addingEventListener();

// Test using Mocha
describe("index.js", () => {
  let input;

  beforeEach(function() {
    // Setup a basic DOM structure using jsdom
    const dom = new JSDOM(`
      <html>
        <body>
          <button id="button">Click me</button>
        </body>
      </html>
    `);

    // Set global objects from jsdom
    global.document = dom.window.document;
    global.window = dom.window;

    // Spy on addEventListener method of the button
    input = document.getElementById('button');
    sinon.spy(input, 'addEventListener');
  });

  afterEach(function() {
    // Clean up spies
    input.addEventListener.restore();
  });

  it("binds an event listener in addingEventListener()", () => {
    addingEventListener();
    expect(input.addEventListener.called).to.be.true;
  });
});

// Run the tests
if (require.main === module) {
  // Run the tests only if this file is executed directly
  const mocha = require('mocha');
  mocha.run();
}

