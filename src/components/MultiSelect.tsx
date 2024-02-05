import { useEffect, useRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { CaretSortIcon, Cross2Icon, UpdateIcon } from "@radix-ui/react-icons";
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
  children?: React.ReactNode;
  loading?: boolean;
};

export const MultiSelect = ({
  value: valueFromProps,
  onChange,
  searchValue,
  onSearchChange,
  children,
  loading,
}: MultiSelectProps) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(valueFromProps);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(valueFromProps);
  }, [valueFromProps]);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  useEffect(() => {
    if (searchValue) {
      if (!open) setOpen(true);
    }
  }, [searchValue, open]);

  const removeSelected = (option: Option) => {
    setValue((prev) => prev.filter((o) => o.value !== option.value));
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div className="relative">
          <div className="w-full cursor-pointer rounded-md border px-9 py-1 pl-3">
            <div className="flex flex-wrap items-center gap-2">
              {value.map((option) => (
                <MultiSelectPill
                  key={option.value}
                  option={option}
                  removeSelected={removeSelected}
                />
              ))}
              <input
                ref={searchRef}
                className="h-6 flex-1 text-sm outline-none"
                placeholder="Pick value"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
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
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            searchRef.current?.focus();
          }}
        >
          <ScrollArea>
            {loading ? (
              <div className="flex h-full items-center justify-center p-2">
                <UpdateIcon className="h-4 w-4 animate-spin text-gray-500" />
              </div>
            ) : children ? (
              <div className="h-72">{children}</div>
            ) : (
              <p className="p-2 text-gray-500">Nothing found</p>
            )}
          </ScrollArea>
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
        className="flex h-full items-center pl-0.5 pr-1 transition-transform active:translate-y-[1px]"
        onClick={(e) => {
          e.preventDefault();
          removeSelected(option);
        }}
      >
        <Cross2Icon className="h-3 w-3" />
      </button>
    </span>
  );
};
