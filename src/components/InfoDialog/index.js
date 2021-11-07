import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { StylesProvider } from "@material-ui/core/styles";

import { LazyLoadImage } from "react-lazy-load-image-component";

//Import Css
import "../../styles/InfoDialog.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import { colorTypeGradients } from "../../utils/utils";

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const fetchGenderRate = (genderRate) => {
  switch (genderRate) {
    case 0:
      return (
        <div>
          <span class="gender-male">
            100% <i class="fa fa-mars"></i>
          </span>
          <span>
            {" "}
            0% <i class="fa fa-venus"></i>
          </span>
        </div>
      );
    case 1:
      return (
        <div>
          <span>
            87.5% <i class="fa fa-mars"></i>
          </span>
          <span>
            {" "}
            12.5% <i class="fa fa-venus"></i>
          </span>
        </div>
      );
    case 2:
      return (
        <div>
          <span>
            75% <i class="fa fa-mars"></i>
          </span>
          <span>
            {" "}
            25% <i class="fa fa-venus"></i>
          </span>
        </div>
      );
    case 3:
      return (
        <div>
          <span>
            62.5% <i class="fa fa-mars"></i>
          </span>
          <span>
            {" "}
            37.5% <i class="fa fa-venus"></i>
          </span>
        </div>
      );
    case 4:
      return (
        <div>
          <span>
            50% <i class="fa fa-mars"></i>
          </span>
          <span>
            {" "}
            50% <i class="fa fa-venus"></i>
          </span>
        </div>
      );
    case 5:
      return (
        <div>
          <span>
            37.5% <i class="fa fa-mars"></i>
          </span>
          <span>
            {" "}
            62.5% <i class="fa fa-venus"></i>
          </span>
        </div>
      );
    case 6:
      return (
        <div>
          <span>
            25% <i class="fa fa-mars"></i>
          </span>
          <span>
            {" "}
            75% <i class="fa fa-venus"></i>
          </span>
        </div>
      );
    case 7:
      return (
        <div>
          <span>
            12.5% <i class="fa fa-mars"></i>
          </span>
          <span>
            {" "}
            87.5% <i class="fa fa-venus"></i>
          </span>
        </div>
      );
    case 8:
      return (
        <div>
          <span>
            0% <i class="fa fa-mars"></i>
          </span>
          <span>
            {" "}
            100% <i class="fa fa-venus"></i>
          </span>
        </div>
      );
    default:
      return <span>Loading...</span>;
  }
};

export default function InfoDialog({
  category,
  open,
  cancel,
  number,
  name,
  genera,
  img,
  height,
  weight,
  genderRate,
  description,
  abilities,
  stats,
  evoChain,
  evolutionPokemon,
}) {
  let finalColor;

  if (category.length === 2) {
    finalColor = colorTypeGradients(
      category[0].type.name,
      category[1].type.name,
      category.length
    );
  } else {
    finalColor = colorTypeGradients(
      category[0].type.name,
      category[0].type.name,
      category.length
    );
  }

  return (
    <>
      <StylesProvider injectFirst>
        <div>
          <Dialog
            aria-labelledby="customized-dialog-title"
            open={open}
            onBackdropClick={cancel}
            fullWidth
            maxWidth="md"
            className="dialog__bg noselect"
          >
            <DialogContent className="dialog__content">
              <div className="info__container">
                <div className="info__container__img">
                  <div className="pokemon__id">
                    #{String(number).padStart(3, "0")}
                  </div>
                  <div className="pokemon__name">{name}</div>
                  <div
                    className="pokemon__genera"
                    style={{ background: finalColor[0] }}
                  >
                    {genera}
                  </div>
                  <div>
                    <img src={img} alt="poke-img" />
                  </div>
                  <div className="info__container__data__type">
                    {category.map((category) => (
                      <div
                        key={category.type.name}
                        className={`poke__type__bg ${category.type.name}`}
                      >
                        <h6>{category.type.name}</h6>
                      </div>
                    ))}
                  </div>
                  <div className="dimensions">
                    <p>
                      <span
                        className="info__container__headings"
                        style={{ fontSize: "20px" }}
                      >
                        Height
                      </span>{" "}
                      {`${height / 10} m/${`${Math.floor(
                        (height / 10) * 3.28
                      )}'${Math.round(
                        (((height / 10) * 3.28) % 1) * 12
                      )}"`} `}{" "}
                    </p>
                    <p>
                      <span
                        className="info__container__headings"
                        style={{ fontSize: "20px" }}
                      >
                        Weight
                      </span>
                      {` ${(weight / 10).toFixed(1)} kg/${(
                        weight * 0.2205
                      ).toFixed(1)} lbs`}
                    </p>
                  </div>
                  <div className="gender__container">
                    {genderRate === -1
                      ? "Genderless"
                      : fetchGenderRate(genderRate)}
                  </div>
                </div>
                <div className="info__container__data">
                  <div className="right__box">
                    <div>
                      <div className="info__container__headings">About</div>
                      <div className="desc">{description}</div>
                    </div>
                    <div className="info__container__data__header">
                      <div className="info__container__data__abilities">
                        <div className="info__container__headings">
                          Abilities
                        </div>
                        <div className="ability__list__bg">
                          <ul className="ability__list">
                            {abilities.map((ability) => (
                              <li key={ability}>
                                <div className="ability">{ability}&nbsp;</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="info__container__headings stats">
                        Base Stats
                      </div>
                      <div className="info__container__data__data">
                        {stats.map((stat) => (
                          <div
                            key={stat["stat__name"]}
                            className="info__container__stat__columns"
                          >
                            <div className="info__container__stat__columns__name">
                              {stat["stat__name"]}
                            </div>
                            <div className="info__container__stat__columns__val">
                              {stat["stat__val"]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="info__container__headings">Evolution</div>
                      <div className="evolution__box">
                        {evoChain.map((value, index, elements) => (
                          <div className="evolution__sub__box">
                            <div>
                              <div className="evolution__img__div">
                                <div className="transparency__div">
                                  <LazyLoadImage
                                    alt="image-pokemon"
                                    height={80}
                                    width={80}
                                    src={elements[index].image_url}
                                    visibleByDefault={false}
                                    delayMethod={"debounce"}
                                    effect="blur"
                                    className="evo_img"
                                    onClick={() =>
                                      evolutionPokemon(
                                        number,
                                        elements[index].species_name,
                                        category,
                                        elements[index].image_url
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              <div className="evolution__poke__name">
                                {elements[index].species_name}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </StylesProvider>
    </>
  );
}
