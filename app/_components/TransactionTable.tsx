import React, { ReactNode } from "react";

export default function TransactionTable() {
  return (
    <table className="w-full mt-6 bg-red p-4 ">
      <thead className="mb-6 my-3">
        <tr className="text-start">
          <TH>Recepient / Sender</TH>

          <TH>Category</TH>

          <TH>Transaction Date</TH>

          <TH>Amount</TH>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ali</td>
          <td>Entertainment</td>
          <td>12 / 6 / 2014</td>
          <td>$350.00</td>
        </tr>
        <tr>
          <td>Ali</td>
          <td>Entertainment</td>
          <td>12 / 6 / 2014</td>
          <td>$350.00</td>
        </tr>
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
  return <td className={className}>{children}</td>;
}

function TR({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <tr className={className}>{children}</tr>;
}

function TH({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th className={`${className} text-start text-preset-5 text-secondary`}>
      {children}
    </th>
  );
}
