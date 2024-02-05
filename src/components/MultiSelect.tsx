import { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { CaretSortIcon, Cross2Icon } from "@radix-ui/react-icons";
import { ScrollArea } from "./ScrollArea";

export type Option = {
  label: string;
  value: string;
};

export type MultiSelectProps = {
  value: Option[];
  onChange: (option: Option[]) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  children: React.ReactNode;
};

export const MultiSelect = ({
  value: valueFromProps,
  onChange,
  searchValue,
  onSearchChange,
  children,
}: MultiSelectProps) => {
  const [value, setValue] = useState(valueFromProps);

  useEffect(() => {
    setValue(valueFromProps);
  }, [valueFromProps]);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const removeSelected = (option: Option) => {
    setValue((prev) => prev.filter((o) => o.value !== option.value));
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className="relative" id="multi-select">
          <div className="w-full cursor-pointer rounded-md border px-9 py-1 pl-3">
            <div className="flex flex-wrap items-center gap-2">
              {value.map((option) => {
                return (
                  <MultiSelectPill
                    key={option.value}
                    option={option}
                    removeSelected={removeSelected}
                  />
                );
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
          <ScrollArea>{children}</ScrollArea>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

type MultiSelectPillProps = {
  option: Option;
  removeSelected: (option: Option) => void;
};

const MultiSelectPill = ({ option, removeSelected }: MultiSelectPillProps) => {
  return (
    <span className="inline-flex h-6 items-center rounded-md bg-gray-100 pl-2">
      <span className="text-xs">{option.label}</span>
      <button
        className="flex h-full items-center pl-0.5 pr-1"
        onClick={() => removeSelected(option)}
      >
        <Cross2Icon className="h-3 w-3" />
      </button>
    </span>
  );
};
