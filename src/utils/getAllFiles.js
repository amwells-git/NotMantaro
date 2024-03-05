//import fs and path
const fs = require('fs');
const path = require('path');

module.exports = (directory, foldersOnly = false) => {
    let fileNames = [];

    //import files
    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
        //create file path to get pushed to fileNames array
        const filePath = path.join(directory, file.name);

        //check if directory or file
        if (foldersOnly) {
            if (file.isDirectory()) {
                fileNames.push(filePath);
            }
        } else {
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
    }
    //return array of files
    return fileNames;
};