// Import the required modules
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Define the patterns and their replacements{{% pageinfo %}}
//{{% /pageinfo %}}
const patternCardStart = /{{%\s*pageinfo\s*%}}/g;
const patternCardEnd = /{{%\s*\/pageinfo\s*%}}/g; 
const cardEndReplacement = '{{/pageinfo}}';
const cardStartReplacement = '{{pageinfo}}'
// Find all .md files in the current directory and its subdirectories
glob("**/*.md", function (err, files) {
  if (err) {
    console.error("Error while finding files:", err);
  } else {
    files.forEach(function (file) {
        console.log(file)
      // Read the file
      fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
          console.error("Error while reading file:", err);
        } else {
          // Replace all occurrences of the patterns with the replacements
          let newData = data
            .replace(patternCardStart,cardStartReplacement)
            .replace(patternCardEnd, cardEndReplacement)
            
          // Write the new data back to the file
          fs.writeFile(file, newData, 'utf8', function (err) {
            if (err) {
              console.error("Error while writing to file:", err);
            }
          });
        }
      });
    });
  }
});
