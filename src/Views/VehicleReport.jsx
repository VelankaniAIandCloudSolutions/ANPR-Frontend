import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VehicleReportGrid from "../components/VehicleReport/VehicleReportGrid";

function VehicleReport() {
  const [report, setReport] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const generateReport = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const sampleData = [
        {
          id: 1,
          vehicleNo: "ABC123",
          vehicleType: "Truck",
          gateNo: "Gate 1",
          visitType: "Entry",
          visitDateTime: "2024-03-26 10:00:00",
        },
        {
          id: 2,
          vehicleNo: "XYZ789",
          vehicleType: "personal Vehicle",
          gateNo: "Gate 2",
          visitType: "Exit",
          visitDateTime: "2024-03-26 11:30:00",
        },
      ];
      setReport(sampleData);
      toast.success("Report generated successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to generate report");
      console.error("Error fetching report:", error);
      setLoading(false);
    }
  };

  // const generateReport = async () => {
  //   setLoading(true);
  //   await axios
  //     .post("anpr/get-vehicle-visit-report", {
  //       fromDate: startDate,
  //       toDate: endDate,
  //     })
  //     .then((response) => {
  //       const vehicleVisits = response.data;
  //       console.log(vehicleVisits);
  //       setReport(vehicleVisits);
  //       toast.success("Report generated successfully");
  //     })
  //     .catch((error) => {
  //       toast.error("Failed to generate report");
  //       console.error("Error fetching report:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  return (
    <div className="container">
      <div className="row align-items-center">
        {/* Heading and Breadcrumb Column */}
        <div className="col-md-6 mt-4">
          <div className="d-flex align-items-center">
            <h2 className="mb-0">Vehicle Visit Report</h2>
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

      <div className="mt-4">
        {loading ? (
          <div className="d-flex align-items-center">
            <strong role="status">Loading...</strong>
            <div
              className="spinner-border ms-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        ) : report.length > 0 ? (
          <VehicleReportGrid report={report} />
        ) : null}
      </div>
    </div>
  );
}

export default VehicleReport;
