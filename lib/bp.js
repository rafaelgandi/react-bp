/*
    Used to generate component boilerplates for Ionic React components
    www.rafaelgandi.com
*/
const { writeFileSync, existsSync, mkdirSync } = require('fs');
// See: https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
const args = process.argv.slice(2);
const componentName = args[0];
if (!componentName) {
    throw new Error('Please provide a name for the component.');
}
const srcDir = './';
const componentDir = srcDir + componentName;
console.log('🚧 Building...');
if (!existsSync(componentDir)){
    mkdirSync(componentDir);
}




// UPDATE THE TEMPLATE BELOW IF YOU WANT A DIFFERENT TEMPLATE CODE OF FILE FORMAT //

const componentCodeTemplate = `
import React from 'react';
import StyledDiv from './${componentName}.styles';

interface ${componentName}Props {}
export default function ${componentName}(props: ${componentName}Props): React.ReactElement | null {
    return (
        <StyledDiv>

        </StyledDiv>
    );
}   
`;

const componentStylesTemplate = `
import styled from "components/styled";
export default styled('div')\`

    /* 
    Your css goes here. 
    Change the "div" string to any html tag or any Ionic React component. This 
    will be the main styled body of your component. 

    NOTE: All styles that apply to ${componentName}.tsx and its children should all 
    be placed here.
    */

\`
`;

writeFileSync(`${componentDir}/${componentName}.tsx`, componentCodeTemplate);
writeFileSync(`${componentDir}/${componentName}.styles.js`, componentStylesTemplate);

console.log(`|-- ${componentDir}/${componentName}.tsx`);
console.log(`|-- ${componentDir}/${componentName}.styles.js`);
console.log(`Component boilerplate created! 🤖✨`);