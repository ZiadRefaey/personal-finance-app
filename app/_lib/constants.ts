export const sortingOptions = [
  { display: "latest", value: { id: "date", desc: true } },
  { display: "oldest", value: { id: "date", desc: false } },
  { display: "A to Z", value: { id: "name", desc: false } },
  { display: "Z to A", value: { id: "name", desc: true } },
  { display: "highest", value: { id: "amount", desc: true } },
  { display: "lowest", value: { id: "amount", desc: false } },
];
