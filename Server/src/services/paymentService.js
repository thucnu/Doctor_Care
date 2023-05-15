const Stripe = require("stripe");
import { v4 as uuidv4 } from "uuid";
const db = require("../models");
import emailService from "../services/emailService";
import moment from 'moment';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const CHECKOUT_COMPLETE = "checkout.session.completed";
const REFUND_COMPLETE = "charge.refunded";

async function createCheckoutSession(data) {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        const token = uuidv4();
        const dataSaved = await saveData(data, token);
        const session = await stripe.checkout.sessions.create(
          await sessionConfig(data, token, dataSaved.bookingId)
        );
        resolve({
          errCode: 0,
          checkoutURL: session.url,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}

async function createRefund(billId) {
  const bill = await db.Bill.findOne({
    where: {
      id: billId,
    },
  });
  if (!bill) {
    throw new Error("Hóa đơn không tồn tại");
  }

  const refundAmount = await getRefundAmount(bill.total, billId);
  console.log("refundAmount", refundAmount);

  await refundCompletedHandler(bill.bookingId);
  // await emailService.emailRefund(data);
  return await stripe.refunds.create({
    payment_intent: bill.stripe_payment_id,
    amount: refundAmount,
  });
}

async function getRefundAmount(total, billId) {
  const bill = await db.Bill.findOne({
    where: {
      id: billId,
    },
    raw: false,
  });
  const hoursRemain = moment().diff(moment(bill.createdAt), "hours");
  console.log("hoursRemain", hoursRemain);
  if (hoursRemain <= 12) {
    return total * 0.9;
  }else{
    return 0;
  }
}

async function refundCompletedHandler(bookingId) {
  const booking = await db.Booking.findOne({
    where: {
      id: bookingId,
    },
    raw: false,
  });

  if (!booking) {
    throw new Error("Lịch hẹn không tồn tại");
  }

  booking.statusId = "S4";
  await booking.save();

  const schedule = await db.Schedule.findOne({
    where: {
      doctorId: booking.doctorId,
      date: booking.date,
      timeType: booking.timeType,
    },
    raw: false,
  });
  schedule.status = true;
  await schedule.save();
}

async function eventHandler(data, type, metadata) {
  return new Promise(async (resolve, reject) => {
    try {
      switch (type) {
        case CHECKOUT_COMPLETE:
          console.log("metadata", metadata, data);
          checkCompletedHandler(data, metadata);
          break;
        case REFUND_COMPLETE:
          console.log("REFUND_COMPLETE", data.payment_intent);
          // await emailService.emailRefund(data);
          default:
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

async function saveData(data, token) {
  //upsert patient(sequielize)
  let user = await db.User.findOne({
    where: { email: data.email },
  });
  let bookingId = "";
  if (user) {
    const booking = await db.Booking.findOrCreate({
      where: {
        doctorId: data.doctorId,
        date: data.date,
        timeType: data.timeType,
        token: token,
      },
      defaults: {
        statusId: "S1",
        doctorId: data.doctorId,
        patientId: user.id,
        date: data.date,
        timeType: data.timeType,
        token: token,
      },
    });
    bookingId = booking[0].dataValues.id;
  } else {
    return null;
  }

  let schedule = await db.Schedule.findOne({
    where: {
      doctorId: data.doctorId,
      date: data.date,
      timeType: data.timeType,
      status: true,
    },
    raw: false,
  });

  if (schedule) {
    schedule.status = false;
    await schedule.save();
  } else {
    return null;
  }

  return {
    data: user,
    bookingId: bookingId,
  };
}

async function sessionConfig(data, token, bookingId) {
  return {
    line_items: [
      {
        price_data: {
          currency: "vnd",
          product_data: {
            name: data.doctorName,
          },
          unit_amount: data.doctorPrice,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer_email: data.email,
    submit_type: "pay",
    locale: "vi",
    success_url: buildUrlEmail(data.doctorId, token),
    cancel_url: "http://localhost:3000/",
    metadata: [bookingId, token],
  };
}

let buildUrlEmail = (doctorId, token) => {
  return `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
};

async function checkCompletedHandler(data, metadata) {
  const bill = await db.Bill.create({
    bookingId: metadata["0"],
    keyMap: metadata["1"],
    stripe_payment_id: data.payment_intent,
    total: data.amount_total,
  });
  const booking = await db.Booking.findOne({
    where: {
      id: metadata["0"],
    },
    raw: false,
  });
  if (booking) {
    booking.billId = bill.id;
    await booking.save();
  }
}

module.exports = {
  createCheckoutSession,
  createRefund,
  eventHandler,
};
