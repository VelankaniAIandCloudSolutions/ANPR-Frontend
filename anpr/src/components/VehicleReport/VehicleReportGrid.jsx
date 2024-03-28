import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faIdCard } from "@fortawesome/free-solid-svg-icons";

const VehicleReportGrid = ({ report }) => {
  const [selectedData, setSelectedData] = useState(null);

  const handlePlateButtonClick = (data) => {
    setSelectedData(data);
    // Optionally, you can open the modal here
    // setShowPlateModal(true);
  };

  const handlePhotoButtonClick = (data) => {
    setSelectedData(data);
    // Optionally, you can open the modal here
    // setShowPhotoModal(true);
  };

  const columnDefs = [
    { headerName: "Vehicle No", field: "vehicleNo" },
    { headerName: "Vehicle Type", field: "vehicleType" },
    { headerName: "Gate No", field: "gateNo" },
    { headerName: "Visit Type", field: "visitType" },
    { headerName: "Visit Date & Time", field: "visitDateTime" },
    {
      headerName: "View Vehicle Plate",
      cellRenderer: (params) => (
        <div style={{ marginLeft: "55px", marginBottom: "56px" }}>
          <button
            type="button"
            className="btn btn-primary btn-sm mr-3"
            data-bs-toggle="modal"
            data-bs-target="#vehiclePlateModal"
            onClick={() => handlePlateButtonClick(params.data)}
          >
            <FontAwesomeIcon icon={faIdCard} />
          </button>
        </div>
      ),
    },
    {
      headerName: "View Vehicle",
      cellRenderer: (params) => (
        <div style={{ marginLeft: "55px", marginBottom: "56px" }}>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#vehiclePhotoModal"
            onClick={() => handlePhotoButtonClick(params.data)}
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
              {selectedData && (
                <img
                  src={
                    selectedData.vehiclePlate ||
                    "https://5.imimg.com/data5/SELLER/Default/2023/6/319435546/YK/SK/FK/45631869/rto-approved-number-plate-500x500.jpeg"
                  }
                  alt="Vehicle Plate Photo"
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
              {selectedData && (
                <img
                  src={
                    selectedData.vehiclePhoto ||
                    "https://images.hindustantimes.com/auto/img/2022/08/24/1600x900/NHAI_toll_plaza_1661316843780_1661316843967_1661316843967.jpg"
                  }
                  alt="Vehicle Photo"
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
