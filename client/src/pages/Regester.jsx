import { useState } from "react";
import { TbSocial } from "react-icons/tb";
import TextInput from "../components/TextInput";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";
import BgImg from "../assets/bgImag.jpg";
import { BsShare } from "react-icons/bs";
import { ImConnection } from "react-icons/im";
import { AiOutlineInteraction } from "react-icons/ai";
import axios from "axios";
import { setLogin } from "../redux/userSlice";
import { FaCamera } from "react-icons/fa";
const Regester = () => {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [userImg, setUserImg] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fNameError, setFNameError] = useState("");
  const [sNameError, setSNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [genderError, setGenderError] = useState("")
  const [gender, setGender] = useState("");

  const regesterFunc = (formData) => {
    setLoading(true);
    axios
      .post("http://localhost:3001/auth/register", formData)
      .then(({ data }) => {
        console.log("regester Data", data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data); // Access error response
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset previous errors
    setEmailError("");
    setPasswordError("");
    setFNameError("");
    setSNameError("");

    // Validate form fields
    if (!firstName.trim()) {
      setFNameError("Please enter your first name.");
      return;
    }
    if (!secondName.trim()) {
      setSNameError("Please enter your second name.");
      return;
    }
    if (!email.trim()) {
      setEmailError("Please enter your email.");
      return;
    }
    if (!password.trim()) {
      setPasswordError("Please enter your password.");
      setConfirmPasswordError("");
      return;
    }
    if (password !== confirmPassword ) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }
    if (!gender) {
      setGenderError("Please select your gender.");
      return;
    }
    setGenderError('')

    const formData = new FormData();

    // Append form data
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName", secondName);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("picture", userImg); // Append the file object
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    console.log("Form submitted with:", formData);
    regesterFunc(formData);
  };
  return (
    <div className="bg-bgColor h-[100vh] p-6 flex items-center justify-center ">
      <div className="w-full  md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl">
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center ">
          <div className="w-full flex gap-2  items-center mb-6 ">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <TbSocial />
            </div>
            <span className="text-2xl text-[#065ad8] font-semibold">
              ShareFuns
            </span>
          </div>
          <p className="text-ascent1 text-base font-semibold ">
            Create Account
          </p>
          <span className="text-sm mt-2 text-ascent2">Welcome Back</span>
          <form onSubmit={handleSubmit} className="py-8 flex flex-col gap-5">
            <div className="flex gap-2">
              <TextInput
                type="text"
                placeholder="Frist Name"
                label={"Frist Name"}
                value={firstName}
                onChangeFunc={(e) => {
                  setfirstName(e.target.value);
                  setFNameError("");
                }}
                styles={"w-1/2"}
                error={fNameError}
              />
              <TextInput
                type="text"
                label={"Second Name"}
                placeholder="Second Name"
                value={secondName}
                onChangeFunc={(e) => {
                  setSecondName(e.target.value);
                  setSNameError("");
                }}
                styles={"w-1/2"}
                error={sNameError}
              />
            </div>
            <TextInput
              type="file"
              label={
                <>
                  {" "}
                  <p> {"Profile Image"}</p> <FaCamera />
                </>
              }
              labelStyles={"flex items-center gap-2"}
              placeholder="select Image "
              value={userImg}
              onChangeFunc={(e) => {
                setUserImg(e.target.files[0]);
              }}
              styles={" file:hidden "}
            />
            <TextInput
              type="text"
              placeholder="Email"
              label={"Email"}
              value={email}
              onChangeFunc={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              styles={""}
              error={emailError}
            />
            <div className="flex gap-2">
              <TextInput
                type="password"
                label={"Enter Password"}
                placeholder="Password"
                value={password}
                onChangeFunc={(e) =>{ setPassword(e.target.value) ;
                setPasswordError("")}}
                error={passwordError}
                styles={""}
              />
              <TextInput
                type="password"
                label={"Confirm Password"}
                placeholder="Repassword"
                value={confirmPassword}
                onChangeFunc={(e) => {setConfirmPassword(e.target.value)
                  setConfirmPasswordError('')
                }
                }
                error={confirmPasswordError}
                styles={""}
              />
            </div>
            <div className="flex flex-col justify-start">
              <label className="text-ascent2 text-sm mb-2" >Gender:</label>
              <div className="flex items-center my-3  ">
                <label className="flex items-center ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <input
                    type="radio"
                    value="male"
                    className="w-4 h-4 text-blue-600 mx-1 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />{" "}
                  Male
                </label>
                
                <label className="flex items-center ms-2 text-sm font-medium text-gray-500 dark:text-gray-400 ">
                  <input
                    type="radio"
                    value="female"
                    className="w-4 h-4 text-blue-600 mx-1 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />{" "}
                  Female
                </label>
              </div>
              {genderError && <span className="text-red-500">{genderError}</span>}
            </div>

            {error?.message && (
              <span
                className={`${
                  error?.status === "faild" ? "text-[#f65]" : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {error?.message}
              </span>
            )}

            {loading ? (
              <Loading />
            ) : (
              <CustomButton
                type="submit"
                title="Sign Up"
                containerStyles={` inline-flex w-full justify-center rounded-md bg-blue px-3 text-sm font-medium text-white outline-none p-1 mb-2 `}
              />
            )}
          </form>
          <div className="">
            <span className="text-sm text-ascent2 ">
              Do you have an account?
              <Link to={"/login"} className="text-sm text-blue font-semibold">
                {" "}
                Sign in
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

export default Regester;
