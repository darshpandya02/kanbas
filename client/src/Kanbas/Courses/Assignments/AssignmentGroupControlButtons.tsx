import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import ProtectedRouteRole from "../ProtectedRouteRole";
export default function AssignmentGroupControlButtons() {
  return (
    <div className="float-end d-flex">
      <div
        className="border border-dark d-block me-2"
        style={{ borderRadius: "20px" }}
      >
        <span className="fw-normal m-3">40% of Total</span>
      </div>
      <ProtectedRouteRole>
        <BsPlus className="fs-4" />
      </ProtectedRouteRole>
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
