const fs = require('fs');
const path = require('path');

// Define your gallery directory path
const galleryDir = path.join(__dirname, 'public', 'gallery');
const outputFile = path.join(__dirname, 'public', 'galleryIndex.json');

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

const galleryIndex = {};

fs.readdirSync(galleryDir, { withFileTypes: true }).forEach(folder => {
  if (folder.isDirectory()) {
    const folderName = folder.name;
    const folderPath = path.join(galleryDir, folderName);
    const files = fs.readdirSync(folderPath).filter(file =>
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    if (files.length > 0) {
      galleryIndex[folderName] = files;
    }
  }
});

fs.writeFileSync(outputFile, JSON.stringify(galleryIndex, null, 2));
console.log('✅ galleryIndex.json generated successfully!');
