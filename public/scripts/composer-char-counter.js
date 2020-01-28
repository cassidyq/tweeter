$(document).ready(function() {
  const maxChars = 140;
  // $("#char-counter").val(maxChars);

  $("textarea").on("keyup keydown", function() {
    const $count = $("#char-counter");
    const characters = $(this).val().length;

    if (characters > maxChars) {
      $count.addClass("over");
    } else {
      $count.removeClass("over");
    }
    $count.text(maxChars - characters);
  });
});
