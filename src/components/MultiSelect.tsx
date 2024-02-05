import * as Popover from "@radix-ui/react-popover";
import { CaretSortIcon, Cross2Icon } from "@radix-ui/react-icons";

export const MultiSelect = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className="relative" id="multi-select">
          <div className="h-9 w-full cursor-pointer rounded-md border px-9 py-1 pl-3">
            <div className="flex flex-wrap items-center gap-2">
              <MultiSelectPill />
              <MultiSelectPill />
              <input className="h-6 flex-1 text-sm" placeholder="Pick value" />
            </div>
          </div>
          <div className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center">
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
          <div className="w-full rounded-md border bg-gray-50">
            <div className="flex items-center gap-2 border-b p-2 last:border-b-0">
              <input type="checkbox" />
              <img
                src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                alt="avatar"
                className="h-9 w-9 rounded-md"
              />
              <div className="flex flex-1 flex-col">
                <span className="text-sm">Rick Sanchez</span>
                <span className="text-xs text-gray-500">2 Episodes</span>
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const MultiSelectPill = () => {
  const handleRemove = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log("Remove");
  };

  return (
    <span className="inline-flex h-6 items-center rounded-md bg-gray-100 pl-2">
      <span className="text-xs">Morty Smith</span>
      <button
        className="flex h-full items-center pl-0.5 pr-1"
        onClick={handleRemove}
      >
        <Cross2Icon className="h-3 w-3" />
      </button>
    </span>
  );
};
