const toIco = require('to-ico');
const fs = require('fs');
const path = require('path');

async function generateIco() {
  const publicDir = path.join(__dirname, 'public');

  try {
    console.log('Generating favicon.ico...');

    // Read the PNG files
    const files = [
      fs.readFileSync(path.join(publicDir, 'favicon-16x16-temp.png')),
      fs.readFileSync(path.join(publicDir, 'favicon32.png'))
    ];

    // Convert to ICO
    const ico = await toIco(files, {
      resize: true,
      sizes: [16, 32]
    });

    // Write the ICO file
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);
    console.log('✓ favicon.ico created successfully');

    // Clean up temporary file
    fs.unlinkSync(path.join(publicDir, 'favicon-16x16-temp.png'));
    console.log('✓ Temporary files cleaned up');

  } catch (error) {
    console.error('Error generating favicon.ico:', error);
    process.exit(1);
  }
}

generateIco();
