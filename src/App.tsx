import { Chess } from "chess.js";
import { Player, Glicko2 } from "chessrating";

import PuzzleVisualizationExercise from "./components/PuzzleVisualizationExercise";
import { useMemo, useState } from "react";

const puzzles = [
  "00sHx,q3k1nr/1pp1nQpp/3p4/1P2p3/4P3/B1PP1b2/B5PP/5K2 b k - 0 17,e8d7 a2e6 d7d8 f7f8,1760,80,83,72,mate mateIn2 middlegame short,https://lichess.org/yyznGmXs/black#34,Italian_Game Italian_Game_Classical_Variation",
  "00sJ9,r3r1k1/p4ppp/2p2n2/1p6/3P1qb1/2NQR3/PPB2PP1/R1B3K1 w - - 5 18,e3g3 e8e1 g1h2 e1c1 a1c1 f4h6 h2g1 h6c1,2671,105,87,325,advantage attraction fork middlegame sacrifice veryLong,https://lichess.org/gyFeQsOE#35,French_Defense French_Defense_Exchange_Variation",
  "00sJb,Q1b2r1k/p2np2p/5bp1/q7/5P2/4B3/PPP3PP/2KR1B1R w - - 1 17,d1d7 a5e1 d7d1 e1e3 c1b1 e3b6,2235,76,97,64,advantage fork long,https://lichess.org/kiuvTFoE#33,Sicilian_Defense Sicilian_Defense_Dragon_Variation",
  "00sO1,1k1r4/pp3pp1/2p1p3/4b3/P3n1P1/8/KPP2PN1/3rBR1R b - - 2 31,b8c7 e1a5 b7b6 f1d1,998,85,94,293,advantage discoveredAttack master middlegame short,https://lichess.org/vsfFkG0s/black#62",
];

const visualizedMoves = 2;

export default function App() {
  const player = useMemo(() => new Player(), []);
  const [puzzleNo, setPuzzleNo] = useState(0);
  const puzzle = puzzles[puzzleNo];
  const fields = puzzle.split(",");
  const moves = fields[2].split(" ");
  const fens = [fields[1]];

  const chess = new Chess(fields[1]);
  for (let move of moves) {
    chess.move(move);
    fens.push(chess.fen());
  }

  return (
    <>
      <PuzzleVisualizationExercise
        moves={moves}
        fens={fens}
        visualizedMoves={visualizedMoves}
        onFinished={(won: boolean) => {
          const puzzlePlayer = new Player(
            parseInt(fields[3], 10),
            parseInt(fields[4], 10),
            0.05
          );
          Glicko2.executeMatch(player, puzzlePlayer, won ? 1 : 0);
          setPuzzleNo(puzzleNo + 1);
        }}
      />
      <h2>
        {Math.round(player.rating)} +/- {Math.round(player.ratingDeviation)}
      </h2>
    </>
  );
}
