const cron = require("node-cron");
const captureDashboard = require("./dashboardCapture");
const sendEmail = require("./emailService");
const generateInsights = require("./insightGenerator");

console.log("Scheduler is running...");

cron.schedule("0 6 * * 3", async () => { // Runs every Wednesday at 9:00 AM EAT (6:00 UTC)
    console.log("Fetching data, generating dashboard, and sending email...");

    try {
        await generateInsights();  // Fetches data from DHIS2
        const imagePath = await captureDashboard(); // Captures dashboard screenshot
        await sendEmail(imagePath); // Sends the email

        console.log("✅ Weekly report sent successfully.");
    } catch (error) {
        console.error("❌ Error sending weekly report:", error);
    }
});
