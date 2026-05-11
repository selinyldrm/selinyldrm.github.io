(function () {
  var copyText = function (text, input) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    input.focus();
    input.select();
    input.setSelectionRange(0, input.value.length);

    if (document.execCommand("copy")) {
      return Promise.resolve();
    }

    return Promise.reject();
  };

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".publication__copy-citation");
    if (!button) return;

    var field = button.closest(".publication__citation");
    var input = field.querySelector(".publication__citation-input");
    var status = field.querySelector(".publication__copy-status");
    var originalLabel = button.getAttribute("aria-label");

    copyText(input.value, input).then(function () {
      button.setAttribute("aria-label", "Copied reference");
      button.classList.add("is-copied");
      status.textContent = "Copied";

      setTimeout(function () {
        button.setAttribute("aria-label", originalLabel);
        button.classList.remove("is-copied");
        status.textContent = "";
      }, 1600);
    }).catch(function () {
      input.focus();
      input.select();
      status.textContent = "Press Cmd+C to copy";
    });
  });
}());
