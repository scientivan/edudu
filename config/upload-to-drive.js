const fs = require("fs");
const { google } = require("googleapis");
const stream = require('stream')
// Load credentials dari file
const CREDENTIALS_PATH = "credentials.json";
const readline = require('readline')
// Scope Google Drive API (untuk akses penuh ke Drive pengguna)
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// Fungsi autentikasi OAuth2
async function authenticate() {
    const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.CALLBACK_URL);

    // Cek apakah sudah ada token tersimpan
    
    const TOKEN_PATH = "./config/token.json";
    if (fs.existsSync(TOKEN_PATH)) {
        const token = fs.readFileSync(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token));
        return oAuth2Client;
    }

    // Jika belum ada token, lakukan autentikasi manual
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    console.log("Buka link ini di browser untuk autentikasi:", authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question("Masukkan kode dari browser: ", async (code) => {
            rl.close();
            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
            resolve(oAuth2Client);
        });
    });
}

// Fungsi upload file ke Google Drive
async function uploadFile(buffer, fileName) {
    const auth = await authenticate();
    const drive = google.drive({ version: "v3", auth });
    
    const bufferStream = new stream.PassThrough()
    bufferStream.end(buffer)

    const fileMetadata = {
        name: fileName,
        parents: ["root"], // Simpan di folder utama Google Drive
    };

    const media = {
        mimeType: "image/png",
        body: bufferStream
    };

    const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id, webViewLink, webContentLink",
    });
    
    await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
            role: 'reader',
            type: 'anyone',
        },
    });

    console.log("File berhasil diunggah!");
    console.log("📂 Drive Link:", response.data.webViewLink);
    return response.data.webViewLink;
}

module.exports = {uploadFile}