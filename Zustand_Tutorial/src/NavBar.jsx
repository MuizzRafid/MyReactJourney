import useMyStore from "./store";

const NavBar = () => {
  const count = useMyStore((state) => state.count);
  const name = useMyStore((state) => state.name);
  const status = useMyStore((state) => state.status);
  const capdecap = useMyStore((state) => state.capdecap);
  const increment = useMyStore((state) => state.increment);
  const capitalize = useMyStore((state) => state.capitalize);

  return (
    <div>
      <h2>Count : {count}</h2>

      <br />

      <h2>Name : {name}</h2>

      <br />

      <h2>Status : {status ? "true" : "false"}</h2>

      <br />

      <button
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          color: "green",
          marginRight: "10px",
        }}
        onClick={increment}
      >
        Increment
      </button>

      <button onClick={capitalize}>{capdecap} Name</button>
    </div>
  );
};

export default NavBar;
