const XLSX = require('xlsx');
const fs = require('fs')
const { sendAdComapign } = require('../helpers/whatsappMessages')
const logger = require('../helpers/logger').logger

const adCompaign = async(req,res) => {
    try{
        const offerImage = req.files['OfferImage'][0];
        const adCampaign = req.files['Excel'][0];

        const workbook = await XLSX.readFile(adCampaign.path);

        const sheetNames = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetNames[0]];

        const data = await XLSX.utils.sheet_to_json(sheet);
       
        //await sendAdComapign( data ,offerImage.path)

        //deleting the file from server
        await fs.unlink( offerImage.path, (error) => {
            if (error) {
              logger.error("Error deleting image in adCampaign:", error);
            }
        });
        await fs.unlink( adCampaign.path, (error) => {
            if (error) {
              logger.error("Error deleting csv file in adCampaign:", error);
            }
        });
        res.status(200).json("Ad Campaign sent successfully");
    }catch(error){
        logger.error("Failed to send Ad Campaign:",error)
        return res.status(500).json({messsage:"Failed to send Ad Campaign", error});
    }
}

module.exports = {
    adCompaign
}