const pdfjs = require('pdfjs-dist');
const path = require('path')
const logger = require('./logger').logger

const readFromPdf = async(req) => {
    
  const pdfFilePath = path.join(__dirname, '../assets/uploads/', req.file.filename);
  
  //regions of text on pdf
  const regions = {
    nameRegion: { x: 45, y: 650, width: 200, height: 20 },
    registeredNoRegion: { x: 445, y: 657, width: 200, height: 10 },
    isServicingRegion: { x: 291, y: 620, width: 100, height: 10 },
    isEngineOilChangedRegion: { x: 447, y: 620, width: 100, height: 10 },
    estimatedEngineOilDueRegion: { x: 291, y: 592, width: 100, height: 10 },
    bikeCategoryRegion: { x: 447, y: 592, width: 100, height: 10 },
    makeRegion: { x: 291, y: 718, width: 100, height: 10 },
    modelRegion: { x: 447, y: 718, width: 100, height: 10 },
    mechanicNameRegion: { x: 447, y: 564, width: 100, height: 10 },
    contactNoRegion:{x: 78, y: 564, width: 100, height: 10},
    kilometerReadingRegion:{x: 291, y: 564, width: 100, height: 10}
  };

  try {
    const pdf = await pdfjs.getDocument(pdfFilePath).promise;
    const page = await pdf.getPage(1);
    const lastPage = await pdf.getPage(pdf.numPages)

    const totalAmount = await extractTotalAmount(lastPage)
    const extractedData = await extractTextFromRegions(page, regions);

    const allInvoiceData = []

    //Removing spaces at the end of values
    for(let key in extractedData){
      let value = extractedData[key].join('');
      if(value.charAt(value.length-1) === ' '){
        value = value.slice(0, -1)
      }
      allInvoiceData.push(value)
    }
    allInvoiceData.push(totalAmount[0])
    allInvoiceData.push(totalAmount[1])

    /*
    returning array of [make, model, name, registrationNo, isServicing,
    isEngineOilChanged, estimatedEngineOilDue, bikeCategory, contactNo
    mechanicName, invoicetype]
    */

    return allInvoiceData
  } catch (error) {
    logger.error('Error extracting text from PDF:',error)
  }
}


//Extracts Final Amount
const extractTotalAmount = async(pdf) =>{
  const text = await pdf.getTextContent({ normalizeWhitespace: true })

  //reference to label 'Grand Total'
  const totalAmountLabel = await text.items.filter((item) => {
    return item.str === 'Grand' & item.width === 24.086425788000003
    })

  //Relative Position of actual Amount
  const totalAmountRegion = { x: totalAmountLabel[0].transform[4] + 467.92334, y: totalAmountLabel[0].transform[5], width: 150, height: 50 }

  let textData = []
  
  //return text as per the region (total amount )
  text.items.forEach(item => {
    const [x, y] = item.transform.slice(4, 6);
    if (
      x >= totalAmountRegion.x &&
      x <= totalAmountRegion.x + totalAmountRegion.width &&
      y === totalAmountRegion.y 
    ){
      textData.push(item.str)
    }
  })
  textData.push(text.items[2].str)

  return textData
}

async function extractTextFromRegions(page, regions) {
    const textContent = await page.getTextContent({ normalizeWhitespace: true });
    const extractedData = {};

    textContent.items.forEach(item => {
      const [x, y] = item.transform.slice(4, 6);

      //Return all texts in extractedData object as per region
      for (const [key, region] of Object.entries(regions)) {
        if (
          x >= region.x &&
          x <= region.x + region.width &&
          y >= region.y &&
          y <= region.y + region.height
        ) {
          if (!extractedData[key]) {
            extractedData[key] = [];
          }
          extractedData[key].push(item.str);
        }
      }
    });
    return extractedData;
  }

module.exports = {
  readFromPdf
}