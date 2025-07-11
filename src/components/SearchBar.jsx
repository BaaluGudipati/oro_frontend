import { Search } from "lucide-react";
function SearchBar({ value, onChange, onSearch, loading }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="relative flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/50 dark:border-gray-700 rounded-2xl overflow-hidden shadow-xl">
        <Search className="w-5 h-5 text-gray-400 ml-4" />
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-4 bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg"
        />
        <button
          onClick={() => onSearch(value)}
          disabled={loading}
          className="px-9 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Search"
          )}
        </button>
      </div>
    </div>
  );
}
export default SearchBar;
