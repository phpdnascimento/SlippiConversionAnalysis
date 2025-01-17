const fs = require('fs');
const path = require('path');

// Function to rename files in a directory in numerical order and return them in an array
function renameFilesAndStoreInArray(directoryPath) {
  const renamedFilesArray = [];
  try {
    const items = fs.readdirSync(directoryPath); // Get all items in the directory
    const files = items.filter(item => {
      const fullPath = path.join(directoryPath, item);
      return fs.statSync(fullPath).isFile(); // Filter to only include files
    });

    // Sort files alphabetically to ensure consistent renaming order
    files.sort();

    files.forEach((file, index) => {
      const fileExtension = path.extname(file); // Get the file extension
      const newFileName = `${index + 1}${fileExtension}`; // Create the new name (e.g., 1.txt, 2.txt)
      const oldPath = path.join(directoryPath, file);
      const newPath = path.join(directoryPath, newFileName);

      // Rename the file
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${file} -> ${newFileName}`);

      // Add the new file name to the array
      renamedFilesArray.push(newFileName);
    });

    console.log('Renaming completed.');
  } catch (error) {
    console.error('Error processing the directory:', error);
  }

  return renamedFilesArray;
}

// CHANGE DIRECTORY TO YOURS HERE.
const directoryPath = 'C:\\Users\\phpdn\\OneDrive\\Desktop\\project\\games';
const renamedFiles = renameFilesAndStoreInArray(directoryPath);
console.log('Renamed files:', renamedFiles);


dataColumns = ['gameId', 'player1Id', 'player2Id', 'player1Character', 'player2Character', 'playerConversion', 'openingMove', 'openingType', 'startPercent', 'endPercent', 'knockOut'];
dataArrayFinal = [];
dataArrayFinal.push(dataColumns);
function arrayToCSV(arr) {
  return arr.map(row => row.join(',')).join('\n');
}



const { SlippiGame } = require("@slippi/slippi-js");



for (let i = 0; i < renamedFiles.length; i++){
	const tempString = "games/" + renamedFiles[i];
	console.log(tempString);

	const game = new SlippiGame(tempString)
	const stats = game.getStats();
	const settings = game.getSettings();


	for (let j = 0; j < stats.conversions.length; j++){
		player1Id = settings.players[0].userId;
		player2Id = settings.players[1].userId;
		player1Character = settings.players[0].characterId;
		player2Character = settings.players[1].characterId;
		playerConversion = stats.conversions[j].playerIndex;
		openingMove = stats.conversions[j].moves[0].moveId
		openingType = stats.conversions[j].openingType
		startPercent = stats.conversions[j].startPercent;
		endPercent = stats.conversions[j].endPercent;
		knockOut = stats.conversions[j].didKill;
		const dataArray = [settings.matchInfo.matchId, player1Id, player2Id, player1Character, player2Character, playerConversion, openingMove, openingType, startPercent, endPercent, knockOut];
		//console.log(dataArray)
		dataArrayFinal.push(dataArray);
	}
	//console.log(stats.conversions[0]);
}

// Convert the array to CSV format
const csvContent = arrayToCSV(dataArrayFinal);

const filePath = 'output.csv';

// Write the CSV content to the file using fs.writeFile
fs.writeFile(filePath, csvContent, 'utf8', (err) => {
  if (err) {
    console.error('An error occurred while writing to the file:', err);
  } else {
    console.log(`CSV file has been saved to ${filePath}`);
  }
});