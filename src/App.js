import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

//Import Components
import Pokemon from "./components/Pokemon/";
import InfoDialog from "./components/InfoDialog/";
import Header from "./components/Header/";
import Filter from "./components/Filter/";

//Import Action
import { getAllPokemons } from "./redux/store/actions/pokemon.action";

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.35,
      delayChildren: 0.75,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const items = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -150 },
};

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchPokemons] = useState([]);
  const [filterPokemons, setFilterPokemons] = useState([]);
  const [evoChain, setEvoChain] = useState([]);
  const [stats, setStats] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [pokeName, setPokeName] = useState("");
  const [pokeNumber, setPokeNumber] = useState("");
  const [genderRate, setGenderRate] = useState("");
  const [genera, setGenera] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [valueType, setValueType] = useState("all types");
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [limit] = useState(151);
  const [offset] = useState(0);
  const [types] = useState([
    "all types",
    "grass",
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ]);
  const dispatch = useDispatch();
  const results = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (results.data.length === 0) dispatch(getAllPokemons(offset, limit));
    getPokemonData(results.data);
  }, [results.data]);

  const getPokemonData = async (result) => {
    const pokemonArr = [],
      filterArr = [];

    await Promise.all(
      result.map((pokemonItem) => {
        return axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}`)
          .then((result) => {
            pokemonArr.push(result.data);
          });
      })
    );

    pokemonArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

    console.log(results.isLoading)

    if (isTypeSelected) {
      for (let i = 0; i < pokemonArr.length; i++) {
        for (let j = 0; j < pokemonArr[i].types.length; j++) {
          if (selectedType === pokemonArr[i].types[j].type.name) {
            filterArr.push(pokemonArr[i]);
          }
        }
      }
      setIsFilter(true);
      setFilterPokemons(filterArr);
      setAllPokemons(pokemonArr);
      setShowLoading(false);
    } else {
      setIsFilter(false);
      setAllPokemons(pokemonArr);
      setShowLoading(false);
    }
  };

  const closeDialog = () => {
    setShowInfo(false);
  };

  const fetchEvoDetails = async (url) => {
    const response = await axios
      .get(url)
      .catch((err) => console.log("Error:", err));

    const evoChain = [];
    let evoData = response.data.chain;

    do {
      const evoDetails = evoData["evolution_details"][0];

      evoChain.push({
        species_name: evoData.species.name,
        min_level: !evoDetails ? 1 : evoDetails.min_level,
        trigger_name: !evoDetails ? null : evoDetails.trigger.name,
        item: !evoDetails ? null : evoDetails.item,
      });

      evoData = evoData["evolves_to"][0];
    } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

    fetchEvoImages(evoChain);
  };

  const fetchEvoImages = async (evoChainArr) => {
    for (let i = 0; i < evoChainArr.length; i++) {
      const response = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${evoChainArr[i].species_name}`)
        .catch((err) => console.log("Error:", err));
      response.data.sprites.other.dream_world.front_default
        ? (evoChainArr[i]["image_url"] =
            response.data.sprites.other.dream_world.front_default)
        : (evoChainArr[i]["image_url"] =
            response.data.sprites.other["official-artwork"].front_default);
    }

    setEvoChain(evoChainArr);
  };

  const fetchPokemonData = async (number, pokemon, category, imageURL) => {
    const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .catch((err) => console.log("Error:", err));

    const statistics = [],
      abs = [];
    const id = response.data.id;

    for (let i = 0; i < response.data.abilities.length; i++) {
      abs.push(response.data.abilities[i].ability.name);
    }

    for (let j = 0; j < response.data.stats.length; j++) {
      const Obj = {};
      Obj["stat__name"] = response.data.stats[j].stat.name;
      Obj["stat__val"] = response.data.stats[j].base_stat;
      statistics.push(Obj);
    }

    setWeight(response.data.weight);
    setHeight(response.data.height);
    setCategory(category);
    setPokeNumber(id);
    setPokeName(pokemon);
    setShowInfo(true);
    setStats(statistics);
    setAbilities(abs);
    setImageURL(imageURL);
    setEvoChain([]);
    setGenderRate("");
    setGenera("");

    fetchPokemonDescription(pokemon);
  };

  const fetchPokemonDescription = async (pokemon_name) => {
    const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_name}`)
      .catch((err) => console.log("Error:", err));
    fetchEvoDetails(response.data.evolution_chain.url);

    try {
      for (let i = 0; i < response.data.flavor_text_entries.length - 1; i++) {
        if (response.data.flavor_text_entries[i].language.name === "en") {
          setDescription(response.data.flavor_text_entries[i].flavor_text);
          break;
        }
      }

      for (let j = 0; j < response.data.genera.length; j++) {
        if (response.data.genera[j].language.name === "en") {
          setGenera(response.data.genera[j].genus);
          break;
        }
      }

      setGenderRate(response.data.gender_rate);
    } catch (e) {
      setDescription("Description not found");
    }
  };

  const handleChangeTypes = (event) => {
    if (event.target.value === "all types") {
      const allPoks = allPokemons;

      setIsFilter(false);
      setValueType(event.target.value);
      setAllPokemons(allPoks);
      setIsTypeSelected(false);

      return;
    } else {
      setIsTypeSelected(true);
      setSelectedType(event.target.value);
    }

    let filterArr = [];

    for (let i = 0; i < allPokemons.length; i++) {
      for (let j = 0; j < allPokemons[i].types.length; j++) {
        if (event.target.value === allPokemons[i].types[j].type.name) {
          filterArr.push(allPokemons[i]);
        }
      }
    }
    setIsSearch(false);
    setIsFilter(true);
    setFilterPokemons(filterArr);
    setValueType(event.target.value);

    filterArr.length === 0 ? setNoDataFound(true) : setNoDataFound(false);

    console.log(filterArr);
  };

  return (
    <>
      {showLoading && <p className="loading__text">Please wait.....</p>}
      {!showLoading && (
        <div className="app__container">
          {showInfo && (
            <InfoDialog
              open={showInfo}
              abilities={abilities}
              height={height}
              weight={weight}
              category={category}
              genera={genera}
              genderRate={genderRate}
              stats={stats}
              img={imageURL}
              name={pokeName}
              number={pokeNumber}
              description={description}
              evoChain={evoChain}
              cancel={() => closeDialog()}
              evolutionPokemon={fetchPokemonData}
            ></InfoDialog>
          )}
          <Header />
          <Filter
            valueType={valueType}
            types={types}
            typesSelect={handleChangeTypes}
          />
          <div className="pokemon__container">
            <div className="all__pokemons">
              {isSearch ? (
                Object.keys(searchPokemons).map((item) => (
                  <Pokemon
                    key={searchPokemons[item].id}
                    id={searchPokemons[item].id}
                    image={
                      searchPokemons[item].sprites.other.dream_world
                        .front_default
                        ? searchPokemons[item].sprites.other.dream_world
                            .front_default
                        : searchPokemons[item].sprites.other["official-artwork"]
                            .front_default
                    }
                    name={searchPokemons[item].name}
                    type={searchPokemons[item].types}
                    onElemClick={() =>
                      fetchPokemonData(
                        searchPokemons[item].id,
                        searchPokemons[item].name,
                        searchPokemons[item].types,
                        searchPokemons[item].sprites.other.dream_world
                          .front_default
                          ? searchPokemons[item].sprites.other.dream_world
                              .front_default
                          : searchPokemons[item].sprites.other[
                              "official-artwork"
                            ].front_default
                      )
                    }
                  />
                ))
              ) : !isFilter ? (
                <motion.ul
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    listStyleType: "none",
                    paddingInlineStart: "0px",
                    marginBlockStart: "0px",
                    marginBlockEnd: "0px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  initial="hidden"
                  animate="visible"
                  variants={list}
                >
                  {Object.keys(allPokemons).map((item) => (
                    <motion.li variants={items}>
                      <Pokemon
                        key={allPokemons[item].id}
                        id={allPokemons[item].id}
                        image={
                          allPokemons[item].sprites.other.dream_world
                            .front_default
                            ? allPokemons[item].sprites.other.dream_world
                                .front_default
                            : allPokemons[item].sprites.other[
                                "official-artwork"
                              ].front_default
                        }
                        name={allPokemons[item].name}
                        type={allPokemons[item].types}
                        onElemClick={() =>
                          fetchPokemonData(
                            allPokemons[item].id,
                            allPokemons[item].name,
                            allPokemons[item].types,
                            allPokemons[item].sprites.other.dream_world
                              .front_default
                              ? allPokemons[item].sprites.other.dream_world
                                  .front_default
                              : allPokemons[item].sprites.other[
                                  "official-artwork"
                                ].front_default
                          )
                        }
                      />
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                Object.keys(filterPokemons).map((item) => (
                  <Pokemon
                    key={filterPokemons[item].id}
                    id={filterPokemons[item].id}
                    image={
                      filterPokemons[item].sprites.other.dream_world
                        .front_default
                        ? filterPokemons[item].sprites.other.dream_world
                            .front_default
                        : filterPokemons[item].sprites.other["official-artwork"]
                            .front_default
                    }
                    name={filterPokemons[item].name}
                    type={filterPokemons[item].types}
                    onElemClick={() =>
                      fetchPokemonData(
                        filterPokemons[item].id,
                        filterPokemons[item].name,
                        filterPokemons[item].types,
                        filterPokemons[item].sprites.other.dream_world
                          .front_default
                          ? filterPokemons[item].sprites.other.dream_world
                              .front_default
                          : filterPokemons[item].sprites.other[
                              "official-artwork"
                            ].front_default
                      )
                    }
                  />
                ))
              )}
            </div>
          </div>
          {noDataFound && (
            <div className="no__data noselect">Now the pokemon data is empty</div>
          )}
        </div>
      )}
    </>
  );
}
export default App;
