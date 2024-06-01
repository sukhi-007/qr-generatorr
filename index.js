/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs'

inquirer
  .prompt([{ type: 'input', name: 'url', message: 'Enter the URL which needs to be converted to a QR-image', default: 'https://www.google.com'}])
  .then((answers) => {
    const ans=answers.url;
    var qr_svg = qr.image(ans, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr.png'))
    console.log('QR code image created successfully');
    fs.writeFile('qr.txt', ans, (err) => {
      if (err) throw err;
      console.log('Data saved to qr.txt');
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
       console.log('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.log('An error occurred', error);
    }
  });

