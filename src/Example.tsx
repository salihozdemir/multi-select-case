import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  MultiSelect,
  MultiSelectOption,
  Option,
} from "./components/MultiSelect";
import type { Character, Response } from "./types";

export const Example = () => {
  const [value, setValue] = useState<Option[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const { data } = useQuery<Response<Character[]>, Error, Character[]>({
    queryKey: ["characters", searchValue],
    queryFn: () =>
      fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchValue}`,
      ).then((res) => res.json()),
    select: (data) => data.results,
  });

  const removeSelected = (option: Option) => {
    setValue((prev) => prev.filter((o) => o.value !== option.value));
  };

  const addSelected = (option: Option) => {
    setValue((prev) => [...prev, option]);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[650px]">
        <MultiSelect
          value={value}
          onChange={setValue}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        >
          {data?.map((character) => (
            <MultiSelectOption
              key={character.id}
              character={character}
              selected={value.some((v) => v.value === character.id.toString())}
              removeSelected={removeSelected}
              addSelected={addSelected}
            />
          ))}
        </MultiSelect>
      </div>
    </div>
  );
};
