"use strict";

$(function () {
  $("#show-popup").on("click", function () {
    $("#layer-popup").get(0).showModal();
  });

  $("#close-button").on("click", function () {
    $("#layer-popup").get(0).close();
  });

  $("#layer-popup").on("click", function (event) {
    const dialog = $("#layer-popup").get(0);
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      dialog.close();
    }
  });
});
