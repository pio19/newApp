import React from "react";

function Input({label, type, name, value, onChange}) {
    // const [value, setValue] = useState('');
    // const handleChange = (evt) => {
    //     console.log(evt);
        
    //     const {newValue} = evt.target.value;
    //     setValue(newValue);

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          required
          autoComplete={name}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default Input;
