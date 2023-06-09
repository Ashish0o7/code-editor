export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "5px",
    backgroundColor: state.isFocused ? "#f5f5f5" : "#f9f9f9",
    borderColor: state.isFocused ? "#6c63ff" : "#dcdcdc",
    boxShadow: state.isFocused ? "0 0 0 2px #6c63ff" : null,
    transition: "all 0.3s ease",
    cursor: "pointer",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    color: "#333",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#6c63ff" : state.isFocused ? "#f5f5f5" : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":active": {
      backgroundColor: "#6c63ff",
      color: "#fff",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    borderRadius: "5px",
    border: "1px solid #dcdcdc",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#999",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
  }),
};
