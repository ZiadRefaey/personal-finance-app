import Emma from "@/public/avatars/emma-richardson.jpg";
import Savory from "@/public/avatars/savory-bites-bistro.jpg";
import Daniel from "@/public/avatars/daniel-carter.jpg";
import Sun from "@/public/avatars/sun-park.jpg";
import Urban from "@/public/avatars/urban-services-hub.jpg";
import TransactionsTableSummary from "./TransactionsTableSummary";

type TransactionsType = {
  name: string;
  image: any;
  amount: string;
  date: string;
  deposite: boolean;
}[];

const TransactionsData: TransactionsType = [
  {
    name: "Emma Richardson",
    image: Emma,
    amount: "75.50",
    date: "19 Aug 2024",
    deposite: true,
  },
  {
    name: "Savory Bites Bistro",
    image: Savory,
    amount: "55.50",
    date: "19 Aug 2024",
    deposite: false,
  },
  {
    name: "Daniel Carter",
    image: Daniel,
    amount: "42.30",
    date: "18 Aug 2024",
    deposite: false,
  },
  {
    name: "Sun Park",
    image: Sun,
    amount: "120.00",
    date: "17 Aug 2024",
    deposite: true,
  },
  {
    name: "Urban Services Hub",
    image: Urban,
    amount: "65.00",
    date: "17 Aug 2024",
    deposite: false,
  },
];
export default function TransactionsOverview() {
  return (
    <TransactionsTableSummary
      bg="primary"
      transactions={TransactionsData}
      title="transactions"
    />
  );
}
