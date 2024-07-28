import { useState } from 'react';
import { IoMdEye,  IoMdEyeOff } from "react-icons/io";
import {   useSelector } from "react-redux";


const TextInput = ({ type, placeholder, onChangeFunc , styles, label, labelStyles, ref, register, name, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const theme = useSelector((state)=> state.theme.theme)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='w-full flex flex-col mt-2'>
            {label && (
                <p className={`text-ascent2 text-sm mb-2 ${labelStyles} `}>
                    {label}
                </p>
            )}

{type === 'password' ? (
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name={name}
                        placeholder={placeholder}
                        ref={ref}
                        onChange = {onChangeFunc}
                        className={`bg-secondary rounded border w-full border-[#66666690] outline-none text-sm text-ascent1 px-4 py-3  placeholder:text-[#666] ${styles}`}
                        {...register}
                    />
                    {showPassword ? (
                        <IoMdEyeOff className={`absolute top-4 right-3 cursor-pointer ${theme !== "light" ? 'text-gray-400' : "text-gray-600"}`} onClick={togglePasswordVisibility} />
                    ) : (
                        <IoMdEye className={`absolute top-4 right-3 cursor-pointer ${theme !== "light" ? 'text-gray-400' : "text-gray-600"} `} onClick={togglePasswordVisibility} />
                    )}
                </div>
            ) : (
                <div className="">
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        ref={ref}
                        onChange = {onChangeFunc}
                        className={`bg-secondary rounded border w-full border-[#66666690] outline-none text-sm text-ascent1 px-4 py-3  placeholder:text-[#666] ${styles}`}
                        {...register}
                    />
                </div>
            )}
            {error && (
                <span className="text-red-500 text-sm mt-1">{error}</span>
            )}
        </div>
    );
}

export default TextInput;
