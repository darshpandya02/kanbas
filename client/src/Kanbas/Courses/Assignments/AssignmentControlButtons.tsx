import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import DeleteAssignmentDialog from "./DeleteAssignmentDialog";
import { useState } from "react";
export default function LessonControlButtons({
  assignmentId,
  currentAssignmentId,
  setId,
  deleteAssignment,
}: {
  assignmentId: string;
  currentAssignmentId: string;
  setId: (id: string) => void;
  deleteAssignment: (assignmentId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="float-end d-flex">
      {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
        <FaTrash
          data-bs-toggle="modal"
          data-bs-target="#wd-add-module-dialog"
          className="text-danger position-relative me-4 ms-2 fs-4"
          onClick={(e) => setId(assignmentId)}
        />
      )}
      <FaCheckCircle
        className="position-relative me-4 ms-2 fs-4"
        style={{ color: "green" }}
      />
      <IoEllipsisVertical className="fs-4" />
      <DeleteAssignmentDialog
        assignmentId={currentAssignmentId}
        deleteAssignment={deleteAssignment}
      />
    </div>
  );
}
