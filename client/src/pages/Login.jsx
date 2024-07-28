import { useState } from "react";
import { TbSocial } from "react-icons/tb";
import TextInput from "../components/TextInput";
import { Link } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import BgImg from "../assets/bgImag.jpg";
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";
import axios from "axios";
import { setLogin } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
 const user = useSelector((state)=> state.user)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logInFunc = (email, password) => {
    setLoading(true);
    axios
      .post("http://localhost:3001/auth/login", { email, password })
      .then(({ data }) => {
        console.log("login Data", data);
        dispatch(setLogin(data)) ;
        console.log(typeof setLogin);
        // dispatch(setLogin({ token: data.token, user: data.user }));
        console.log(user)
        setLoading(false);
        console.log( "user", user)
        if(data.message) {
          message(data.message)
        }
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
        // setError(error);
        setLoading(false);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset previous errors
    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!email.trim()) {
      setEmailError("Please enter your email.");
      return;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      return;
    }

    // Here you can add further validation or form submission logic
    console.log("Form submitted with:", { email, password });
    logInFunc(email, password);
  };

  return (
    <div className="bg-bgColor h-[100vh] p-6 flex items-center justify-center ">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl">
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center ">
          <div className="w-full flex gap-2 items-center mb-6 ">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <TbSocial />
            </div>
            <span className="text-2xl text-[#065ad8] font-semibold">
              ShareFuns
            </span>
          </div>
          <p className="text-ascent1 text-base font-semibold ">
            Log In To Your Account
          </p>
          <span className="text-sm mt-2 text-ascent2">Welcome Back</span>
          <form onSubmit={handleSubmit} className="py-8 flex flex-col gap-5">
            {/* TextInput components with state and onChange handlers */}
            <TextInput
              type="text"
              placeholder="Email"
              value={email}
              onChangeFunc={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              styles={"rounded-full"}
              error={emailError}
            />
            <TextInput
              type="password"
              placeholder="Password"
              value={password}
              onChangeFunc={(e) => setPassword(e.target.value)}
              error={passwordError}
              styles={"rounded-full"}
            />
            {error?.message && (
              <span
                className={`${
                  error?.status === "faild" ? "text-[#f65]" : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {error?.message}
              </span>
            )}
            <Link
              to={"/reset-password"}
              className="text-sm text-right text-blue font-semibold"
            >
              Forget Password ?
            </Link>
            {loading ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                title="Login"
                containerStyles={` inline-flex w-full justify-center rounded-md bg-blue px-3 text-sm font-medium text-white outline-none p-1 mb-2 `}
              />
            )}
          </form>
          <div className="">
            <span className="text-sm text-ascent2 ">
              Don't have an account?
              <Link
                to={"/register"}
                className="text-sm text-blue font-semibold"
              >
                {" "}
                Sign Up
              </Link>
            </span>
          </div>
        </div>
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue">
          <div className="relative w-full flex items-center justify-center">
            <div className="w-48 h-48 2xl:h-64 2xl:w-64">
              <img
                src={BgImg}
                alt="bg image"
                className="w-full rounded-full object-cover"
              />
            </div>
            <div className="absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full ">
              <BsShare size={14} />
              <span className="text-xs font-medium">Share</span>
            </div>
            <div className="absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full ">
              <ImConnection size={14} />
              <span className="text-xs font-medium">Connect</span>
            </div>
            <div className="absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full ">
              <AiOutlineInteraction size={14} />
              <span className="text-xs font-medium">Interact</span>
            </div>
          </div>
          <div className="mt-16 text-center">
            <p className="text-white text-base ">
              Connnect with me friends & have share for fun
            </p>
            <span className="text-sm text-white/80">
              Share memories with others
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
