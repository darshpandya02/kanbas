import { FaPlus } from "react-icons/fa6";
import { FaCheckCircle, FaBan } from "react-icons/fa";

import ModuleEditor from "./ModuleEditor";
import { useSelector } from "react-redux";
import ProtectedRouteRole from "../ProtectedRouteRole";
export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-modules-controls" className="text-nowrap d-block mb-3 p-0">
      {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
        <button
          id="wd-add-module-btn"
          className="btn btn-lg btn-danger m-1 ms-1 float-end"
          data-bs-toggle="modal"
          data-bs-target="#wd-add-module-dialog"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Module
        </button>
      )}
      <div className="dropdown d-inline m-1 float-end">
        <ProtectedRouteRole>
          <button
            id="wd-publish-all-btn"
            className="btn btn-lg btn-secondary dropdown-toggle ms-1"
            type="button"
            data-bs-toggle="dropdown"
          >
            <FaCheckCircle
              className="position-relative me-2"
              style={{
                bottom: "1px",
                color: "green",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            Publish All
          </button>
        </ProtectedRouteRole>
        <ul className="dropdown-menu">
          <li>
            <div
              id="wd-publish-all-modules-and-items-btn"
              className="dropdown-item"
            >
              <FaCheckCircle
                className="position-relative me-2"
                style={{ bottom: "1px", color: "green" }}
              />
              Publish all modules and items
            </div>
          </li>
          <li>
            <div id="wd-publish-modules-only-button" className="dropdown-item">
              <FaCheckCircle
                className="position-relative me-2"
                style={{ bottom: "1px", color: "green" }}
              />
              Publish modules only
            </div>
          </li>
          <li id="wd-unpublish-all-modules-and-items">
            <div
              id="wd-unpublish-all-modules-and-items-button"
              className="dropdown-item"
            >
              <FaBan
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Unpublish all modules
            </div>
          </li>
          <li id="wd-unpublish-modules-only">
            <div
              id="wd-unpublish-modules-only-button"
              className="dropdown-item"
            >
              <FaBan
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Unpublish modules only
            </div>
          </li>
        </ul>
      </div>
      <button
        id="wd-view-progress"
        className="btn btn-lg btn-secondary m-1 float-end"
      >
        View Progress
      </button>
      <button
        id="wd-collapse-all"
        className="btn btn-lg btn-secondary m-1 float-end"
      >
        Collapse All
      </button>
      <ModuleEditor
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
