import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MultiSelect } from "./components/MultiSelect";
import type { Character, Response } from "./types";

export const Example = () => {
  const [searchValue, setSearchValue] = useState("");

  const { data } = useQuery<Response<Character[]>, Error, Character[]>({
    queryKey: ["characters", searchValue],
    queryFn: () =>
      fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchValue}`,
      ).then((res) => res.json()),
    select: (data) => data.results,
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-[650px]">
        <MultiSelect
          data={data}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
      </div>
    </div>
  );
};
