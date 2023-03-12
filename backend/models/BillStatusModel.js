// import connection
import mongoose from "mongoose";

// define BillStatus schema
const billStatusSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  bill_id: {
    type: String,
  },
  bill_total: {
    type: Number,
    required: true,
  },
  bill_status: {
    type: Number,
    default: 0,
  },
  bill_paid: {
    type: Boolean,
    default: false,
  },
});

// create BillStatus model
const BillStatus = mongoose.model("BillStatus", billStatusSchema);

// get newest Bill Status
export const getNewestId = async (result) => {
  try {
    const newestBill = await BillStatus.findOne()
      .sort({ bill_id: -1 })
      .limit(1);
    result(null, newestBill);
  } catch (err) {
    console.log(err);
    result(err, null);
  }
};

// insert Bill Status
export const insertBillStatus = async (data, result) => {
  try {
    const newBillStatus = await BillStatus.create(data);
    result(null, newBillStatus);
  } catch (err) {
    console.log(err);
    result(err, null);
  }
};

// get all Bills Status by user
export const getBillsByUser = async (id, result) => {
  try {
    const bills = await BillStatus.find({ user_id: id });
    result(null, bills);
  } catch (err) {
    console.log(err);
    result(err, null);
  }
};

// get Bill Status by bill ID
export const getBillsByBill = async (id, result) => {
  try {
    const bill = await BillStatus.findOne({ bill_id: id });
    result(null, bill);
  } catch (err) {
    console.log(err);
    result(err, null);
  }
};

// get all Bills Status
export const getAll = async (result) => {
  try {
    const bills = await BillStatus.find({});
    result(null, bills);
  } catch (err) {
    console.log(err);
    result(err, null);
  }
};

// update Bill Status
export const updateStatus = async (id, result) => {
  try {
    const updatedBill = await BillStatus.findOneAndUpdate(
      { bill_id: id },
      { bill_total: total },
      { $inc: { bill_status: 1 } },
      { new: true }
    );
    result(null, updatedBill);
  } catch (err) {
    console.log(err);
    result(err, null);
  }
};

// update Bill Status to paid
export const updatePaid = async (id, result) => {
  try {
    const updatedBill = await BillStatus.findOneAndUpdate(
      { bill_id: id },
      { bill_total: total },
      { bill_paid: true },
      { new: true }
    );
    result(null, updatedBill);
  } catch (err) {
    console.log(err);
    result(err, null);
  }
};

// cancel Bill Status
export const cancelStatus = async (id, result) => {
  try {
    const updatedBill = await BillStatus.findOneAndUpdate(
      { bill_id: id },
      { bill_total: total },
      { bill_status: 0, bill_paid: false },
      { new: true }
    );
    result(null, updatedBill);
  } catch (err) {
    console.log(err);
    result(err, null);
  }
};
