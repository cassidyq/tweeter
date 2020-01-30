$(document).ready(function() {
  const maxChars = 140;
  $("#char-counter").text(maxChars);

  $("textarea").on("keyup keydown", function() {
    const $count = $("#char-counter");
    const $characters = $(this).val().length;

    if ($characters > maxChars) {
      $count.addClass("highlight-red");
    } else {
      $count.removeClass("highlight-red");
    }
    $count.text(maxChars - $characters);
  });
});
