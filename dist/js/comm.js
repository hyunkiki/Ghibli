gsap.from(".letter", {
  rotationY: 40,
  opacity: 0,
  duration: 0.9,
  yPercent: -100,
  stagger: 0.1,
  ease: "Expo.easeOut",
});

const hide = (item) => {
  gsap.set(item, { autoAlpha: 0 });
};

const animate = (item) => {
  let x = 0;
  let y = 0;
  let delay = item.dataset.delay;

  if (item.classList.contains("reveal_LTR")) {
    (x = -100), (y = 0);
  } else if (item.classList.contains("reveal_BTT")) {
    (x = 0), (y = 100);
  } else if (item.classList.contains("reveal_TTB")) {
    (x = 0), (y = -100);
  } else {
    (x = 100), (y = 0);
  }

  gsap.fromTo(
    item,
    { autoAlpha: 0, x: x, y: y },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      delay: delay,
      duration: 2,
      overwrite: "auto",
      ease: "expo",
    }
  );
};

gsap.utils.toArray(".reveal").forEach((item) => {
  hide(item);

  ScrollTrigger.create({
    trigger: item,
    start: "top bottom",
    end: "bottom top",
    markers: false,
    onEnter: () => {
      animate(item);
    },
  });
});

let viewHeight = window.innerHeight;
let viewWidth = window.innerWidth;

let textContainers = document.querySelectorAll(".text-container");

textContainers.forEach((element, index) => {
  let top = element.getBoundingClientRect().top;
  let start = viewHeight - top;

  let firstText = element.querySelector(".parallax-text:first-child");
  let secondText = element.querySelector(".parallax-text:last-child");

  gsap.to(firstText, {
    scrollTrigger: {
      trigger: element,
      scrub: true,
      start: start + "px bottom",
      end: "bottom top",
    },
    x: "-70vw",
    transformOrigin: "left center",
    ease: "none",
  });
  gsap.to(secondText, {
    scrollTrigger: {
      trigger: element,
      scrub: true,
      start: start + "px bottom",
      end: "bottom top",
    },
    x: "30vw",
    transformOrigin: "left center",
    ease: "none",
  });
});
