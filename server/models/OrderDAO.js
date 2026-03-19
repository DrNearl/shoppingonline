const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const OrderSchema = mongoose.Schema({
  _id: ObjectId,
  cdate: Number,
  total: Number,
  customer: Object,
  items: Array
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

}

module.exports = OrderDAO;