import * as React from "react";
import GoogleMapReact from "google-map-react";
import { Container } from "@mui/material";

export const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);
export class SimpleMap extends React.Component {
  static state = {
    center: { lat: 45.47, lng: -73.64 },
    zoom: 11,
    loading: true,
  };

  componentWillMount(props) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        this.setState({
          center: { lat: latitude, lng: longitude },
          loading: false,
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <Container>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            <AnyReactComponent
              lat={this.state.lat}
              lng={this.state.lng}
              text={"Me"}
            />
          </GoogleMapReact>
        </div>
      </Container>
    );
  }
}
/*ReactDOM.render(
  <div style={{ width: "100%", height: "400px" }}>
    <SimpleMap />
  </div>,
  document.getElementById("main")
); */
