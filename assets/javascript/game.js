var mainCharacter = null;
var mainCharacterHealth = 0;
var mainCharAttack = 0;
var enemyHealth;
var enemyCharacter = null;
var enemyAttack;
var enemyID;
var logText = $("#log-text");
var enemiesBeaten = 0;
var explainText = $("#explain-text");

function resolveAttack() {
  mainCharacterHealth -= enemyAttack;
  enemyHealth -= mainCharAttack;
  mainCharacter.children(".health-indicator").text(mainCharacterHealth);
  enemyCharacter.children(".health-indicator").text(enemyHealth);
  logText.text(
    "You attacked " +
      enemyID +
      " for " +
      mainCharAttack +
      " damage, they countered for " +
      enemyAttack +
      " damage."
  );
  if (mainCharacterHealth <= 0) {
    logText.text("Oh no! you have been slain!");
    $("#reset-button").css("display", "block");
    mainCharacter.remove();
  } else if (enemyHealth <= 0) {
    enemyCharacter.remove();
    enemyCharacter = null;
    enemiesBeaten++;
  }
  if (enemiesBeaten === 3) {
    explainText.text("YAYYYYY!!!!!");
    logText.text("WOOHOO you win! you beat ALL the baddies!");
    $("#reset-button").css("display", "block");
    $("#reset-button").value = "Try a different Character?";
  }
  mainCharAttack += power;
}

$(document).ready(function() {
  $(".actor").on("click", function() {
    if (!mainCharacter) {
      mainCharacterHealth = $(this)
        .children(".health-indicator")
        .text();
      mainCharAttack = $(this)
        .children(".power")
        .text();
      $(this).attr("disabled", true);
      mainCharAttack = parseInt(mainCharAttack);
      power = mainCharAttack;
      mainCharacter = $(this).detach();
      mainCharacter.appendTo("#player-space");
      $("h2").css("display", "block");
      explainText.text("Now choose your opponent!");
    } else {
      if (enemyCharacter != null) {
        var enemySpace = "#" + enemyCharacter.attr("id") + "-space";
        enemyCharacter.detach();
        enemyCharacter.appendTo(enemySpace);
      }
      console.log(enemySpace);
      enemyID = $(this).attr("id");
      enemyHealth = $(this)
        .children(".health-indicator")
        .text();
      enemyAttack = parseInt($(this).val());
      enemyCharacter = $(this).detach();
      enemyCharacter.appendTo("#enemy-space");
      explainText.text("Fight!");
    }
  });
  $("#attack-button").on("click", function() {
    if (enemyCharacter != null) {
      resolveAttack();
    } else alert("You need to pick an enemy!");
  });
  $("#reset-button").on("click", function() {
    location.reload();
  });
  if (enemiesBeaten === 3) {
    explainText.text("YAYYYYY!!!!!");
    logText.text("WOOHOO you win! you beat ALL the baddies!");
  }
});
