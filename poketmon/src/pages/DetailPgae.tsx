// 포켓몬 상세정보
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import About from "../components/About";
import Evolution from "../components/Evolution";
import PoketmonInfo from "../components/PoketmonInfo";
import Stats from "../components/Stats";
import Tabs from "../components/Tabs";
import usePoketmon from "../hooks/usePoketmon";
import useSpecies from "../hooks/useSpecies";
import { PokemonResponse } from "../types";

type Params = {
  id: string;
};

type Tab = "about" | "stats" | "evolution";

export default function DetailPgae() {
  const { id } = useParams<Params>();
  const [selectedTab, setSelectedTab] = useState<Tab>("about");

  const poketmonResult = usePoketmon<PokemonResponse>(id);
  const speciesResult = useSpecies(id);

  const { name, types, height, weight, abilities, baseExp, stats } = useMemo(
    () => ({
      name: poketmonResult.data?.data.name,
      types: poketmonResult.data?.data.types,
      height: poketmonResult.data?.data.height,
      weight: poketmonResult.data?.data.weight,
      abilities: poketmonResult.data?.data.abilities,
      baseExp: poketmonResult.data?.data.base_experience,
      stats: poketmonResult.data?.data.stats,
    }),
    [poketmonResult]
  );

  const {
    color,
    growthRate,
    flaverText,
    genderRate,
    isLegendary,
    isMythical,
    evolutionChainUrl,
  } = useMemo(
    () => ({
      color: speciesResult.data?.data.color,
      growthRate: speciesResult.data?.data.growth_rate.name,
      flaverText: speciesResult.data?.data.flavor_text_entries[0].flavor_text,
      genderRate: speciesResult.data?.data.gender_rate,
      isLegendary: speciesResult.data?.data.is_legendary,
      isMythical: speciesResult.data?.data.is_mythical,
      evolutionChainUrl: speciesResult.data?.data.evolution_chain.url,
    }),
    [speciesResult]
  );

  const handleClick = (tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <PoketmonInfo id={id} name={name} types={types} color={color} />
      <Tabs tab={selectedTab} onClick={handleClick} color={color} />
      {selectedTab === "about" && (
        <About
          isLoading={poketmonResult.isLoading || poketmonResult.isLoading}
          color={color}
          genderRate={genderRate}
          growthRate={growthRate}
          isLegendary={isLegendary}
          isMythical={isMythical}
          types={types}
          weight={weight}
          height={height}
          baseExp={baseExp}
          abilities={abilities}
        />
      )}
      {selectedTab === "stats" && (
        <Stats
          isLoading={poketmonResult.isLoading || speciesResult.isLoading}
          color={color}
          stats={stats}
        />
      )}
      {selectedTab === "evolution" && (
        <Evolution
          id={id}
          isLoading={speciesResult.isLoading}
          color={color}
          url={evolutionChainUrl}
        />
      )}
    </div>
  );
}
