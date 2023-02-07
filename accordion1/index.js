$(function () {
  // $(".content").css("display", "none");
  $("#select-list .content").hide();

  $("#select-list").on("click", "summary", function (event) {
    event.preventDefault();

    const $this = $(this);
    const details = $this.parent();
    const icon = $this.find(".material-symbols-outlined");
    const content = $this.next();
    const nonTarget = $("#select-list details[open]");
    const nonTargetContent = nonTarget.find(".content");
    const nonTargetIcon = nonTarget.find(".material-symbols-outlined");

    if (details.attr("open")) {
      content.slideUp(200, "linear", () => {
        icon.text("expand_more");
        details.attr("open", false);
      });
    } else {
      content.slideDown(200, "linear", () => {});
      details.attr("open", true);
      icon.text("expand_less");

      nonTargetContent.slideUp(200, "linear", () => {
        nonTargetIcon.text("expand_more");
        nonTarget.attr("open", false);
      });
    }
  });
});
