const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const winston = require("winston");
const path = require('path');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: path.join(__dirname,"../", "logs", "whatsappMessage.log"),
      handleExceptions: true,
      maxsize: 9242880,
      maxFiles: 5,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
  exitOnError: false,
});


const sendInvoice = async(req, customerName, vehicleNumber, invoiceType, phoneNumber, errorFields, successFields) => {
    //Uploading to whatsapp server
    const formData = new FormData();
    const filePath = path.join(__dirname, '../assets/uploads/', req.file.filename);
    formData.append('file', fs.createReadStream(filePath));
    formData.append('type', 'application/pdf');
    formData.append('messaging_product', 'whatsapp');

    let templateName;
    if(invoiceType === 'gst'){
      templateName = 'invoice'
    }else{
      templateName = 'invoice_mechanic'
    }

    const uploadConfig = {
      method: 'post',
      url: 'https://graph.facebook.com/v17.0/105166259352255/media',
      headers: { 
        'Authorization': `Bearer ${process.env.WA_ACCESS_TOKEN}`, 
        ...formData.getHeaders()
      },
      data : formData
    };

    axios(uploadConfig)
    .then(function (response) {
      successFields.push("Invoice Uploaded to meta servers.")
      const mediaId= JSON.stringify(response.data.id)
      axios({
        method: 'POST',
          url: 'https://graph.facebook.com/v14.0/105166259352255/messages',
          data: {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: "+1111111111",
            type: "template",
            template: {
                name: templateName,
                language: {
                    code: "en_US"
                },
                components: [
                  {
                    type: "header",
                    parameters: [
                      {
                          type: "document",
                          document: {
                            id: "677770800570630",
                            filename: `${vehicleNumber} Invoice`
                          }
                      }
                    ]
                  },
                  {
                    type: "body",
                    parameters: [
                      {
                          type: "text",
                          text: customerName
                      },
                      {
                        type: "text",
                        text: vehicleNumber
                      }
                    ]
                  }
                ]
              }
          },
          headers: {
              "Authorization": `Bearer ${process.env.WA_ACCESS_TOKEN}`,
              "Content-Type": "application/json"
          }
      }).then(result => {
        successFields.push("Message sent successfully.")
      }).catch(err => {
        logger.error("Error sending the invoice message:", err)
        errorFields.push('Error sending the template message')
        console.log(err)
      })
  })
  .catch(function (error) {
    logger.error("Error Uploading the invoice media to whatsapp:", error);
    errorFields.push('Error Uploading the media to whatsapp')
    console.log(error.message)
  });
    return { errorFields, successFields}
}

const sendBookingConfirmation = async(customerName, vehicleNumber, phoneNumber) => {
  try{
    axios({
    method: 'POST',
        url: 'https://graph.facebook.com/v14.0/105166259352255/messages',
        data: {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: "+111111111",
            type: "template",
            template: {
                name: "booking_confirmation",
                language: {
                    code: "en_US"
                },
                components: [
                    {
                    type: "body",
                    parameters: [
                        {
                            type: "text",
                            text: customerName
                        },
                        {
                            type: "text",
                            text: vehicleNumber
                        }
                    ]
                    }
                ]
            }
        },
        headers: {
            "Authorization": `Bearer ${process.env.WA_ACCESS_TOKEN}`,
            "Content-Type": "application/json"
        }
      })
  }catch(error){
    logger.error('Error sending booking confirmation:', error)
  }
}

const sendBookingAlertToAdmin = async( customerName, vehicleNumber, vehicleMake, vehicleModel, phoneNumber) => {
  try{
    axios({
    method: 'POST',
    url: 'https://graph.facebook.com/v14.0/105166259352255/messages',
    data: {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "+111111111",
        type: "template",
        template: {
            name: "booking_notification",
            language: {
                code: "en_US"
            },
            components: [
                {
                type: "body",
                parameters: [
                    {
                        type: "text",
                        text: vehicleNumber
                    },
                    {
                        type: "text",
                        text: vehicleMake
                    },
                    {
                        type: "text",
                        text: vehicleModel
                    },
                    {
                        type: "text",
                        text: customerName
                    },
                    {
                        type: "text",
                        text: customerPhoneNo
                    }
                ]
                }
            ]
        }
    },
    headers: {
        "Authorization": `Bearer ${process.env.WA_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
    }
    })

    axios({
    method: 'POST',
    url: 'https://graph.facebook.com/v14.0/105166259352255/messages',
    data: {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "+1111111111",
        type: "template",
        template: {
            name: "booking_notification",
            language: {
                code: "en_US"
            },
            components: [
                {
                type: "body",
                parameters: [
                    {
                        type: "text",
                        text: customerName
                    },
                    {
                        type: "text",
                        text: vehicleMake
                    },
                    {
                        type: "text",
                        text: vehicleModel
                    },
                    {
                        type: "text",
                        text: customerName
                    },
                    {
                        type: "text",
                        text: customerPhone
                    }
                ]
                }
            ]
        }
    },
    headers: {
        "Authorization": `Bearer ${process.env.WA_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
    }
    })
  }catch(error){
    logger.error("Error sending booking alert to admins:", error)
  }
}

const sendBirthdayOffer = async(customerName, phoneNumber) => {
    //Uploading to whatsapp server
    const formData = new FormData();
    const filePath = path.join(__dirname, '../assets/uploads/', 'birthday.png');
    formData.append('file', fs.createReadStream(filePath));
    formData.append('type', 'application/pdf');
    formData.append('messaging_product', 'whatsapp');

    const uploadConfig = {
      method: 'post',
      url: 'https://graph.facebook.com/v17.0/105166259352255/media',
      headers: { 
        'Authorization': `Bearer ${process.env.WA_ACCESS_TOKEN}`, 
        ...formData.getHeaders()
      },
      data : formData
    };

    axios(uploadConfig)
    .then(function (response) {
      successFields.push("Invoice Uploaded to meta servers.")
      const mediaId= JSON.stringify(response.data.id)
      axios({
        method: 'POST',
            url: 'https://graph.facebook.com/v14.0/105166259352255/messages',
            data: {
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: "+1111111111",
              type: "template",
              template: {
                  name: "birthday_offer",
                  language: {
                      code: "en_US"
                  },
                  components: [
                    {
                        type: "header",
                        parameters: [
                            {
                                type: "image",
                                image: {
                                  id: mediaId
                                }
                            }
                        ]
                      },
                      {
                        type: "body",
                        parameters: [
                            {
                                type: "text",
                                text: customerName
                            }
                        ]
                      }
                  ]
              }
            },
            headers: {
                "Authorization": `Bearer ${process.env.WA_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
      }).then(result => {
        successFields.push("Message sent successfully.")
      }).catch(err => {
        logger.error("Error sending the birthaday message", err)
      })
    })
    .catch(function (error) {
      logger.error("Error Uploading the birthday media to whatsapp", error);
    });
}

const sendEngineOilReminder = async( customerName, phoneNumber ) => {
    //Uploading to whatsapp server
    const formData = new FormData();
    const filePath = path.join(__dirname, '../assets/uploads/', 'engineoil.png');
    formData.append('file', fs.createReadStream(filePath));
    formData.append('type', 'application/pdf');
    formData.append('messaging_product', 'whatsapp');

    const uploadConfig = {
      method: 'post',
      url: 'https://graph.facebook.com/v17.0/105166259352255/media',
      headers: { 
        'Authorization': `Bearer ${process.env.WA_ACCESS_TOKEN}`, 
        ...formData.getHeaders()
      },
      data : formData
    };

    axios(uploadConfig)
    .then(function (response) {
      const mediaId= JSON.stringify(response.data.id)
      axios({
        method: 'POST',
            url: 'https://graph.facebook.com/v14.0/105166259352255/messages',
            data: {
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: "+111111111111",
              type: "template",
              template: {
                  name: "engineoil_alert",
                  language: {
                      code: "en_US"
                  },
                  components: [
                      {
                        type: "header",
                        parameters: [
                            {
                                type: "image",
                                image: {
                                  id: mediaId
                                }
                            }
                        ]
                      },
                      {
                        type: "body",
                        parameters: [
                            {
                                type: "text",
                                text: customerName
                            }
                        ]
                      }
                  ]
              }
            },
            headers: {
                "Authorization": `Bearer ${process.env.WA_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
      }).catch(err => {
        logger.error("Error sending the engine oil reminder message:", err)
      })
    })
    .catch(function (error) {
      logger.error("Error Uploading the engine oil reminder media to whatsapp", error);
    });
}

const sendServiceDueReminder = async( customerName, phoneNumber, specialPrice, regularPrice, daysValid ) => {
  //Uploading to whatsapp server
  const formData = new FormData();
  const filePath = path.join(__dirname, '../assets/uploads/', 'service.png');
  formData.append('file', fs.createReadStream(filePath));
  formData.append('type', 'application/pdf');
  formData.append('messaging_product', 'whatsapp');

  const uploadConfig = {
    method: 'post',
    url: 'https://graph.facebook.com/v17.0/105166259352255/media',
    headers: { 
      'Authorization': `Bearer ${process.env.WA_ACCESS_TOKEN}`, 
      ...formData.getHeaders()
    },
    data : formData
  };

  axios(uploadConfig)
  .then(function (response) {
    const mediaId= JSON.stringify(response.data.id)
    axios({
      method: 'POST',
          url: 'https://graph.facebook.com/v14.0/105166259352255/messages',
          data: {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: "+111111111111111",
            type: "template",
            template: {
                name: "engineoil_alert",
                language: {
                    code: "en_US"
                },
                components: [
                    {
                      type: "header",
                      parameters: [
                          {
                              type: "image",
                              image: {
                                id: mediaId
                              }
                          }
                      ]
                    },
                    {
                      type: "body",
                      parameters: [
                          {
                            type: "text",
                            text: customerName
                          },
                          {
                            type: "text",
                            text: specialPrice
                          },
                          {
                            type: "text",
                            text: regularPrice
                          },
                          {
                            type: "text",
                            text: daysValid
                          }
                      ]
                    }
                ]
            }
          },
          headers: {
              "Authorization": `Bearer ${process.env.WA_ACCESS_TOKEN}`,
              "Content-Type": "application/json"
          }
    }).catch(err => {
      logger.error("Error sending the Service Due reminder message:", err)
    })
  })
  .catch(function (error) {
    logger.error("Error Uploading the Service Due reminder media to whatsapp:", error);
  });
}

const sendAdComapign = async( data, imagePath ) => {
  //Uploading to whatsapp server
  const formData = new FormData();
  formData.append('file', fs.createReadStream(imagePath));
  formData.append('type', 'application/pdf');
  formData.append('messaging_product', 'whatsapp');

  const uploadConfig = {
    method: 'post',
    url: 'https://graph.facebook.com/v17.0/105166259352255/media',
    headers: { 
      'Authorization': `Bearer ${process.env.WA_ACCESS_TOKEN}`, 
      ...formData.getHeaders()
    },
    data : formData
  };

  axios(uploadConfig)
  .then(function (response) {
    const mediaId= JSON.stringify(response.data.id)
    const promises = data.forEach(obj => {
      let name = obj['Name'];
      const phoneNumber = obj['Phone Number'];
      if(name === undefined){
        name = "Rider"
      }
      return sendAllAdCampaign(name, phoneNumber, mediaId);
    });
    Promise.all(promises)
      .catch((error) => {
          logger.error('Error sending Ad Campaign:', error);
      });
  })
  .catch(function (error) {
    logger.error("Error Uploading the ad campaign media to whatsapp", error);
  });

  const sendAllAdCampaign = ( name, phoneNumber, mediaId) => {
    axios({
      method: 'POST',
          url: 'https://graph.facebook.com/v14.0/105166259352255/messages',
          data: {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: "+11111111111111",
            type: "template",
            template: {
                name: "offers",
                language: {
                    code: "en_US"
                },
                components: [
                    {
                      type: "header",
                      parameters: [
                          {
                              type: "image",
                              image: {
                                id: mediaId
                              }
                          }
                      ]
                    },
                    {
                      type: "body",
                      parameters: [
                          {
                              type: "text",
                              text: name.split(' ')[0]
                          }
                      ]
                    }
                ]
            }
          },
          headers: {
              "Authorization": `Bearer ${process.env.WA_ACCESS_TOKEN}`,
              "Content-Type": "application/json"
          }
    }).catch(err => {
      logger.error("Error sending the ad campaign message:", err)
    })
  }
}

module.exports = {
    sendInvoice,
    sendBookingConfirmation,
    sendBookingAlertToAdmin,
    sendBirthdayOffer,
    sendEngineOilReminder,
    sendAdComapign,
    sendServiceDueReminder
}