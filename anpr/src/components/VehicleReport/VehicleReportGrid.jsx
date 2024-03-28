import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";

// const [showVehicleModal, setVehicleShowModal] = useState(false);
// const [showVehiclePlateModal, setVehiclePlateShowModal] = useState(false);

// const handlePlateButtonClick = (platePhoto) => {
//   setSelectedCandidate(candidate);
//   setShowModal(true);
// };

const VehicleReportGrid = ({ report }) => {
  const columnDefs = [
    { headerName: "Vehicle No", field: "vehicleNo" },
    { headerName: "Vehicle Type", field: "vehicleType" },
    { headerName: "Gate No", field: "gateNo" },
    { headerName: "Visit Type", field: "visitType" },
    { headerName: "Visit Date & Time", field: "visitDateTime" },
    {
      headerName: "View Photo",
      cellRenderer: (params) => (
        <div style={{ marginLeft: "55px", marginBottom: "56px" }}>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            // data-bs-toggle="modal"
            // data-bs-target="#vehiclePlateModal"
            // onClick={() => handlePlateButtonClick(params.data)}
          >
            <FontAwesomeIcon icon={faCar} />
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm "
            // data-bs-toggle="modal"
            // data-bs-target="#vehiclePhotoModal"
            // onClick={() => handlePhotoButtonClick(params.data)}
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
    </div>
  );
};

export default VehicleReportGrid;
