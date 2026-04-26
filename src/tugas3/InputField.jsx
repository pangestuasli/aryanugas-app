import ErrorAlert from "./ErrorAlert";

export default function InputField({ label, name, value, onChange, error }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
      <ErrorAlert message={error} />
    </div>
  );
}

