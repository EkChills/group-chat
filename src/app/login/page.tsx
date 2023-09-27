import LoginInputs from "@/components/LoginInputs";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";

interface Props {}

const LoginPage = async ({}: Props) => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <>
    <div className="bg-gray-900 text-white shadow-lg min-h-screen">

<div className="p-8 sm:hidden">

  <div className="flex flex-col">

    <h2 className="text-xl font-bold text-indigo-400">Login</h2>

    <p className="text-gray-400 mt-2 text-base font-medium mb-10">
      Add details to login
    </p>

    <LoginInputs />

  </div>

</div>

<div className="hidden sm:flex items-center justify-center bg-gray-900 min-h-screen w-full">

  <div className="rounded-lg">


    <div className="px-10 py-10 bg-gray-800 shadow-md rounded-xl border border-gray-700">

      <div className="flex flex-col">

        <h2 className="text-xl font-bold text-indigo-400">Login</h2>

        <p className="text-gray-400 mt-2 text-base font-medium mb-10">
          Add details to login  
        </p>

        <LoginInputs />

      </div>

    </div>

  </div>

</div>

</div>
    </>
  );
};

export default LoginPage;
