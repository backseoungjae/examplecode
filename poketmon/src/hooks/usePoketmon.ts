import axios, { AxiosResponse } from "axios";
import { useQueries, useQuery, UseQueryResult } from "react-query";
import { PokemonResponse } from "../types";

const poketmonApi = (id?: string) =>
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id || ""}`, {
    params: { limit: 151 },
  });

const usePoketmon = <T>(
  id?: string
): UseQueryResult<AxiosResponse<T>, Error> => {
  return useQuery(id ? ["poketmon", id] : "poketmon", () => poketmonApi(id));
};

export const usePoketmonQueries = (
  name: string[]
): Array<UseQueryResult<AxiosResponse<PokemonResponse>, Error>> => {
  const queries = name.map((name, i) => ({
    queryKey: ["evolution", `${name}_${i}`],
    queryFn: () => poketmonApi(name),
  }));
  return useQueries(queries) as Array<
    UseQueryResult<AxiosResponse<PokemonResponse>, Error>
  >;
};

export default usePoketmon;
