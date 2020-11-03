const inquirer = require("inquirer")
const fs = require("fs");

inquirer.prompt([
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "github",
        validate: input => input.length > 2,
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email",
        validate: input => input.length > 2,
    },
    {
        type: "input",
        message: "What is the name of your project?",
        name: "title",
        validate: input => input.length > 2,
    },
    {
        type: "input",
        message: "Please provide a description of your project",
        name: "description",
        validate: input => input.length > 2,
    },
    {
        type: "list",
        message: "What kind of License should your project have",
        choices: ["Apache 2.0", "GNU v3.0", "MIT", "BSD 3-clause", "Creative Commons Zero", "Other"],
        name: "license",
    },
    {
        type: "input",
        message: "What command should be run to install dependencies?",
        name: "install",
    },
    {
        type: "input",
        message: "What command should be run to run tests?",
        name: "test"
    },
    {
        type: "input",
        message: "What does the user need to know regarding the usage of this repo?",
        name: "usage",
        validate: input => input.length > 2,
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
        validate: input => input.length > 2,
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
        message: "What does the authorized user need to know about contributing to the repo?",
        name: "contributingClosed",
        when: answers => answers.closedSource === true,
        validate: input => input.length > 2,
    }
]).then(response => {
    // console.log(response)
    let { github, email, title, description, license, install, test, usage, openSource, contributorCovenant, openSourceMsg, closedSource, contributingClosed } = response;
    // console.log(contributingClosed);
    // console.log(contributingClosed ? "this should if closed" : "success if no closed comment!")
    let licenseBadge = (response.license === "Apache 2.0") ? "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)" :
        (license === "GNU v3.0") ? "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)" :
            (license === "MIT") ? "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)" :
                (license === "BSD 3-clause") ? "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)" :
                    (license === "Creative Commons Zero") ? "[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)" : " ";

    const contributingBadge = contributorCovenant ? "[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md)" : " ";

    const contributorCovenantMsg = contributorCovenant ? `This is an open source application and welcome for contribution. If you would like to contribute, you can fork my repo and submit any pull request for any features you would like added.    
Contributions are protected by the contributor covenant V2.0. If you have any new features you would like to see added or want to report abuse please contact me at ${email} 
Click [here](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md) for more information regarding contributor covenant V2.0.`: "";

    if (!openSourceMsg) {
        openSourceMsg = " "
    }
    if (!contributingClosed) {
        contributingClosed = " "
    }

    const readme = `# ${title}

${licenseBadge}
${contributingBadge}

## Description

${description}

## Table of Contents
    
- [Description](#description)
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)
    
## Installation
    
${install}
    
## Usage
    
${usage}
    
## License
    
The project is covered under the ${license} license.
    
## Contributing
    
    
${openSourceMsg}
${contributorCovenantMsg}
${contributingClosed}
    
## Tests
    
${test}
    
## Questions
    
GitHub Profile: [${github}](https://github.com/${github})

Email: ${email}`

    // console.log(readme);
    fs.writeFile("README.md", readme, err => err ? console.log(err) : console.log("Success"));
})
