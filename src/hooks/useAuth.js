import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../store/actions";
import { selectUser, selectIsLoggedIn } from "../store/selectors";

const useAuth = () => {
  const dispatch    = useDispatch();
  const user        = useSelector(selectUser);
  const isLoggedIn  = useSelector(selectIsLoggedIn);

  return {
    user,
    isLoggedIn,
    login:  (userData) => dispatch(setUser(userData)),
    logout: ()         => dispatch(logout()),
  };
};

export default useAuth;