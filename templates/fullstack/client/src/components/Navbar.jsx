import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";

function Navbar() {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">MyApp</h1>
        <div className="flex gap-4 items-center">
          <Link
            to="/"
            className={`text-sm hover:text-indigo-600 ${pathname === "/" ? "text-indigo-600" : "text-gray-700"}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm hover:text-indigo-600 ${pathname === "/about" ? "text-indigo-600" : "text-gray-700"}`}
          >
            About
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-indigo-600">Login</Link>
              <Link to="/register" className="text-sm text-gray-700 hover:text-indigo-600">Register</Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
              <button
                onClick={() => dispatch(logoutUser())}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
