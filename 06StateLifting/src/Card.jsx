export const Panel = ({ title, children, isActive, onShow }) => {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}
    </section>
  );
};
