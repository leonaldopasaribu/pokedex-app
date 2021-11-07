import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

//Import Css
import "../../styles/Pokemon.css";
import "react-lazy-load-image-component/src/effects/blur.css";

//Import Utlis
import { colorTypeGradients } from "../../utils/utils";

const Pokemon = ({ id, image, name, type, onElemClick }) => {
  let finalColor;

  if (type.length === 2) {
    finalColor = colorTypeGradients(
      type[0].type.name,
      type[1].type.name,
      type.length
    );
  } else {
    finalColor = colorTypeGradients(
      type[0].type.name,
      type[0].type.name,
      type.length
    );
  }

  return (
    <div
      className="thumbnail__container noselect"
      style={{
        background: `${finalColor[0]}`,
      }}
      onClick={() => onElemClick({ name })}
    >
      <div className="image__container">
        <LazyLoadImage
          alt="image-pokemon"
          height={150}
          src={image}
          visibleByDefault={false}
          delayMethod={"debounce"}
          effect="blur"
          className="img__thumbnail"
        />
      </div>
      <div className="poke__name">
        <h2>{name}</h2>
        <div className="poke__type">
          {type.map((type) => (
            <div className={`poke__type__bg ${type.type.name}`}>
              <h4>{type.type.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
