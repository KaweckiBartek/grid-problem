import Grid from "./components/grid";
import { Helmet } from "react-helmet";



function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Bartłomiej Kawecki - Grid problem</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Grid />
    </div>
  );
}

export default App;
