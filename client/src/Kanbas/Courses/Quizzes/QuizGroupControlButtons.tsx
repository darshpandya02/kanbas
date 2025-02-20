import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import ProtectedRouteRole from "../ProtectedRouteRole";

export default function QuizGroupControlButtons() {
  return (
    <div className="float-end d-flex">
      <ProtectedRouteRole>
        <BsPlus className="fs-4" />
      </ProtectedRouteRole>
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
