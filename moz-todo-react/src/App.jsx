import "./App.css";


function App(props) {   
  return (
    <>
      <h1>{props.greeting}, {props.name}!</h1> {/* modified this line */}
      <button type="button">Click me!</button>
    </>
  );
}


export default App;