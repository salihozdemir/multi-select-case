import { Option } from "./MultiSelect";
import { Character } from "../types";

export type MultiSelectOptionProps = {
  character: Character;
  selected: boolean;
  addSelected: (option: Option) => void;
  removeSelected: (option: Option) => void;
};

export const MultiSelectOption = ({
  character,
  selected,
  addSelected,
  removeSelected,
}: MultiSelectOptionProps) => {
  const onSelect = () => {
    if (selected) {
      removeSelected({ label: character.name, value: character.id.toString() });
    } else {
      addSelected({ label: character.name, value: character.id.toString() });
    }
  };

  return (
    <div
      className="flex items-center gap-2 border-b p-2 last:border-b-0"
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