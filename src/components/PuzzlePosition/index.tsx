import { useState } from "react";
import { Chessboard } from "react-chessboard";

interface PuzzlePositionProps {
  fen: string;
  onGuess: (guess: string) => Promise<boolean>;
}

export default function PuzzlePosition({ fen, onGuess }: PuzzlePositionProps) {
  const [moveStr, setMoveStr] = useState("");
  return (
    <div>
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
      <div style={{ width: "75vh", height: "75vh" }}>
        <Chessboard position={fen} />
      </div>
    </div>
  );
}
