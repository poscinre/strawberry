'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';

const game = new GameBuilder()
  .gameDuration(60)
  .strawberryCount(20)
  .spiderCount(10)
  .build();
const gameFinishBanner = new PopUp();

game.setGameStopListener(reason => {
  let message;
  switch (reason) {
    case Reason.win:
      message = '축하합니다!';
      break;
    case Reason.lose:
      message = '실패ㅠㅠ';
      break;
    case Reason.cancel:
      message = '다시시작';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
