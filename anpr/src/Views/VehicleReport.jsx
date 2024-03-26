import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VehicleReportGrid from "./Views/VehicleReportGrid";

function VehicleReport() {
  const [report, setReport] = useState([]);

  const generateReport = () => {
    axios
      .get("get-vehicle-report")
      .then((response) => {
        setReport(response.data);
        toast.success("Report generated successfully");
      })
      .catch((error) => {
        toast.error("Failed to generate report");
        console.error("Error fetching report:", error);
      });
  };
  // State variables for start date and end date
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="container">
      <div className="row align-items-center">
        {/* Heading and Breadcrumb Column */}
        <div className="col-md-6 mt-4">
          <div className="d-flex align-items-center">
            <h2 className="mb-0">Report Generation</h2>
            <span className="ms-1 fs-2 text-muted">|</span>
            <nav aria-label="breadcrumb" className="d-inline-block ms-2">
              <ol className="breadcrumb bg-transparent m-0 p-0">
                <li className="breadcrumb-item active" aria-current="page">
                  <i className="fas fa-chart-bar me-1"></i>Report
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Button Column */}
        <div className="col-md-6 mt-4 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={generateReport}
          >
            Search <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      {/* Card for filters */}
      <div className="card mt-4">
        <div className="card-body">
          <div className="row">
            {/* Start Date Filter */}
            <div className="col-md-6">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {/* End Date Filter */}
            <div className="col-md-6">
              <label htmlFor="endDate" className="form-label">
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "25px" }}>
        <VehicleReportGrid report={report} />
      </div>
    </div>
  );
}

export default VehicleReport;
