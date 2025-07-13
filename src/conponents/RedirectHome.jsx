import Link from "next/link";
import React from "react";

const RedirectHome = ({ title = "" }) => {
  return (
    <div className=" px-4  py-24 flex items-center justify-center flex-col gap-12">
      <p className=" px-6 text-center font-medium text-3xl md:text-4xl  tracking-wide text-neutral-400">
        {title}
      </p>
      <Link
        href="/"
        className=" mx-auto border py-2 px-5 rounded bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100"
      >
        Home
      </Link>
      <div />
    </div>
  );
};

export default RedirectHome;
