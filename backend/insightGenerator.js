const fetchMeaslesData = require("./fetchDHIS2Data");

const generateInsights = async () => {
    const data = await fetchMeaslesData();
    
    let insights = {};

    data.forEach(entry => {
        if (!insights[entry.period]) {
            insights[entry.period] = { newCases: 0, followUp: 0, referrals: 0 };
        }

        if (entry.dataElement.includes("NewCases")) {
            insights[entry.period].newCases += entry.value;
        } else if (entry.dataElement.includes("FollowUp")) {
            insights[entry.period].followUp += entry.value;
        } else if (entry.dataElement.includes("Referrals")) {
            insights[entry.period].referrals += entry.value;
        }
    });

    return insights;
};

module.exports = generateInsights;
