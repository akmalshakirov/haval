const cron = require("node-cron");
const Order = require("../../models/Order");

module.exports = function cancelUnpaidOrders() {
  cron.schedule("0 */2 * * *", async () => {
    try {
      const now = new Date();
      
      const orders = await Order.find({ status: "Pending" });

      let updatedCount = 0;

      for (const order of orders) {
        const elapsedHours = Math.floor((now - order.createdAt) / (1000 * 60 * 60));
        const remainingHours = 168 - elapsedHours; 

        if (remainingHours <= 0) {
          await Order.updateOne({ _id: order._id }, { status: "Cancelled" });
          updatedCount++;
        }
      }

      if (updatedCount > 0) {
        console.log(`${updatedCount} unpaid orders canceled.`);
      } else {
        console.log("No orders required cancellation.");
      }
      
    } catch (error) {
      console.error("Error processing unpaid orders:", error);
    }
  });
};
