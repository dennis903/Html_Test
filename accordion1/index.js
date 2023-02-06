$(function () {
  // $(".content").css("display", "none");
  $("#select-list .content").hide();

  $("#select-list").on("click", "summary", function (event) {
    event.preventDefault();

    const $this = $(this);
    const details = $this.parent();
    const icon = $this.find(".material-symbols-outlined");
    const content = $this.next();
    const nonTarget = $this.parent().siblings();
    const nonTargetContent = nonTarget.find(".content");
    const nonTargetIcon = nonTarget.find(".material-symbols-outlined");

    if (details.attr("open")) {
      content.slideUp(200, () => {
        icon.text("expand_more");
        details.attr("open", false);
      });
    } else {
      content.slideDown(1000, () => {
        nonTarget.attr("open", false);
      });
      details.attr("open", true);
      icon.text("expand_less");

      nonTargetContent.slideUp(1000, () => {
        nonTargetIcon.text("expand_more");
      });
    }
  });
});
