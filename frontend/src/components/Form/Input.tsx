interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (name: string, newValue: string) => void;
}

export default function Input({
  name,
  label,
  type,
  placeholder,
  required = false,
  value,
  onChange,
}: InputProps) {
  return (
    <label className="form-control w-full uppercase" htmlFor={name}>
      <div className="label">
        <span className="label-text text-slate-500 flex flex-row gap-1">
          {label}
          {required && <span className="text-error">*</span>}
        </span>
      </div>
      <input
        {...{ name, type, placeholder, required, value }}
        onChange={(event) => {
          const newValue = event.target.value;
          onChange(name, newValue);
        }}
        className="input input-bordered w-full"
      />
    </label>
  );
}
