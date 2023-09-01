interface MoveListProps {
  moves: string[];
  displayMoveNo: number;
}
export default function MoveList({ moves, displayMoveNo }: MoveListProps) {
  return (
    <ul>
      {moves.map((move, i) => (
        <li
          key={i}
          style={
            i < displayMoveNo
              ? { fontWeight: "lighter" }
              : { fontWeight: "bolder" }
          }
        >
          {move}
        </li>
      ))}
    </ul>
  );
}
