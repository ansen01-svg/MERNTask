export default function TextInput(props) {
  const { type, label, labelFor, placeholder, value, handleChange } = props;

  return (
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <label
        className="text-[14px] text-primaryLight font-medium"
        htmlFor={labelFor}
      >
        {label}
      </label>
      <input
        className="w-full h-[35px] text-[14px] px-2 py-2 border-solid border-[1px] border-slate-300 outline-blue-600 rounded"
        type={type}
        placeholder={placeholder || ""}
        name={labelFor}
        id={labelFor}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
