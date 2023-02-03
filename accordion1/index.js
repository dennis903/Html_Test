const details = [];

class Accordion {
  constructor(element, index) {
    this.index = index;
    this.element = element;
    this.summary = element.querySelector("summary");
    this.content = element.querySelector(".content");
    this.icon = this.content.querySelector(".material-symbols-outlined");
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.summary.addEventListener("click", (event) => this.onClick(event));
  }

  onClick(event) {
    event.preventDefault();
    this.element.style.overflow = "hidden";
    if (this.isClosing || !this.element.open) {
      this.open();
      details.map((e, i) => (i !== this.index ? e.shrink() : null));
    } else if (this.isExpanding || this.element.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;

    const startHeight = `${this.element.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }
    this.animation = this.element.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 400,
        easing: "ease-out",
      }
    );

    this.animation.onfinish = () => {
      this.onAnimationFinish(false);
    };
    this.animation.oncancel = () => (this.isClosing = false);
  }

  open() {
    this.element.style.height = `${this.element.offsetHeight}px`;
    this.element.open = true;
    window.requestAnimationFrame(() => this.expand());
  }
  expand() {
    this.isExpanding = true;
    const startHeight = `${this.element.offsetHeight}px`;
    const endHeight = `${
      this.summary.offsetHeight + this.content.offsetHeight
    }px`;
    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.element.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 400,
        easing: "ease-out",
      }
    );
    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  onAnimationFinish(open) {
    this.element.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.element.style.height = this.element.style.overflow = "";
  }
}
document.querySelectorAll("details").forEach((element, index) => {
  details.push(new Accordion(element, index));
});
