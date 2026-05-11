$(document).ready(function () {
  $(".publication__copy-citation").on("click", function () {
    var button = $(this);
    var citation = button.attr("data-citation") || "";
    var label = button.find("span");
    var originalLabel = label.text();

    var markCopied = function () {
      label.text("Copied");
      button.addClass("is-copied");
      setTimeout(function () {
        label.text(originalLabel);
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
