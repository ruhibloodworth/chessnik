import { styled } from "./stitches.config";
import Chessboard from "./components/Chessboard";

const Header = styled("header", {
  textAlign: "center",
  border: "1px solid var(--color-stroke-divider)",
  height: "5rem",
});

const Main = styled("main", {
  height: "calc(100vh - 5rem)",
});

const Container = styled("div", {
  backgroundColor: "red",
  aspectRatio: "1 / 1",
  maxHeight: "calc(100vh - 5rem)",
});

function App() {
  return (
    <>
      <Header>
        <h1>Chessnik</h1>
      </Header>
      <Main>
        <Container>
          <Chessboard />
        </Container>
      </Main>
    </>
  );
}

export default App;
