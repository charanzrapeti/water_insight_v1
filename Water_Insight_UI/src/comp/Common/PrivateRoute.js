import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/auth";

function PrivateRoute({ comp }) {
  const loggedIn = useAuthStore(state => state.loggedIn)

  return loggedIn
    ? comp
    : <Navigate to="/login" replace />
}

export default PrivateRoute