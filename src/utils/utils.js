export const colorTypeGradients = (type) => {
  let color1, color2;

  switch (type) {
    case "grass":
      color1 = "#a8ff98";
      break;
    case "poison":
      color1 = "#d6a2e4";
      break;
    case "normal":
      color1 = "#dcdcdc";
      break;
    case "fire":
      color1 = "#ffb971";
      break;
    case "water":
      color1 = "#8cc4e2";
      break;
    case "electric":
      color1 = "#ffe662";
      break;
    case "ice":
      color1 = "#8cf5e4";
      break;
    case "fighting":
      color1 = "#da7589";
      break;
    case "ground":
      color1 = "#e69a74";
      break;
    case "flying":
      color1 = "#bbc9e4";
      break;
    case "psychic":
      color1 = "#ffa5da";
      break;
    case "bug":
      color1 = "#bae05f";
      break;
    case "rock":
      color1 = "#C9BB8A";
      break;
    case "ghost":
      color1 = "#8291e0";
      break;
    case "dark":
      color1 = "#8e8c94";
      break;
    case "dragon":
      color1 = "#88a2e8";
      break;
    case "steel":
      color1 = "#9fb8b9";
      break;
    case "fairy":
      color1 = "#fdb9e9";
      break;
    default:
      color1 = "gainsboro";
      break;
  }

  const finalColor = [color1, color2];

  return finalColor;
};
