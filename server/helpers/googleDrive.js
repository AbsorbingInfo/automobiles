const { google } = require('googleapis')
const credentials = require('../data/instant-theater-391310-599d1fabcee6.json');
const crypto = require('crypto');
const logger = require('./logger').logger

const authorizeGoogleDrive = async() =>{
  // Create a new instance of the drive client
  const auth = await new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/drive']
  );
  
  // Authorize the client
  await auth.authorize((err) => {
    if (err) {
      logger.error("Google Drive authorization error:", err);
      console.error('Google Drive authorization error:', err);
      return;
    }
    console.log('Google Drive authorized');                                           
  });

  return google.drive({ version: 'v3', auth })
}

//uploads invoice to google drive
const uploadInvoiceToDrive = async(req, drive) => {
  const randomString = crypto.randomBytes(3).toString('hex');

  const fileMetadata = {
    name: req.file.filename + randomString,
    parents: ['1UB5XB04xm554w_QyL1oX61gPrHHWGWU6'],
  };

  const fileStream = await fs.readFileSync(path.join(__dirname, '../assets/uploads/', req.file.filename));

  const media = {
    mimeType: req.file.mimetype,
    body: Readable.from(fileStream),
  };
  let driveFile;
  try{
    driveFile = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id, webContentLink',
    });
    successFields.push("Successfully uploaded invoice pdf to gDrive.")
  }catch(error){
    logger.error("Failed to upload invoice pdf to gDrive:", error);
    errorFields.push("Failed to upload invoice pdf to gDrive:")
  }
  const fileId = driveFile.data.id;
  const invoiceLink = `https://drive.google.com/uc?id=${fileId}`;
  return {invoiceLink};
}

module.exports = {
    authorizeGoogleDrive,
    uploadInvoiceToDrive
}