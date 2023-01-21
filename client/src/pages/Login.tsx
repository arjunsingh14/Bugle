import React from "react";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import secure from "../assets/secure.svg";
import loginService from "../services/services";
import { FormField } from "../components/FormField";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import { regOrLog } from "../features/auth";
import { setSource } from "../features/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  interface storeState {
    email: string | null;
    token: string | null;
    register: boolean;
    topHeadlines: object[];
    filteredHeadlines: object[];
    sources: string[];
    country: string;
  }
  const navigate = useNavigate();
    const { email } = useSelector<RootState, storeState>((state) => state.reducer);
  useEffect(() => {
    if (email) {
      navigate("/news")
    }
  }, [email, navigate]);
  
  const dispatch = useDispatch();
  const initialState = { username: "", email: "", password: "" };
  const { register } = useSelector<RootState, storeState>((state) => state.reducer);
  const [user, setUser] = useState(initialState);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setUser({ ...user, [target.name]: target.value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = user;
    if (!user.email || !user.password) {
      console.log("Email or password is missing");
      return;
    }
    const data = await loginService.loginUser({
      email,
      password,
    });
    window.localStorage.setItem("user", JSON.stringify(data.user));
    window.localStorage.setItem("token", data.token);
    dispatch(
      loginUser({ token: `bearer ${data.token}`, email: data.user.email })
    );
    dispatch(setSource({sources: data.user.sources}))
    setUser(initialState);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password, username } = user;
    if (!user.email || !user.password || !user.username) {
      console.log("Email or password is missing");
      return;
    }
    const data = await loginService.registerUser({
      email,
      password,
      username,
    });
    window.localStorage.setItem("user", JSON.stringify(data.user));
    window.localStorage.setItem("token", data.token);

    dispatch(
      loginUser({ token: `bearer ${data.token}`, email: data.user.email })
    );
     dispatch(setSource({ sources: data.user.sources }));
    setUser(initialState);
  };
  return (
    <section className="h-screen">
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img src={secure} className="w-full" alt="Phone image" />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
            <form onSubmit={register ? handleRegister : handleLogin}>
              {register ? (
                <div className="mb-6">
                  <FormField
                    name="username"
                    placeholder="Username"
                    value={user.username}
                    handleChange={handleChange}
                  />
                </div>
              ) : null}
              <FormField
                value={user.email}
                placeholder="Email address"
                name="email"
                handleChange={handleChange}
              />
              <FormField
                value={user.password}
                placeholder="Password"
                name="password"
                handleChange={handleChange}
              />
              {register ? (
                <>
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-secondary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-white hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Sign up
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Have an account?
                    <a
                      href="#!"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                      onClick={() => dispatch(regOrLog({ isReg: !register }))}
                    >
                      Login
                    </a>
                  </p>
                </>
              ) : (
                <>
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-secondary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-white hover:shadow-lg hover:text-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <a
                      href="#!"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                      onClick={() => dispatch(regOrLog({ isReg: !register }))}
                    >
                      Register
                    </a>
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
