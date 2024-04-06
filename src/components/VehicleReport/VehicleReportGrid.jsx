import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faIdCard } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

const VehicleReportGrid = ({ report }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  // const [exportType, setExportType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const gridRef = useRef(null);

  const handlePlateButtonClick = (data, mode) => {
    setSelectedData(data);
    setSelectedMode(mode);
  };

  const handlePhotoButtonClick = (data, mode) => {
    setSelectedData(data);
    setSelectedMode(mode);
  };

  const exportToCsv = () => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.exportDataAsCsv();
    } else {
      console.error("Grid API is not available.");
    }
  };
  const exportToExcel = () => {
    if (gridRef.current && gridRef.current.api.getColumnDefs) {
      const columnDefs = gridRef.current.api.getColumnDefs();
      const columnNames = columnDefs.map((colDef) => colDef.field);

      const rowData = gridRef.current.api
        .getModel()
        .rowsToDisplay.map((rowNode) => rowNode.data);

      const excelData = [
        columnNames,
        ...rowData.map((row) => columnNames.map((colName) => row[colName])),
      ];

      const ws = XLSX.utils.aoa_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "CarReport");

      XLSX.writeFile(wb, "CarReport.xlsx");
    } else {
      console.error(
        "Grid reference is not available or getColumnDefs is not a function."
      );
    }
  };

  const columnDefs = [
    { headerName: "Vehicle No", field: "vehicleNo" },
    {
      headerName: "Vehicle Type",
      field: "vehicleType",
      valueGetter: function (params) {
        const originalValue = params.data.vehicleType;
        const words = originalValue.split(" ");
        const capitalizedFirstWord =
          words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return (
          capitalizedFirstWord +
          (words.length > 1 ? " " + words.slice(1).join(" ") : "")
        );
      },
    },
    { headerName: "Entry Gate", field: "entryGate.name" },
    { headerName: "Exit Gate", field: "exitGate.name" },
    { headerName: "Entry Date & Time", field: "entryDateTime" },
    { headerName: "Exit Date & Time", field: "exitDateTime" },
    { headerName: "Duration Of Stay", field: "durationOfStay" },
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
    <div className="d-flex flex-column" style={{ height: "600px" }}>
      {/* Dropdown for export options */}
      <div className="dropdown align-self-end" style={{ marginBottom: "10px" }}>
        <button
          className="btn-sm btn-primary dropdown-toggle"
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen ? "true" : "false"}
        >
          Export
        </button>
        <div
          className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
          aria-labelledby="exportDropdown"
          style={{ zIndex: 1000 }}
        >
          <button onClick={exportToCsv} className="dropdown-item" type="button">
            Export to CSV
          </button>
          <button
            onClick={exportToExcel}
            className="dropdown-item"
            type="button"
          >
            Export to Excel
          </button>
        </div>
      </div>
      <div
        className="ag-theme-quartz mt-2 "
        style={{ height: "400px", width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          {...gridOptions}
          onGridReady={(params) => {
            params.api.sizeColumnsToFit();
          }}
        />

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
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>

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
                {selectedData && selectedMode && (
                  <img
                    src={
                      selectedMode === "entry"
                        ? selectedData.entryVehicleImage
                        : selectedData.exitVehicleImage
                    }
                    alt={
                      selectedMode === "entry" ? "Entry Photo" : "Exit Photo"
                    }
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleReportGrid;
