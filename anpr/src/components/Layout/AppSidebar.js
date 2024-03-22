import React from "react";

export default function AppSidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link">
        <img
          src="/anpr.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light">ANPR</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
          >
            <li className="nav-item text-left">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-car"></i>
                <p>
                  Vehicle Report
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/vehicle-report" className="nav-link">
                    <i className="fas fa-file-alt nav-icon"></i>
                    <p>Report</p>
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a href="!" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Resumes</p>
                  </a>
                </li> */}
              </ul>
            </li>
          </ul>
          {/* <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
          >
            <li className="nav-item text-left">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>
                  Candidate Matching
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="!" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Candidates</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="!" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Job Descriptions</p>
                  </a>
                </li>
              </ul>
            </li>
          </ul> */}
        </nav>
      </div>
    </aside>
  );
}
