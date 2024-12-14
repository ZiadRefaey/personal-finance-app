import { GoHomeFill } from "react-icons/go";
import { LuArrowUpDown } from "react-icons/lu";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FaSackDollar, FaStore } from "react-icons/fa6";
import { PiReceiptFill } from "react-icons/pi";
export const sortingOptions = [
  { display: "latest", value: { id: "date", desc: true } },
  { display: "oldest", value: { id: "date", desc: false } },
  { display: "A to Z", value: { id: "name", desc: false } },
  { display: "Z to A", value: { id: "name", desc: true } },
  { display: "highest", value: { id: "amount", desc: true } },
  { display: "lowest", value: { id: "amount", desc: false } },
];
const NavIconStyling = `size-6`;
export const NavLinks = [
  {
    icon: <GoHomeFill className={NavIconStyling} />,
    label: "Overview",
    href: "/",
  },
  {
    icon: <LuArrowUpDown className={NavIconStyling} />,
    label: "Transactions",
    href: "/transactions",
  },
  {
    icon: <BiSolidPieChartAlt2 className={NavIconStyling} />,
    label: "Budgets",
    href: "/budgets",
  },
  {
    icon: <FaSackDollar className={NavIconStyling} />,
    label: "Pots",
    href: "/pots",
  },
  {
    icon: <PiReceiptFill className={NavIconStyling} />,
    label: "Recurring bills",
    href: "/recurring-bills",
  },
  {
    icon: <FaStore className={NavIconStyling} />,
    label: "Vendors",
    href: "/vendors",
  },
];
