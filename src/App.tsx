import { Chess } from "chess.js";
import { Player, Glicko2 } from "chessrating";
import { FC, useEffect, useMemo, useState } from "react";

import PuzzleVisualizationExercise from "./components/PuzzleVisualizationExercise";

interface Puzzle {
  id: string;
  fen: string;
  moves: string[];
  rating: number;
  ratingDeviation: number;
}

const visualizedMoves = 2;

const LoadingScreen = () => (
  <>
    <h1>Loading</h1>
  </>
);

const PlayingScreen: FC<{ puzzles: Puzzle[] }> = ({ puzzles }) => {
  const player = useMemo(() => new Player(), []);
  const puzzle = useMemo(
    () =>
      puzzles.find((p) => Math.abs(p.rating - player.rating) < 100) ||
      puzzles[Math.floor(Math.random() * puzzles.length)],
    [player.rating]
  );

  const fens = [puzzle.fen];
  const chess = new Chess(puzzle.fen);
  for (let move of puzzle.moves) {
    chess.move(move);
    fens.push(chess.fen());
  }

  return (
    <>
      <PuzzleVisualizationExercise
        moves={puzzle.moves}
        fens={fens}
        visualizedMoves={visualizedMoves}
        onFinished={(won: boolean) => {
          const puzzlePlayer = new Player(
            puzzle.rating,
            puzzle.ratingDeviation,
            0.05
          );
          Glicko2.executeMatch(player, puzzlePlayer, won ? 1 : 0);
        }}
      />
      <h1>{puzzle.rating}</h1>
      <h2>
        {Math.round(player.rating)} +/- {Math.round(player.ratingDeviation)}
      </h2>
    </>
  );
};

export default function App() {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  useEffect(() => {
    const loadPuzzles = async () => {
      const resp = await fetch("/puzzles.csv");
      const puzzles = (await resp.text())
        .split("\n")
        .filter((line) => line.length > 0)
        .map((s) => {
          const fields = s.split(",");
          return {
            id: fields[0],
            fen: fields[1],
            moves: fields[2].split(" "),
            rating: parseInt(fields[3], 10),
            ratingDeviation: parseInt(fields[4], 10),
          };
        });
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
