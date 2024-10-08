import React from "react";
import { IoIosSearch } from "react-icons/io";

export default function TableSearch({ placeHolder }: { placeHolder: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 rounded-lg bg-inherit border-border border w-full max-w-[320px]">
      <input
        className="border-none w-full placeholder:text-new outline-none text-primary text-preset-5 bg-inherit"
        placeholder={placeHolder}
      />
      <IoIosSearch className="size-[18px] text-primary" />
    </div>
  );
}
