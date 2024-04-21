import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const isToken = !!localStorage.getItem("refreshToken");
  // 필요할 경우 여기에 토큰 자체가 유효한지 검증하는 로직을 추가한다.
  return isToken ? <Outlet /> : <Navigate to="/login" />;
}
