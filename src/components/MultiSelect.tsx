import * as Popover from "@radix-ui/react-popover";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { CaretSortIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Character } from "../types";
import { useState } from "react";

type MultiSelectProps = {
  data?: Character[];
  value?: number[];
  onChange?: (value: string[]) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

export const MultiSelect = ({
  data,
  searchValue,
  onSearchChange,
}: MultiSelectProps) => {
  const [value, setValue] = useState<number[]>([]);

  const addSelected = (id: number) => {
    setValue((prev) => [...prev, id]);
  };

  const removeSelected = (id: number) => {
    setValue((prev) => prev.filter((value) => value !== id));
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className="relative" id="multi-select">
          <div className="w-full cursor-pointer rounded-md border px-9 py-1 pl-3">
            <div className="flex flex-wrap items-center gap-2">
              {value.map((id) => {
                const character = data?.find((c) => c.id === id);
                return character ? (
                  <MultiSelectPill key={id} character={character} />
                ) : null;
              })}
              <input
                className="h-6 flex-1 text-sm"
                placeholder="Pick value"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          </div>
          <div className="absolute right-0 top-0 flex h-full w-9 items-center justify-center">
            <button>
              <CaretSortIcon />
            </button>
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={9}
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <ScrollArea.Root className="ScrollAreaRoot overflow-hidden bg-white">
            <ScrollArea.Viewport className="h-full w-full rounded-md border bg-gray-50">
              <div className="h-72">
                {data?.map((character) => (
                  <MultiSelectOption
                    key={character.id}
                    character={character}
                    selected={value.includes(character.id)}
                    addSelected={addSelected}
                    removeSelected={removeSelected}
                  />
                ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex h-full w-2.5 touch-none select-none border-l border-l-transparent p-[1px] transition-colors"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-200" />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const MultiSelectPill = ({ character }: { character: Character }) => {
  return (
    <span className="inline-flex h-6 items-center rounded-md bg-gray-100 pl-2">
      <span className="text-xs">{character.name}</span>
      <button className="flex h-full items-center pl-0.5 pr-1">
        <Cross2Icon className="h-3 w-3" />
      </button>
    </span>
  );
};

type MultiSelectOptionProps = {
  character: Character;
  selected: boolean;
  addSelected: (id: number) => void;
  removeSelected: (id: number) => void;
};

const MultiSelectOption = ({
  character,
  selected,
  addSelected,
  removeSelected,
}: MultiSelectOptionProps) => {
  return (
    <div
      className="flex items-center gap-2 border-b p-2 last:border-b-0"
      role="option"
      onClick={() =>
        selected ? removeSelected(character.id) : addSelected(character.id)
      }
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
