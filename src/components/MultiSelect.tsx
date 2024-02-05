import { CaretSortIcon, Cross2Icon } from "@radix-ui/react-icons";

export const MultiSelect = () => {
  return (
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
      <Popover />
    </div>
  );
};

const MultiSelectPill = () => {
  return (
    <span className="inline-flex h-6 items-center rounded-md bg-gray-100 pl-2">
      <span className="text-xs">Morty Smith</span>
      <button className="flex h-full items-center pl-0.5 pr-1">
        <Cross2Icon className="h-3 w-3" />
      </button>
    </span>
  );
};

const Popover = () => {
  return (
    <div className="absolute top-11 z-50 w-96 rounded-md border bg-gray-50 ">
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
  );
};
