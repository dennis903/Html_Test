"use strict";

const layerPopup = document.querySelector("#layer-popup");
const showButton = document.querySelector("#show-popup");
// const closeButton = document.querySelector("#close-button");

const onOpen = () => {
  layerPopup.showModal();
};

showButton.addEventListener("click", onOpen);
// layerPopup.addEventListener("close", () => {
//   console.log("close");
// });
