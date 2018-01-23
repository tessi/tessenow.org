(() => {
  const generateBackground = () => {
    const pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      x_colors: [
        "#d0d1e6",
        "#a6bddb",
        "#74a9cf",
        "#3690c0",
        "#0570b0",
        "#045a8d",
        "#023858"
      ]
    });

    const svg = pattern.svg();
    svg.id = "trianglify";
    return svg;
  };

  var shape;
  const replaceBackground = newShape => {
    if (shape) {
      document.body.removeChild(shape);
    }
    shape = newShape;
    if (newShape) {
      document.body.appendChild(shape);
    }
  };

  var resizeTimeout;
  const throttledBackgroundRendering = () => {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        replaceBackground(generateBackground());
      }, 200);
    }
  };

  const buzzwords = [
    "the object-capability model.",
    "explorative programming in pry.",
    "teaching programming to kids.",
    "debugging the newspeak VM.",
    "making websites accessible.",
    "founding a train-service company.",
    "building arduino projects.",
    "camping / hiking in sweden.",
    "debugging in different languages.",
    "life in a software agency.",
    "exiting or new boardgames.",
    "the latest postgresql tricks.",
    "managing agile software projects."
  ];

  const createBuzzSpan = (text, hidden) => {
    const span = document.createElement("span");
    if (hidden) {
      span.className = "hidden";
    } else {
      span.className = "rotate-word";
    }
    span.innerHTML = text;

    return span;
  };

  const initBuzzwords = () => {
    const buzz = document.getElementById("buzz");
    buzz.innerHTML = "";

    for (var i = 0; i < buzzwords.length; i++) {
      buzz.appendChild(createBuzzSpan(buzzwords[i], i > 0));
    }

    const children = buzz.childNodes;
    const count = children.length;
    var i = 0;

    const rotateBuzzwords = () => {
      const j = (i + 1) % count;
      children[i].className = "hidden";
      children[j].className = "rotate-word animated";
      i = j;
    };

    setTimeout(() => setInterval(rotateBuzzwords, 6000), 0);
  };

  replaceBackground(generateBackground());
  window.addEventListener("resize", throttledBackgroundRendering, false);
  window.addEventListener(
    "orientationchange",
    throttledBackgroundRendering,
    false
  );
  document.addEventListener("DOMContentLoaded", initBuzzwords, false);
})();
