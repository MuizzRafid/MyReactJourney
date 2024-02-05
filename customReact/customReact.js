function customRender(rE, c) {
  //1st approach
  /*
  const domElement = document.createElement(rE.type);
  domElement.innerHTML = rE.children;
  domElement.setAttribute("href", rE.props.href);
  domElement.setAttribute("target", rE.props.target);
*/
  //2nd approach
  const domElement = document.createElement(rE.type);
  domElement.innerHTML = rE.children;
  for (prop in rE.props) {
    domElement.setAttribute(prop, rE.props[prop]);
  }

  c.appendChild(domElement);
}

const reactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "Click me to visit google",
};
const mainContainer = document.querySelector("#root");

customRender(reactElement, mainContainer);
