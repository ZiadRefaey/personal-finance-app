import React from "react";
import Card from "./Card";
import TableControls from "./TableControls";

export default function DataTable() {
  return (
    <Card className="w-full bg-card-back-ground">
      <TableControls />
    </Card>
  );
}
