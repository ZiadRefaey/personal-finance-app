import {
  Select as SelectContainer,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Select = {
  value: string;
  content: string[];
};
export default function Select({ value, content }: Select) {
  return (
    <SelectContainer>
      <SelectTrigger className="max-w-[100px] w-auto md:max-w-auto bg-card-back-ground">
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent>
        {content.map((value) => (
          <SelectItem className=" capitalize" key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectContainer>
  );
}
