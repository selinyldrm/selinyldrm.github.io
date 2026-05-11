$(document).ready(function () {
  $(".publication__copy-citation").on("click", function () {
    var button = $(this);
    var input = button.closest(".publication__citation-field").find(".publication__citation-input");
    var citation = input.val() || "";
    var originalLabel = button.attr("aria-label");

    var markCopied = function () {
      button.attr("aria-label", "Copied reference");
      button.addClass("is-copied");
      setTimeout(function () {
        button.attr("aria-label", originalLabel);
        button.removeClass("is-copied");
      }, 1600);
    };

    var fallbackCopy = function () {
      var textArea = document.createElement("textarea");
      textArea.value = citation;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      markCopied();
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(citation).then(markCopied).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  });
});
