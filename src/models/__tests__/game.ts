import Game from "./../game";

describe('should have a winner or a draw', function () {
    test('have a draw', function () {
      const result = Game.checkWinner("paper", "paper");
      expect(result).toMatchObject({winner: "draw", winnerAction: "draw"});
    });

    test('paper wins over rock', function () {
      const result = Game.checkWinner("rock", "paper");
      expect(result).toMatchObject({winner: "guest", winnerAction: "paper"});
    });

    test('rock wins over scissors', function () {
      const result = Game.checkWinner("rock", "scissors");
      expect(result).toMatchObject({winner: "host", winnerAction: "rock"});
    });

    test('scissors wins over paper', function () {
      const result = Game.checkWinner("scissors", "paper");
      expect(result).toMatchObject({winner: "host", winnerAction: "scissors"});
    });

    test('paper loses over scissors', function () {
      const result = Game.checkWinner("paper", "scissors");
      expect(result).toMatchObject({winner: "guest", winnerAction: "scissors"});
    });

    test('rock loses over paper', function () {
      const result = Game.checkWinner("rock", "paper");
      expect(result).toMatchObject({winner: "guest", winnerAction: "paper"});
    });

    test('scissors loses over rock', function () {
      const result = Game.checkWinner("scissors", "rock");
      expect(result).toMatchObject({winner: "guest", winnerAction: "rock"});
    });

    test('return empty if actins are not recognized', function () {
      const result = Game.checkWinner("a", "b");
      expect(result).toMatchObject({winner: "", winnerAction: ""});
    });

});
