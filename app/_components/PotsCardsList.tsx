import React from "react";
import { authenticateAndGetUserId, getPots } from "../_lib/data-service";
import PotCard from "./PotCard";

export default async function PotsCardsList() {
  const userId = await authenticateAndGetUserId();
  const pots = await getPots(userId);
  const sortedPots = pots.toSorted(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {sortedPots.map((pot) => (
        <PotCard
          id={pot.id}
          color={pot.color}
          saved={pot.saved}
          goal={pot.goal}
          title={pot.title}
          key={pot.title}
        />
      ))}
    </div>
  );
}
