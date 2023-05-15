const stripePayment = require("../services/paymentService");

const checkout = async (req, res) => {
  try {
    const data = req.body;
    const session = await stripePayment.createCheckoutSession(data);
    res.status(200).json({
      errCode: 0,
      checkoutURL: session.checkoutURL,
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const refund = async (req, res) => {
  try {
    const keys = Object.keys(req.body);
    const billId = keys[0];
    console.log("billId", billId);
    if (!billId) {
      res.status(200).json({
        errCode: 1,
        errMessage: "Missing parameter",
      });
    }
    const refund = await stripePayment.createRefund(billId);
    if (!refund) {
      res.status(200).json({
        errCode: 1,
        errMessage: "Refund fail",
      });
    }
    res.status(200).json({
      errCode: 0,
      errMessage: "Success",
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const webhook = async (req, res) => {
  try {
    const data = req.body;
    const type = data.type;
    const metadata = data.data.object.metadata;
    await stripePayment.eventHandler(data.data.object, type, metadata);

    res.status(200).json({
      errCode: 0,
      errMessage: "Success",
    });
  } catch (e) {
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

module.exports = {
  checkout,
  refund,
  webhook,
};
