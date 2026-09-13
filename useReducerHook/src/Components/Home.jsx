import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function siv() {
    navigate("/ShowInstantValue");
  }
  function showcounter() {
    navigate("/showcounter");
  }
  function complexcounter() {
    navigate("/complexCounter");
  }
  return (
    <div>
      <button onClick={siv}>Show instant value</button>
      <button onClick={showcounter}>Counter</button>
      <button onClick={complexcounter}>Complex Counter</button>
    </div>
  );
}

export default Home;
