import "./InputNumber.css";

const InputNumber = ({
  label = "",
  value,
  setFunction = () => {},
  id = "input",
}) => {
  const onChange = (e) => {
    const value = parseInt(e.target.value);

    setFunction(isNaN(value) ? 3 : value > 0 ? value : 1);
  };
  return (
    <div className="input-number">
      <label className="input-number__label" htmlFor={id}>
        {label}
      </label>
      <input
        type="number"
        className="input-number__input"
        value={value}
        onChange={onChange}
        id={id}
      />
    </div>
  );
};

export default InputNumber;
