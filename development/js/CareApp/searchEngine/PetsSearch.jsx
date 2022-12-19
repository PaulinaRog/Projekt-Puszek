import React from "react";
import SearchCity from "./SearchCity";
import SearchOtherPets from "./SearchOtherPets";
import SearchType from "./SearchType";

export default function PetsSearch() {
  return (
    <>
      <SearchCity />
      <SearchType />
      <SearchOtherPets />
    </>
  );
}
