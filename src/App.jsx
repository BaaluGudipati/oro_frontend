import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import RepoCard from "./components/RepoCard";
import DarkModeToggle from "./components/DarkModeToggle";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { Github, Sparkles } from "lucide-react";

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const fetchGitHubData = async (searchUsername = username) => {
    if (!searchUsername.trim()) return;

    setLoading(true);
    setError(null);

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    };

    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${searchUsername}`, { headers }),
        fetch(
          `https://api.github.com/users/${searchUsername}/repos?sort=stars&per_page=8`,
          { headers }
        ),
      ]);

      if (!profileRes.ok) throw new Error("User not found");

      const profileData = await profileRes.json();
      const reposData = await reposRes.json();

      setProfile(profileData);
      setRepos(reposData);

      const newHistory = [
        searchUsername,
        ...searchHistory.filter((u) => u !== searchUsername),
      ].slice(0, 5);
      setSearchHistory(newHistory);
    } catch (err) {
      setError(err.message);
      setProfile(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const quickSearch = (user) => {
    setUsername(user);
    fetchGitHubData(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 transition-all duration-500">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-300 dark:bg-purple-500 blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-300 dark:bg-blue-500 blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-indigo-300 dark:bg-pink-500 blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="relative">
                <Github className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                GitHub Profile Explorer
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Discover amazing developers and their incredible projects
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex justify-end mb-4">
              <DarkModeToggle />
            </div>

            <SearchBar
              value={username}
              onChange={setUsername}
              onSearch={fetchGitHubData}
              loading={loading}
            />

            {searchHistory.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-lg text-white ">Recent:</span>
                {searchHistory.map((user, index) => (
                  <button
                    key={index}
                    onClick={() => quickSearch(user)}
                    className="px-3 py-1 text-sm text-white bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700 rounded-full hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-300"
                  >
                    {user}
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && <ErrorMessage message={error} />}

          {loading && <LoadingSpinner />}

          {profile && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <ProfileCard profile={profile} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                  ⭐ Featured Repositories
                </h3>
                <RepoCard repos={repos} />
              </div>
            </div>
          )}

          <div className="text-center mt-16 pb-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Built with ❤️ using GitHub API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
