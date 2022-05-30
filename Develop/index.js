// TODO: Include packages needed for this application
// const { rejects } = require('assert');
const fs = require("fs");
const inquirer = require("inquirer");
// const { resolve } = require('path');
const generateMarkdown = require("./utils/generateMarkdown.js");

// Importing Utilities module
const util = require("util");
// const util = require('util');

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
    validate: (titleInput) => {
      if (titleInput) {
        return true;
      } else {
        console.log("Enter a project title");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "description",
    message: "what is your project description?",
    validate: (descriptionInput) => {
      if (descriptionInput) {
        return true;
      } else {
        console.log("Please provide a project description");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "installation",
    message: "How to install your project? (if applicable)",
  },

  {
    type: "input",
    name: "usage",
    message: "What is the use of your project?",
    validate: (usageInput) => {
      if (usageInput) {
        return true;
      } else {
        console.log("Please provide a use for your project");
        return false;
      }
    },
  },

  {
    type: "input",
    name: "contributions",
    message: "What guidelines required for contribution?",
  },
  {
    type: "input",
    name: "tests",
    message: "How do you test this project?",
  },

  {
    type: "list",
    name: "license",
    message: "What license does your project use?",
    choices: [
      "None",
      "Apache 2.0",
      "MIT",
      "GPL v3.0",
      "Mozilla Public License 2.0",
      "other",
    ],
    validate: (licenseInput = () => {
      if (licenseInput) {
        return true;
      } else {
        console.log("Please select an options");
        return false;
      }
    }),
  },

  {
    type: "input",
    name: "username",
    message: "What is your Github username?",
    validate: (usernameInput) => {
      if (usernameInput) {
        return true;
      } else {
        console.log(
          "Provide your username so others can reach out to you with questions"
        );
        return false;
      }
    },
  },

  {
    type: "input",
    name: "email",
    message:
      "What is your email so there is another way to be reached for questions?",
    validate: (emailInput) => {
      if (emailInput) {
        return true;
      } else {
        console.log("Please provide an email");
        return false;
      }
    },
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(fileName + " " + "is successful.");
  });
}

// TODO: Create a function to initialize app
const writeFileAsync = util.promisify(writeToFile);

async function init() {
  try {
    // Prompt Inquirer questions
    const userResponses = await inquirer.prompt(questions);

    // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown

    const markdown = generateMarkdown(userResponses);
    console.log(markdown);

    // Write markdown to file
    await writeFileAsync("ExampleREADME.md", markdown);
  } catch (error) {
    console.log(error);
  }
}


// Function call to initialize app
init();
