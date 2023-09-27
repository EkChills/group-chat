import LoginInputs from "@/components/LoginInputs";
import RegisterInputs from "@/components/RegisterInputs";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

interface Props {}

const RegisterPage = async ({}: Props) => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <>
      <div className="bg-gray-900 text-white min-h-screen">

<div className="px-6 py-8 sm:hidden">

  <div className="flex flex-col items-center">

    <h2 className="text-2xl font-bold text-indigo-400">Create Account</h2>

    <p className="text-gray-500 text-center text-sm mt-3 font-medium">
      Let&apos;s get started sharing your links!
    </p>

    <RegisterInputs />

  </div>

</div>

<div className="hidden sm:flex items-center justify-center">

  <div className="bg-gray-800 shadow-lg rounded-lg px-10 py-12">

    <div className="flex flex-col items-center">

      <h2 className="text-2xl font-bold text-indigo-400">
        Create Account  
      </h2>

      <p className="text-gray-500 mt-3 text-center text-sm font-medium">
        Let&apos;s get started sharing your links!
      </p>

      <RegisterInputs />

    </div>

  </div>

</div>

</div>
    </>
  );
};

export default RegisterPage;
