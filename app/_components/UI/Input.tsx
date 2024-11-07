import React, { ReactNode } from "react";

type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export default function Input({
  defaultValue,
  prefix,
  type,
  name,
}: {
  defaultValue?: any;
  prefix?: ReactNode;
  type: HTMLInputTypeAttribute;
  name: string;
}) {
  if (prefix)
    return (
      <div
        className={`border border-border w-full rounded-lg py-3 px-5 text- items-center justify-start flex gap-3 bg-white text-preset-4`}
      >
        <div className="text-border text-xl">{prefix}</div>
        <input
          defaultValue={defaultValue}
          name={name}
          type={type}
          className={`w-full h-full outline-none text-navbar`}
        />
      </div>
    );
  return (
    <input
      defaultValue={defaultValue}
      type={type}
      name={name}
      className="border border-border w-full rounded-lg py-3 px-5 text-black outline-none text-preset-4"
    />
  );
}
