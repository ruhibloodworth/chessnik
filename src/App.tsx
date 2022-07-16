import { styled } from "./stitches.config";

const Header = styled("header", {
  textAlign: "center",
  border: "1px solid var(--color-stroke-divider)",
});

function App() {
  return (
    <>
      <Header>
        <h1>Chessnik</h1>
      </Header>
      <main></main>
    </>
  );
}

export default App;
