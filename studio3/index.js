const hats = document.querySelectorAll(".draggable");
hats.forEach((hat) => {
  hat.originalParent = hat.parentElement;

  const rect = hat.getBoundingClientRect();
  hat.originalX = rect.left;
  hat.originalY = rect.top;
});

interact(".draggable").draggable({
  inertia: false,

  listeners: {
    start(event) {
      const element = event.target;

      // To check if this hat is in the dropzone
      const isInDropzone = element.parentElement.id === "dropzone";

      if (isInDropzone) {
        element.classList.remove("placed-hat");
      }

      element.style.zIndex = 10;

      const rect = element.getBoundingClientRect();

      document.body.appendChild(element);

      element.style.position = "absolute";
      element.style.top = rect.top + "px";
      element.style.left = rect.left + "px";

      element.setAttribute("data-x", 0);
      element.setAttribute("data-y", 0);
    },

    move(event) {
      var target = event.target;
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      target.style.transform = "translate(" + x + "px, " + y + "px)";

      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);

      target.style.transform = `translate(${x}px, ${y}px)`;

      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },

    end(event) {
      const element = event.target;

      // If the element has this placed-hat class, it's not in dropzone -> return to the original position
      if (!element.classList.contains("placed-hat")) {
        returnToOriginal(element);
      }
    },
  },
});

// Function to return element to its original position
function returnToOriginal(element) {
  // Move the element back to its original parent container
  if (element.originalParent) {
    element.originalParent.appendChild(element);
  }

  element.style.transform = "translate(0px, 0px)";
  element.style.position = "static";

  // If the element is placed over another, remove cant-drop red styling when element returns back to original place
  setTimeout(() => {
    element.classList.remove("can-drop", "cant-drop", "placed-hat");
  }, 1);
}

interact("#dropzone").dropzone({
  accept: ".draggable",
  overlap: 0.5,

  ondragenter: (event) => {
    const dropzone = event.target;
    const draggable = event.relatedTarget;

    // Check if dropzone already has a hat
    const hasHat = dropzone.querySelector(".draggable") !== null;

    // Only allow drop if empty or if there is a hat already there
    if (!hasHat || draggable.parentNode === dropzone) {
      draggable.classList.add("can-drop");
      draggable.classList.remove("cant-drop");
    } else {
      draggable.classList.add("cant-drop");
      draggable.classList.remove("can-drop");
    }
  },

  ondragleave: (event) => {
    event.relatedTarget.classList.remove("can-drop", "cant-drop");
  },

  ondrop: (event) => {
    const dropzone = event.target;
    const draggable = event.relatedTarget;

    const existingHat = dropzone.querySelector(".draggable");

    if (existingHat && existingHat !== draggable) {
      draggable.classList.remove("can-drop");
      returnToOriginal(draggable);
      return;
    }

    dropzone.appendChild(draggable);

    // Once dropped into dropzone, center the hat
    draggable.style.position = "absolute";
    draggable.style.top = "50%";
    draggable.style.left = "50%";
    draggable.style.transform = "translate(-50%, -50%)";

    draggable.classList.add("placed-hat");
    draggable.classList.remove("can-drop", "cant-drop");
  },

  ondropdeactivate: (event) => {
    event.target.classList.remove("drop-active", "drop-target");
  },
});

new Granim({
  element: "#background-gradient",
  direction: "diagonal",
  isPausedWhenNotInView: true,
  states: {
    "default-state": {
      gradients: [
        ["#7BDFF2", "#B2f7ef"],
        ["#eff7f6", "#f7d6e0"],
        ["#f2b5d4", "#80ced7"],
      ],
      transitionSpeed: 3000,
    },
  },
});