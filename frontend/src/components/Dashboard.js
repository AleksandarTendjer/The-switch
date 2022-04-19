import { Container } from "@mui/material";
import { SimpleMap } from "./Map/Map";
import ResponsiveAppBar from "./AppBar/AppBar";
export default function Dashboard(props) {
  //logic to get coordinates from the users web browser
  return (
    <Container>
      <ResponsiveAppBar /> <SimpleMap />
    </Container>
  );
}
