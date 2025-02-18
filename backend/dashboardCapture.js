const puppeteer = require("puppeteer");

const captureDashboard = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto("https://play.im.dhis2.org/stable-2-41-3/dhis-web-dashboard/", { waitUntil: "networkidle2" });

    await page.type("#j_username", "admin");
    await page.type("#j_password", "district");
    await page.click("button[type='submit']");
    await page.waitForTimeout(5000);

    const imagePath = "measles_dashboard.png";
    await page.screenshot({ path: imagePath });

    await browser.close();
    return imagePath;
};

module.exports = captureDashboard;
