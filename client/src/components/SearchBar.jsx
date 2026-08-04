import "./SearchBar.css";

function SearchBar({
  search,
  setSearch,
  department,
  setDepartment,
}) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="🔍 Search Doctor..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="department-filter"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="All">All Departments</option>
        <option value="Cardiologist">Cardiologist</option>
        <option value="Dentist">Dentist</option>
        <option value="Neurologist">Neurologist</option>
        <option value="Dermatologist">Dermatologist</option>
        <option value="Orthopedic">Orthopedic</option>
        <option value="Pediatrician">Pediatrician</option>
      </select>
    </div>
  );
}

export default SearchBar;