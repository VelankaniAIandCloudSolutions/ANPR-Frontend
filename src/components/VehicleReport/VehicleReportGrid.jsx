import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faIdCard } from "@fortawesome/free-solid-svg-icons";

const VehicleReportGrid = ({ report }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const handlePlateButtonClick = (data, mode) => {
    setSelectedData(data);
    setSelectedMode(mode);

    // Optionally, you can open the modal here
    // setShowPlateModal(true);
  };

  const handlePhotoButtonClick = (data, mode) => {
    setSelectedData(data);
    setSelectedMode(mode);

    // Optionally, you can open the modal here
    // setShowPhotoModal(true);
  };

  const columnDefs = [
    { headerName: "Vehicle No", field: "vehicle.plate_number" },
    { headerName: "Vehicle Type", field: "vehicle.vehicle_type" },

    { headerName: "Entry Gate", field: "entryGate.name" },
    { headerName: "Exit Gate", field: "exitGate.name" },

    { headerName: "Entry Date & Time", field: "entryDateTime" },
    { headerName: "Exit Date & Time", field: "exitDateTime" },
    {
      headerName: "Duration Of Stay",
      field: "durationOfStay",
    },

    {
      headerName: "Entry Photo",
      cellRenderer: (params) => (
        <div style={{ marginLeft: "55px", marginBottom: "56px" }}>
          <button
            type="button"
            className="btn btn-primary btn-sm mr-4"
            data-bs-toggle="modal"
            data-bs-target="#vehiclePlateModal"
            onClick={() => handlePlateButtonClick(params.data, "entry")}
          >
            <FontAwesomeIcon icon={faIdCard} />
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#vehiclePhotoModal"
            onClick={() => handlePhotoButtonClick(params.data, "entry")}
          >
            <FontAwesomeIcon icon={faCar} />
          </button>
        </div>
      ),
    },
    {
      headerName: "Exit Photo",
      cellRenderer: (params) => (
        <div style={{ marginLeft: "55px", marginBottom: "56px" }}>
          <button
            type="button"
            className="btn btn-primary btn-sm mr-4"
            data-bs-toggle="modal"
            data-bs-target="#vehiclePlateModal"
            onClick={() => handlePlateButtonClick(params.data, "exit")}
          >
            <FontAwesomeIcon icon={faIdCard} />
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#vehiclePhotoModal"
            onClick={() => handlePhotoButtonClick(params.data, "exit")}
          >
            <FontAwesomeIcon icon={faCar} />
          </button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  const gridOptions = {
    rowData: report,
    columnDefs: columnDefs,
    defaultColDef: defaultColDef,
    domLayout: "autoHeight",
    pagination: true,
    paginationPageSize: 10,
  };

  return (
    <div className="ag-theme-quartz" style={{ height: "400px", width: "100%" }}>
      <AgGridReact {...gridOptions} />

      {/* Vehicle Plate Modal */}
      <div
        className="modal fade"
        id="vehiclePlateModal"
        tabIndex="-1"
        aria-labelledby="vehiclePlateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="vehiclePlateModalLabel">
                Vehicle Plate Photo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body d-flex justify-content-center align-items-center"
              style={{ height: "500px" }}
            >
              {/* Modal body content */}
              {/* Modal body content */}
              {selectedData && selectedMode && (
                <img
                  src={
                    selectedMode === "entry"
                      ? selectedData.entryNumberPlateImage
                      : selectedData.exitNumberPlateImage
                  }
                  alt={
                    selectedMode === "entry"
                      ? "Entry Plate Photo"
                      : "Exit Plate Photo"
                  }
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Photo Modal */}
      <div
        className="modal fade"
        id="vehiclePhotoModal"
        tabIndex="-1"
        aria-labelledby="vehiclePhotoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="vehiclePhotoModal">
                Vehicle Photo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body d-flex justify-content-center align-items-center"
              style={{ height: "500px" }}
            >
              {/* Modal body content */}
              {selectedData && selectedMode && (
                <img
                  src={
                    selectedMode === "entry"
                      ? selectedData.entryVehicleImage
                      : selectedData.exitVehicleImage
                  }
                  alt={selectedMode === "entry" ? "Entry Photo" : "Exit Photo"}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleReportGrid;
