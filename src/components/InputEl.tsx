"use client"

import { FieldError, FieldErrorsImpl, FieldValues, Merge, Path, UseFormRegister } from "react-hook-form";
import Image from 'next/image'
import { UserType } from "@/lib/types/formTypes";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label:Path<UserType>;
  placeholderText:string;
  id:string;
  type?:string;
  imagePath:string;
  isError?:FieldError | any;
  labelText?:string;
  register:UseFormRegister<UserType>
}
// interface IFormValues {
//   email: string;
//   password: number;
//   confirmPassword:string;
// }



const InputEl = ({label, placeholderText,register, id,type,imagePath,isError,labelText, ...rest }:Props) => {
  return (
    <div>

    <label htmlFor={id} className="text-gray-400 text-sm font-medium">
      {labelText}
    </label>

    <div className={`flex px-4 py-3 items-center space-x-4 rounded-lg bg-gray-800 border border-gray-700 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500`}>
    
      <Image src={imagePath} alt="email" width={18} height={18} />

      <input 
        type={type}
        className="bg-transparent text-gray-300 placeholder-gray-500 flex-1 outline-none"
        placeholder={placeholderText} 
        {...register(label, {required: true})} 
        {...rest}
      />

      {isError && (
        <span className="text-pink-500 text-sm font-medium truncate">
          {isError.message}
        </span>  
      )}
    
    </div>

  </div>
)
  
}

export default InputEl