class Quiz {
  constructor() { }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if (contestantCountRef.exists()) {
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play() {
    //write code here to hide question elements
    question.question.hide();

    question.option1.hide();
    question.option2.hide();
    question.option3.hide();
    question.option4.hide();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    textSize(30);
    text("Result of the Quiz...", 250, 100);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if (allContestants != undefined) {
      fill("BLUE");
      textSize(20);
      text("NOTE: Those who answered correctly are highlited green", 100, 200);
    }

    let tempPosition = 200;

    for (let plr in allContestants) {
      let correctAnswer = "2";
      tempPosition += 50;

      if (correctAnswer == allContestants[plr].answer) {
        fill("green");
        text(allContestants[plr].name + " : " + allContestants[plr].answer, 100, tempPosition);
      } else {
        fill("red");
        text(allContestants[plr].name + " : " + allContestants[plr].answer, 100, tempPosition);
      }
    }

  }

}
