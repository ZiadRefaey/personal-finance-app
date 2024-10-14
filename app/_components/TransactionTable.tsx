import React, { ReactNode } from "react";
import avatar from "@/public/avatars/emma-richardson.jpg";
import Image from "next/image";

export default function TransactionTable() {
  return (
    <table className="w-full mt-6 divide-y divide-seperator">
      <thead className="hidden md:table-header-group mb-6 my-3">
        <TR className="text-start">
          <TH>Recepient / Sender</TH>

          <TH>Category</TH>

          <TH>Transaction Date</TH>

          <TH>Amount</TH>
        </TR>
      </thead>
      <tbody className="divide-y divide-seperator">
        <TR>
          <TableTitle
            category="Personal Care"
            image={avatar}
            name="Emma Richardson"
          />
          <Category>Personal Care</Category>
          <TD>19 Aug 2024</TD>
          <Amount amount={75.5} deposite={true} />
        </TR>
        <TR>
          <TableTitle
            category="Personal Care"
            image={avatar}
            name="Emma Richardson"
          />
          <Category>Personal Care</Category>
          <TD>19 Aug 2024</TD>
          <Amount amount={75.5} deposite={true} />
        </TR>
        <TR>
          <TableTitle
            category="Personal Care"
            image={avatar}
            name="Emma Richardson"
          />
          <Category>Personal Care</Category>
          <TD>19 Aug 2024</TD>
          <Amount amount={75.5} deposite={true} />
        </TR>
        <TR>
          <TableTitle
            category="Personal Care"
            image={avatar}
            name="Emma Richardson"
          />
          <Category>Personal Care</Category>
          <TD>19 Aug 2024</TD>
          <Amount amount={75.5} deposite={true} />
        </TR>
        <TR>
          <TableTitle
            category="Personal Care"
            image={avatar}
            name="Emma Richardson"
          />
          <Category>Personal Care</Category>
          <TD>19 Aug 2024</TD>
          <Amount amount={75.5} deposite={false} />
        </TR>
        <TR>
          <TableTitle
            category="Personal Care"
            image={avatar}
            name="Emma Richardson"
          />
          <Category>Personal Care</Category>
          <TD>19 Aug 2024</TD>
          <Amount amount={75.5} deposite={true} />
        </TR>
      </tbody>
    </table>
  );
}
function TD({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`${className} p-0 md:p-4 self-center`}>{children}</td>;
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
      className={`${className} grid grid-cols-[63%,1fr] grid-rows-2 md:table-row  text-secondary text-preset-5`}
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
function Amount({ deposite, amount }: { deposite: boolean; amount: number }) {
  return (
    <TD
      className={`${
        deposite === true ? "text-green" : "text-red"
      } text-preset-4-bold`}
    >
      {deposite ? "+" : "-"}
      {amount.toFixed(2)}
    </TD>
  );
}

type TitleType = {
  image: any;
  name: string;
  category: string;
};
function TableTitle({ image, name, category }: TitleType) {
  return (
    <TD className="flex items-center justify-start gap-4 row-span-2 py-4">
      <Image
        src={image}
        alt={`${name}'s avatar`}
        className="size-10 rounded-full"
      />
      <div className="flex flex-col gap-1">
        <p className="text-primary text-preset-4-bold">{name}</p>
        <p className="text-preset-5 text-secondary">{category}</p>
      </div>
    </TD>
  );
}
function Category({ children }: { children: ReactNode }) {
  return <TD className="hidden md:table-cell">{children}</TD>;
}
