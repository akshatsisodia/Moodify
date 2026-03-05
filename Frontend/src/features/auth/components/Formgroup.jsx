const Formgroup = ({label, value, onChange, placeholder}) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input 
      value={value} 
      onChange={onChange} name={label} type={label} placeholder={placeholder} />
    </div>
  );
};

export default Formgroup;