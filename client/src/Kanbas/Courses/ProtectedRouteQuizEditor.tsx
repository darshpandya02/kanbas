import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function ProtectedRouteQuizEditor({
  children,
}: {
  children: any;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();

  if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
    return children;
  } else {
    return <Navigate to={`/Kanbas/Courses/${cid}/Quizzes`} />;
  }
}
