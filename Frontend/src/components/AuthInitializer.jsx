import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../Redux/slice/authSlice";
import Loading from "./Loading";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, user, loading, error, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("AuthInitializer running", { isLoggedIn, user, loading, error, initialized });

    // Only fetch current user if we haven't initialized yet
    if (!initialized) {
      console.log("Fetching current user...");
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, initialized]);

  // Show loading while initializing auth state
  if (!initialized && loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg"><Loading/></div>
      </div>
    );
  }

  // Render children once auth is initialized
  return children;
};

export default AuthInitializer;