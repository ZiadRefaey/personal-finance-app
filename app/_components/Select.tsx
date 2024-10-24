import {
  Select as SelectContainer,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Select = {
  placeholder: string;
  items: any;
  valueChange: any;
};
export default function Select({ placeholder, items, valueChange }: Select) {
  return (
    <SelectContainer onValueChange={(value) => valueChange(value)}>
      <SelectTrigger className="max-w-[100px] w-auto md:max-w-auto bg-card-back-ground capitalize">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item: { display: string; value: any }, index: number) => (
          <SelectItem className="capitalize" key={index} value={item.value}>
            {item.display}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectContainer>
  );
}
