import Image from "next/image";
import React, { ReactNode } from "react";
import avatar from "@/public/avatars/elevate-education.jpg";
import billPaid from "@/public/icon-bill-paid.svg";
import billDue from "@/public/icon-bill-due.svg";
export default function BillsTable() {
  return (
    <>
      <table className="w-full mt-6 divide-y divide-seperator">
        <thead className="hidden md:table-header-group mb-6 my-3">
          <TR className="text-start">
            <TH>Bill Title</TH>
            <TH>Due Date</TH>
            <TH>Amount</TH>
          </TR>
        </thead>
        <tbody className="divide-y divide-seperator">
          <TR>
            <BillsTitle image={avatar} title="Elevate Education" />
            <DueDate date="Monthly - 1st" due={false} />
            <Amount amount={75.5} due={true} />
          </TR>
          <TR>
            <BillsTitle image={avatar} title="Elevate Education" />
            <DueDate date="Monthly - 1st" due={false} />
            <Amount amount={75.5} due={false} />
          </TR>
          <TR>
            <BillsTitle image={avatar} title="Elevate Education" />
            <DueDate date="Monthly - 1st" due={false} />

            <Amount amount={75.5} due={false} />
          </TR>
          <TR>
            <BillsTitle image={avatar} title="Elevate Education" />
            <DueDate date="Monthly - 1st" due={false} />

            <Amount amount={75.5} due={true} />
          </TR>
          <TR>
            <BillsTitle image={avatar} title="Elevate Education" />
            <DueDate date="Monthly - 1st" due={false} />

            <Amount amount={75.5} due={false} />
          </TR>
          <TR>
            <BillsTitle image={avatar} title="Elevate Education" />
            <DueDate date="Monthly - 1st" due={false} />

            <Amount amount={75.5} due={true} />
          </TR>
        </tbody>
      </table>
    </>
  );
}
function TD({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`${className} p-0 md:p-4 `}>{children}</td>;
}

function TR({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={`${className} grid grid-cols-2 md:table-row text-secondary text-preset-5`}
    >
      {children}
    </tr>
  );
}

function TH({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th className={`${className} text-start text-preset-5 text-secondary p-4`}>
      {children}
    </th>
  );
}

type TitleType = {
  image: any;
  title: string;
};
function BillsTitle({ image, title }: TitleType) {
  return (
    <TD className="flex items-center justify-start gap-4 pb-2 pt-5 md:py-4 col-span-2 self-start">
      <Image
        src={image}
        alt={`${title}'s avatar`}
        className="size-10 rounded-full"
      />

      <p className="text-primary text-preset-4-bold">{title}</p>
    </TD>
  );
}
function Amount({ due, amount }: { due: boolean; amount: number }) {
  return (
    <TD
      className={`${
        due === false ? "text-primary" : "text-red"
      } text-preset-4-bold pb-5 md:pb-4 justify-self-end`}
    >
      ${amount.toFixed(2)}
    </TD>
  );
}
function DueDate({ date, due }: { date: string; due: boolean }) {
  return (
    <TD className="text-preset-5 text-green">
      {date}{" "}
      <span className="inline-flex ml-2">
        {due ? (
          <Image src={billDue} alt="Bill due icon" />
        ) : (
          <Image src={billPaid} alt="bill paid icon" />
        )}
      </span>
    </TD>
  );
}
