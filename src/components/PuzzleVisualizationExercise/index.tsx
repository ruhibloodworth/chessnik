import { FC, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import MoveList from "../MoveList";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MoveInput: FC<{ onGuess: (guess: string) => Promise<boolean> }> = ({
  onGuess,
}) => {
  const [moveStr, setMoveStr] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (await onGuess(moveStr)) {
          setMoveStr("");
        }
      }}
    >
      <input value={moveStr} onChange={(e) => setMoveStr(e.target.value)} />
    </form>
  );
};

interface PuzzleVisualizationExerciseProps {
  moves: string[];
  fens: string[];
  visualizedMoves: number;
  onSuccess: () => void;
}

export default function PuzzleVisualizationExercise({
  moves,
  fens,
  visualizedMoves,
  onSuccess,
}: PuzzleVisualizationExerciseProps) {
  const [moveNo, setMoveNo] = useState(0);
  useEffect(() => {
    const firstMove = async () => {
      setMoveNo(0);
      await sleep(1000);
      setMoveNo(1);
    };
    firstMove();
  }, [fens, moves]);
  const displayMoveNo = Math.max(0, moveNo - visualizedMoves);

  const handleGuessMove = async (guess: string) => {
    if (guess === moves[moveNo]) {
      if (moveNo + 1 <= moves.length) {
        setMoveNo(moveNo + 1);
        if (moveNo + 2 <= moves.length) {
          sleep(1000).then(() => {
            setMoveNo(moveNo + 2);
          });
        } else {
          onSuccess();
        }
      }
      return true;
    } else {
      return false;
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "75vh", height: "75vh" }}>
        <Chessboard position={fens[displayMoveNo]} />
      </div>
      <div>
        <h2>Visualize</h2>
        <MoveList
          moves={moves.slice(0, moveNo)}
          displayMoveNo={displayMoveNo}
        />
        <MoveInput onGuess={handleGuessMove} />
      </div>
    </div>
  );
}
