import { useSelector } from "react-redux";
export default function ProtectedRouteRole({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN") {
    return children;
  } else {
    return <span />;
  }
}
