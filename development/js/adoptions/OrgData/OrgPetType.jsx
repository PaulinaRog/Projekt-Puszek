import React from "react";
import { useState } from "react";
import supabase from "../../contexts/supabaseClient";
import { useRef } from "react";

export default function OrgPetType({
  cats,
  dogs,
  birds,
  rodents,
  all,
  id,
  type,
}) {
  const [clicked, setClicked] = useState(false);
  const formRef = useRef();
  const [style, setStyle] = useState({ float: "right" });
  const [newCats, setNewCats] = useState(null);
  const [newDogs, setNewDogs] = useState(null);
  const [newBirds, setNewBirds] = useState(null);
  const [newRodents, setNewRodents] = useState(null);
  const [newAll, setNewAll] = useState(null);
  const [cat, setCat] = useState(cats);
  const [dog, setDog] = useState(dogs);
  const [bird, setBird] = useState(birds);
  const [rodent, setRodent] = useState(rodents);
  const [allPets, setAllPets] = useState(all);
  const [newData, setNewData] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    setStyle(null);
    const getData = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .select("cats, dogs, birds, rodents, all")
        .eq("uuid", id)
        .single();
      if (error) {
        console.log(error);
      }
      if (data) {
        formRef.current[0].value = data.cats;
        formRef.current[1].value = data.dogs;
        formRef.current[2].value = data.birds;
        formRef.current[3].value = data.rodents;
        formRef.current[4].value = data.all;
      }
    };
    getData();
  };

  const handleSave = (e) => {
    e.preventDefault();
    const saveChanges = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .update({
          cats: formRef.current[0].value,
          dogs: formRef.current[1].value,
          birds: formRef.current[2].value,
          rodents: formRef.current[3].value,
          all: formRef.current[4].value,
        })
        .eq("uuid", id)
        .select("cats, dogs, birds, rodents, all");

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setNewCats(data[0].cats);
        setNewDogs(data[0].dogs);
        setNewBirds(data[0].birds);
        setNewRodents(data[0].rodents);
        setNewAll(data[0].all);
        setClicked(false);
        setStyle({ float: "right" });
        setNewData(true);
      }
    };
    saveChanges();
  };

  const clickedStyle = {
    backgroundColor: "#a4a42ab2",
    boxShadow: "inset 3px 3px 5px rgba(0, 0, 0, 0.627)",
  };

  console.log(formRef);
  console.log(newCats);
  console.log(newDogs);

  return (
    <div>
      <div>
        {!clicked ? (
          <div style={{ display: "grid" }}>
            <h3>{`${type} zajmuje się:`}</h3>
            <div>
              {newData ? (
                <span>{newCats ? "kotami, " : null}</span>
              ) : (
                <span>{cats ? "kotami, " : null}</span>
              )}
              {newData ? (
                <span>{newDogs ? "psami, " : null}</span>
              ) : (
                <span>{dogs ? "psami, " : null}</span>
              )}
              {newData ? (
                <span>{newBirds ? "ptakami, " : null}</span>
              ) : (
                <span>{birds ? "ptakami, " : null}</span>
              )}
              {newData ? (
                <span>{newRodents ? "gryzoniami, " : null}</span>
              ) : (
                <span>{rodents ? "gryzoniami, " : null}</span>
              )}
              {newData ? (
                <span>{newAll ? "wszystkimi zwierzakami" : null}</span>
              ) : (
                <span>{all ? "wszystkimi zwierzakami" : null}</span>
              )}
            </div>
          </div>
        ) : (
          <>
            <h3>Zakres działalności:</h3>
            <form ref={formRef} style={{ display: "flex" }}>
              <button
                value={cat}
                name="cat"
                className="pf-button"
                style={cat ? clickedStyle : null}
                onClick={(e) => {
                  e.preventDefault();
                  setCat(!cat);
                }}
              >
                KOTY
              </button>
              <button
                value={dog}
                name="dog"
                className="pf-button"
                style={dog ? clickedStyle : null}
                onClick={(e) => {
                  e.preventDefault();
                  setDog(!dog);
                }}
              >
                PSY
              </button>
              <button
                value={bird}
                name="birds"
                className="pf-button"
                style={bird ? clickedStyle : null}
                onClick={(e) => {
                  e.preventDefault();
                  setBird(!bird);
                }}
              >
                PTAKI
              </button>
              <button
                value={rodent}
                name="rodents"
                className="pf-button"
                style={rodent ? clickedStyle : null}
                onClick={(e) => {
                  e.preventDefault();
                  setRodent(!rodent);
                }}
              >
                GRYZONIE
              </button>
              <button
                value={allPets}
                name="all"
                className="pf-button"
                style={allPets ? clickedStyle : null}
                onClick={(e) => {
                  e.preventDefault();
                  setAllPets(!allPets);
                }}
              >
                WSZYSTKIE
              </button>
            </form>
            <i className="fa-solid fa-download" onClick={handleSave}></i>
          </>
        )}
        <i
          className="fa-solid fa-pen-to-square"
          onClick={handleClick}
          style={style}
        ></i>
      </div>
    </div>
  );
}
