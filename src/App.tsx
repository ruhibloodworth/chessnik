import { Chess } from "chess.js";

import PuzzlePosition from "./components/PuzzlePosition";
import { useEffect, useState } from "react";
import MoveList from "./components/MoveList";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const puzzle =
  "00sHx,q3k1nr/1pp1nQpp/3p4/1P2p3/4P3/B1PP1b2/B5PP/5K2 b k - 0 17,e8d7 a2e6 d7d8 f7f8,1760,80,83,72,mate mateIn2 middlegame short,https://lichess.org/yyznGmXs/black#34,Italian_Game Italian_Game_Classical_Variation";

const fields = puzzle.split(",");
const moves = fields[2].split(" ");
const fens = [fields[1]];

const chess = new Chess(fields[1]);
for (let move of moves) {
  chess.move(move);
  fens.push(chess.fen());
}

const visualizedMoves = 2;

export default function App() {
  const [moveNo, setMoveNo] = useState(0);
  useEffect(() => {
    const firstMove = async () => {
      await sleep(1000);
      setMoveNo(moveNo + 1);
    };
    firstMove();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <PuzzlePosition
        fen={fens[moveNo - visualizedMoves > 0 ? moveNo - visualizedMoves : 0]}
        onGuess={async (guess) => {
          if (guess === moves[moveNo]) {
            if (moveNo + 1 <= moves.length) {
              setMoveNo(moveNo + 1);
              if (moveNo + 2 <= moves.length) {
                await sleep(1000);
                setMoveNo(moveNo + 2);
              }
            }
            return true;
          } else {
            return false;
          }
        }}
      />
      <div>
        <h2>Visualize</h2>
        <MoveList
          moves={moves.slice(0, moveNo)}
          displayMoveNo={
            moveNo - visualizedMoves > 0 ? moveNo - visualizedMoves : 0
          }
        />
      </div>
    </div>
  );
}
