/* eslint-disable no-promise-executor-return */
/* eslint-disable prefer-promise-reject-errors */
const fs = require("fs");
const { spawn } = require("child_process");
const path = require("path");

function getRecommendations(perfumeName) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../utils/recommendation.py");
    console.log(`Running script: ${scriptPath}`);

    if (!fs.existsSync(scriptPath)) {
      return reject(new Error(`File not found: ${scriptPath}`));
    }

    const pythonProcess = spawn("python", [scriptPath, perfumeName]);

    let data = "";
    let error = "";

    pythonProcess.stdout.on("data", (chunk) => {
      data += chunk.toString();
      console.log("Python stdout:", chunk.toString());
    });

    pythonProcess.stderr.on("data", (chunk) => {
      error += chunk.toString();
      console.error("Python stderr:", chunk.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}:\n${error}`);
        reject(`Python process exited with code ${code}:\n${error}`);
      } else {
        try {
          console.log("Python process output:", data);
          resolve(JSON.parse(data));
        } catch (err) {
          console.error("Error parsing JSON response:\n", data);
          reject(`Error parsing JSON response:\n${data}`);
        }
      }
    });

    pythonProcess.on("error", (err) => {
      console.error(`Failed to start subprocess:\n${err}`);
      reject(new Error(`Failed to start subprocess:\n${err}`));
    });
  });
}

module.exports = {
  getRecommendations,
};
