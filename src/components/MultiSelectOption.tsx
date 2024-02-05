import { Option } from "./MultiSelect";
import { Character } from "../types";

export type MultiSelectOptionProps = {
  character: Character;
  value: Option[];
  setValue: React.Dispatch<React.SetStateAction<Option[]>>;
};

export const MultiSelectOption = ({
  character,
  value,
  setValue,
}: MultiSelectOptionProps) => {
  const selected = value.some((v) => v.value === character.id.toString());

  const removeSelected = (option: Option) => {
    setValue((prev) => prev.filter((o) => o.value !== option.value));
  };

  const addSelected = (option: Option) => {
    setValue((prev) => [...prev, option]);
  };

  const onSelect = () => {
    if (selected) {
      removeSelected({ label: character.name, value: character.id.toString() });
    } else {
      addSelected({ label: character.name, value: character.id.toString() });
    }
  };

  return (
    <div
      className="flex cursor-pointer items-center gap-2 border-b p-2 transition-colors last:border-b-0 hover:bg-gray-100"
      role="option"
      onClick={onSelect}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => e.stopPropagation()}
      />
      <img
        src={character.image}
        alt={character.name}
        className="h-9 w-9 rounded-md"
      />
      <div className="flex flex-1 flex-col">
        <span className="text-sm">{character.name}</span>
        <span className="text-xs text-gray-500">
          {character.episode.length} Episodes
        </span>
      </div>
    </div>
  );
};
