import React from "react";
import { authenticateAndGetUserId, getPots } from "../_lib/data-service";
import PotCard from "./PotCard";
import EmptyState from "./EmptyState";
import { FaSackDollar } from "react-icons/fa6";

export default async function PotsCardsList() {
  const userId = await authenticateAndGetUserId();
  const pots = await getPots(userId);
  const sortedPots = pots.toSorted(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  if (sortedPots.length === 0) {
    return (
      <EmptyState
        title="No pots created yet"
        message="Add a pot to set a savings target and start putting money aside for something that matters."
        icon={<FaSackDollar className="size-7" />}
      />
    );
  }

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
