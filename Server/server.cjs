const app = require('./app');
const portfinder = require('portfinder');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config(); 

portfinder.getPortPromise({port: 0,stopPort: 65535}, (err,availablePort) => {
    if (err){
       console.error('Error finding an available prt:',err);
       return;   
    }

// Function to write the dynamic port to the .env file
function writePortToEnvFile(port) {
    console.log(`Writing VITE_BACKEND_URL to .env with port: ${port}`);
    const envContent = `VITE_BACKEND_URL=http://localhost:${port}/api/\n`;
  
    // Path to the root folder's .env (two levels up from src/server)
    const rootEnvFilePath = path.join(__dirname, '../Client', '.env');
    fs.writeFileSync(rootEnvFilePath, envContent, 'utf8');
    console.log(`Written VITE_BACKEND_URL to .env: http://localhost:${port}/api/`);
  }



 writePortToEnvFile(availablePort);

 app.listen(availablePort,() => {
    console.log(`Server running on http://localhost:${availablePort}`);
 });
})

