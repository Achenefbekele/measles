const express = require("express");
const cors = require("cors");
const generateInsights = require("./insightGenerator");
const captureDashboard = require("./dashboardCapture");
const sendEmail = require("./emailService");

const app = express();
app.use(cors());

app.get("/api/measles-data", async (req, res) => {
    try {
        const insights = await generateInsights();
        res.json(Object.entries(insights).map(([period, data]) => ({
            period,
            newCases: data.newCases,
            followUp: data.followUp,
            referrals: data.referrals
        })));
    } catch (error) {
        res.status(500).send("Error fetching data");
    }
});

app.get("/send-report", async (req, res) => {
    try {
        const imagePath = await captureDashboard();
        await sendEmail(imagePath);
        res.status(200).send("Report sent successfully.");
    } catch (error) {
        res.status(500).send("Error sending report.");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
