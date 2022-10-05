import "./App.css";
import Card from "./components/Card";
function App() {
  return (
    <div className="App">
      <Card
        onPayClick={(value) => {
          console.log(value);

          alert("Payment Success !!!");
        }}
      />
    </div>
  );
}

export default App;
