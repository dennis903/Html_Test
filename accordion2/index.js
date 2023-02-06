$(function () {
  $(".content").css("display", "none");

  $("details summary").click(function (event) {
    event.preventDefault();
    const details = $(this).parent();
    const icon = $(this).find(".material-symbols-outlined");
    const content = $(this).siblings();

    if (details.attr("open")) {
      content.slideUp(200, () => {
        icon.text("expand_more");
        details.attr("open", false);
      });
    } else {
      content.slideDown(200, () => {});
      details.attr("open", true);
      icon.text("expand_less");
    }
  });
});
