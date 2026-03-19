const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const OrderSchema = mongoose.Schema({
  _id: ObjectId,
  cdate: Number,
  total: Number,
  customer: Object,
  items: Array,
  status: String
});

const Order = mongoose.model('order', OrderSchema);

class OrderDAO {

  static async insert(order) {
    const result = await Order.create(order);
    return result;
  }

  static async selectByCustID(cid) {
    const query = { "customer._id": cid };
    const orders = await Order.find(query).exec();
    return orders;
  }

  static async selectAll() {
    const query = {};
    const mysort = { cdate: -1 }; // descending
    const orders = await Order.find(query).sort(mysort).exec();
    return orders;
  }

  static async update(_id, newStatus) {
    const newvalues = { status: newStatus };
    const result = await Order.findByIdAndUpdate(_id, newvalues, { new: true });
    return result;
  }
}

module.exports = OrderDAO;