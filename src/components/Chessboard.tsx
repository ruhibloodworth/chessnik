import { styled } from "../stitches.config";
import boardUrl from "../assets/board/blue.svg";

const BoardImg = styled("img", {
  display: "block",
});

export default function Chessboard() {
  return <BoardImg src={boardUrl} />;
}
