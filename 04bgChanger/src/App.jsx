import { useState } from "react";
function App() {
  const [color, setColor] = useState("olive");

  return (
    <>
      <div
        className="w-full h-screen duration-200"
        style={{ backgroundColor: color }}
      >
        <div
          className="fixed flex flex-wrap justify-center 
        bottom-12 inset-x-0 px-2"
        >
          <div
            className="flex flex-wrap justify-center gap-3
           shadow-lg bg-white px-3 py-2 rounded-3xl"
          >
            <button
              /* here onclick takes a function.So if i give him
            the setColor function like this onClick={setColer}
            it's a referance of setColor function.it still decent
            but in this way i can't give any argument like
            onClick={setColor("red")},in this case i pass a argument
            and execute the function and gives what setColor return,but
            onClick doesn't want that.So i use another callBack function
            and under that function i execute setColor Function.By this
            onClick get its function and i passed my argument*/
              onClick={() => setColor("red")}
              className="outline-none px-4 rounded-full py-1
              shadow-lg text-white"
              style={{ backgroundColor: "red" }}
            >
              Red
            </button>
            <button
              onClick={() => setColor("blue")}
              className="outline-none px-4 rounded-full py-1
              shadow-lg text-white"
              style={{ backgroundColor: "blue" }}
            >
              Blue
            </button>
            <button
              onClick={() => setColor("green")}
              className="outline-none px-4 rounded-full py-1
              shadow-lg text-white"
              style={{ backgroundColor: "green" }}
            >
              Green
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
