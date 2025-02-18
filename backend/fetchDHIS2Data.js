const axios = require('axios');
require('dotenv').config();

const fetchMeaslesData = async () => {
    try {
        const response = await axios.get(`${process.env.DHIS2_URL}/api/analytics.json`, {
            auth: {
                username: process.env.DHIS2_USERNAME,
                password: process.env.DHIS2_PASSWORD
            }
        });

        return response.data.rows.map(row => ({
            period: row[0],
            orgUnit: row[1],
            dataElement: row[2],
            value: parseInt(row[3], 10)
        }));
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return [];
    }
};

module.exports = fetchMeaslesData;
