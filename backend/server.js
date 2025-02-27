const express = require("express");
const multer = require("multer");
const archiver = require("archiver");
const SftpClient = require("ssh2-sftp-client");
const fs = require("fs-extra");

const app = express();
const upload = multer({ dest: "uploads/" }); // Temporary storage

// SFTP Configuration
const sftpConfig = {
  host: "your-sftp-server.com",
  port: 22,
  username: "your-username",
  password: "your-password",
};

// Function to zip files before sending
async function zipFiles(files, zipPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => resolve());
    archive.on("error", (err) => reject(err));

    archive.pipe(output);
    files.forEach((file) => archive.file(file.path, { name: file.originalname }));
    archive.finalize();
  });
}

// Function to upload ZIP to SFTP
async function uploadToSFTP(localFilePath, remoteFilePath) {
  const sftp = new SftpClient();
  try {
    await sftp.connect(sftpConfig);
    await sftp.put(localFilePath, remoteFilePath);
    console.log(`Uploaded ZIP: ${remoteFilePath}`);
    await sftp.end();
  } catch (error) {
    console.error("SFTP Upload Error:", error);
    throw error;
  }
}

// API to handle bulk ZIP file upload
app.post("/upload", upload.array("files"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded." });
  }

  const zipPath = `uploads/bulk_upload_${Date.now()}.zip`;

  try {
    await zipFiles(req.files, zipPath); // Create ZIP file
    await uploadToSFTP(zipPath, `/remote/path/bulk_upload.zip`); // Upload ZIP to SFTP
    fs.unlinkSync(zipPath); // Delete ZIP after upload
    req.files.forEach((file) => fs.unlinkSync(file.path)); // Delete temp files

    res.json({ message: "Bulk files uploaded as ZIP!" });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// Start Backend Server
app.listen(5000, () => console.log("Backend running on port 5000"));
