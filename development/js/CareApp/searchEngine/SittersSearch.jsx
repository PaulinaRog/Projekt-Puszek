import React from "react";
import SearchCity from "./SearchCity";
import SearchPets from "./SearchPets";
import SearchPreference from "./SearchPreference";

export default function SittersSearch() {
  return (
    <>
      <SearchCity />
      <SearchPreference />
      <SearchPets />
    </>
  );
}
