const cron = require("node-cron");
const Order = require("../../models/Order");

module.exports = function cancelUnpaidOrders() {
  cron.schedule("0 0 * * *", async () => {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const result = await Order.updateMany(
        { createdAt: { $lt: sevenDaysAgo }, status: "Pending" },
        { status: "Cancelled" }  
      );

      if (result.modifiedCount > 0) {
        console.log(`${result.modifiedCount} unpaid orders canceled.`);
      } else {
        console.log("No unpaid orders to cancel.");
      }
    } catch (error) {
      console.error("Error canceling unpaid orders:", error);
    }
  });
};
