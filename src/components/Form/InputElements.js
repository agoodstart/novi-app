

export const TextInput = ({placeholder, name, onChange, type}) => {
  return (
      <input
        className={styles['form__input']}
        placeholder={placeholder} 
        type={type}
        id={name}
        name={name}
        onChange={onChange} />
  )
};

