import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { options, type DateFilter } from "@/lib/data";

const DateTimeFilter = ({
  dateQuery,
  setDateQuery,
}: {
  dateQuery: DateFilter;
  setDateQuery: React.Dispatch<React.SetStateAction<DateFilter>>;
}) => {
  return (
    <Combobox<DateFilter>
      items={options}
      value={dateQuery}
      onValueChange={(option) => {
        setDateQuery(option ?? dateQuery);
      }}
      itemToStringValue={(option) => option.label}
    >
      <ComboboxInput readOnly placeholder="Enter a option" />
      <ComboboxContent>
        <ComboboxList>
          {(option: DateFilter) => {
            return (
              <ComboboxItem key={option.value} value={option}>
                {option.label}
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default DateTimeFilter;
