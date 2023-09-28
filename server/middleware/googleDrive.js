const { google } = require('googleapis');

const createDriveClient = (credentials) => {
  // Create a new instance of the drive client
  const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/drive']
  );
  
  // Authorize the client
  auth.authorize((err) => {
    if (err) {
      logger.error("Google Drive authorization error:", err);
      console.error('Google Drive authorization error:', err);
      return;
    }                                   
  });

  return google.drive({ version: 'v3', auth });
};

module.exports = { createDriveClient };
