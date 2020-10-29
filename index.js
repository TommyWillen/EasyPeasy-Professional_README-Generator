const inquirer = require("inquirer")
const fs = require("fs");
const Choices = require("inquirer/lib/objects/choices");

inquirer.prompt([
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "github"
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email"
    },
    {
        type: "input",
        message: "What is the name of your project?",
        name: "title"
    },
    {
        type: "input",
        message: "Please provide a description of your project",
        name: "description"
    },
    {
        type: "list",
        message: "What kind of License should your project have",
        choices: ["Apache 2.0", "GNU v3.0", "MIT", "Bsd 2-clause", "Creative Commons Zero", "Other"],
        name: "license",
    },
    {
        type: "input",
        message: "What command should be run to install dependencies?",
        name: "install"
    },
    {
        type: "input",
        message: "What command should be run to run tests?",
        name: "test"
    },
    {
        type: "input",
        message: "What does the user need to know regarding the usage of this repo?",
        name: "usage"
    },
    {
        type: "confirm",
        message: "Is your project open source?",
        name: "openSource"
    },
    {
        type: "confirm",
        message: "Would you like to use the contributor covenant for contributor rules?",
        name: "contributorCovenant",
        when: answers => answers.openSource === true,
        // repo opensource true contributor covenant option
    },
    {
        type: "input",
        message: "What does the user need to know about contributing to the repo?",
        name: "openSourceMsg",
        when: answers => answers.contributorCovenant === false,
        // contributor covenant false other information
    },
    {
        type: "confirm",
        message: "Would you like to add a message to authroized authors on how to contribute?",
        name: "closedSource",
        when: answers => answers.openSource === false,
        // opemsource false
    },
    {
        type: "input",
        message: "What dies the authorized user need to know about contributing to the repo?",
        name: "contributingClosed",
        when: answers => answers.closedSource === true,
    }
]).then(response => {
    console.log(response)
    const readme = `# ${title}

    ${licenseBadge}
    ${contributingBadge}
    
    ## Table of Contents
    
    - [Description](#description)
    - [Installation](#Installation)
    - [Usage](#Usage)
    - [License](#License)
    - [Contributing](#Contributing)
    - [Tests](#Tests)
    - [Questions](#Questions)
    
    
    ## Description
    
    ${description}
    
    ## Installation
    
    ${install}
    
    ## Usage
    
    ${usage}
    
    ## License
    
    The project is covered under the ${license} license.
    
    ## Contributing
    
    ${openSource}
    ${openSourceMsg}
    ${contributorCovenant}
    ${contributingClosed}
    
    ## Tests
    
    ${test}
    
    ## Questions
    
    GitHub Profile: ${github}
    Email: ${email}`
})
// This is an open source application and welcome for contribution. If you would like to contribute, simply fork my repository:


// [Insert how to fork repo information here]


// Contributions are protected by the contributor covenant V2.0. If you have any new features you would like to see added or want to report abuse please contact me at [INSERT CONTACT METHOD] 
// Click [here](./contributor-covenant) for more information regarding contributor covenant V2.0.