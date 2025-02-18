import React from "react";
import axios from "axios";

const ReportButton = () => {
  const sendReport = () => {
    axios.get("http://localhost:5000/send-report")
      .then(() => alert("Report sent successfully!"))
      .catch(() => alert("Failed to send report."));
  };

  return (
    <div className="text-center mt-4">
      <button className="btn btn-primary" onClick={sendReport}>
        Send Report Now
      </button>
    </div>
  );
};

export default ReportButton;
