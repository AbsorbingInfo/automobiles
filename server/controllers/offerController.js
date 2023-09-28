const Offer = require('../models/offerModel');
const mongoose = require('mongoose');
const { Readable } = require('stream');
const logger = require('../helpers/logger').logger


// // Configure Google Drive API credentials
// const credentials = require('../data/instant-theater-391310-599d1fabcee6.json');

// // Create a new instance of the drive client
// const auth = new google.auth.JWT(
//   credentials.client_email,
//   null,
//   credentials.private_key,
//   ['https://www.googleapis.com/auth/drive']
// );

// // Authorize the client
// auth.authorize((err) => {
//   if (err) {
//     logger.error("Google Drive authorization error:", err);
//     console.error('Google Drive authorization error:', err);
//     return;
//   }                                   
// });

// const drive = google.drive({ version: 'v3', auth });

const createOffer = async (req, res, drive) => {
  const { title, description, fromDate, tillDate } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an offer image' });
  }

  let fileId;
   // Upload the image to Google Drive
   try {
    const currentDate = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    const filenameWithDate = currentDate + '-' + req.file.originalname;
    const fileMetadata = {
      name: filenameWithDate,
      parents: ['1_6Buw4jFDa5mTSGjDAiuxC74JCePij-E'],
    };

    const media = {
      mimeType: req.file.mimetype,
      body: Readable.from(req.file.buffer),
    };

    const driveFile = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webContentLink',
    });

    fileId = driveFile.data.id;
  } catch (error) {
    logger.error("Failed to upload offer image to Google Drive:", error);
    console.log(error)
    return res.status(500).json({ error: 'Failed to upload image to Google Drive' })
  }

  // Store the Google Drive file link in the imageLink field
  const fileLink = `https://drive.google.com/uc?id=${fileId}`;
  const imageLink = fileLink;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!description) {
    emptyFields.push('description');
  }
  if (!fileId) {
    emptyFields.push('image');
  }
  if (!fromDate) {
    emptyFields.push('fromDate');
  }
  if (!tillDate) {
    emptyFields.push('tillDate');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }


  // Add to the database
  try {
    const offer = await Offer.create({ title, description, imageLink, fromDate, tillDate });

    // Create the Facebook feed post
    // const pageAccessToken = process.env.ACCESS_TOKEN;
    // const postMessage = `${title}\n${description}`; 
    // const imageUrl = `${imageLink}`;
      
    // const response = await fetch(
    //   `https://graph.facebook.com/v12.0/100546536461545/feed?access_token=${pageAccessToken}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       message: postMessage,
    //       link: imageLink,
    //     }),
    //   }
    // );

    //const responseData = await response.json();
    //the response from the Graph API
    //console.log(responseData); 

    res.status(200).json(offer);
  } catch (error) {
    logger.error("Failed to create offer:", error);
    res.status(400).json({ error: "Internal Server Error" });
  }
};

const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({}).sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (error) {
    logger.error("Failed to get all offers:", error);
    res.status(500).json({ error: error.message });
  }
};

const getOffer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.error("Failed to get offer:", error);
    return res.status(404).json({ error: 'No such offer' });
  }

  try {
    const offer = await Offer.findById(id);
    if (!offer) {
      return res.status(404).json({ error: 'No such offer' });
    }
    res.status(200).json(offer);
  } catch (error) {
    logger.error("Failed to get offer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOffer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such offer' });
  }

  try {
    const offer = await Offer.findOneAndDelete({ _id: id });
    if (!offer) {
      return res.status(400).json({ error: 'No such offer' });
    }
    // Delete the file from Google Drive
    const fileLink = offer.imageLink;
    const fileId = fileLink.split('id=')[1];
    await drive.files.delete({ fileId });

    res.status(200).json(offer);
  } catch (error) {
    logger.error("Failed to delete offer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createOffer,
  getOffers,
  getOffer,
  deleteOffer
};
