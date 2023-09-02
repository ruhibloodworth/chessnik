import { Chess } from "chess.js";
import { Player, Glicko2 } from "chessrating";
import { FC, useEffect, useMemo, useState } from "react";

import PuzzleVisualizationExercise from "./components/PuzzleVisualizationExercise";

const visualizedMoves = 2;

const LoadingScreen = () => (
  <>
    <h1>Loading</h1>
  </>
);

const PlayingScreen: FC<{ puzzles: string[] }> = ({ puzzles }) => {
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
};

export default function App() {
  const [puzzles, setPuzzles] = useState<string[]>([]);
  useEffect(() => {
    const loadPuzzles = async () => {
      const resp = await fetch("/puzzles.csv");
      const puzzles = (await resp.text()).split("\n");
      setPuzzles(puzzles);
    };
    loadPuzzles();
  }, []);

  return puzzles.length == 0 ? (
    <LoadingScreen />
  ) : (
    <PlayingScreen puzzles={puzzles} />
  );
}
