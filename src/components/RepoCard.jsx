import { Star, GitFork, ExternalLink } from "lucide-react";
 function RepoCard({ repos }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      Java: "bg-red-500",
      "C++": "bg-purple-500",
      Go: "bg-cyan-500",
      Rust: "bg-orange-500",
      PHP: "bg-indigo-500",
      Ruby: "bg-pink-500",
      Swift: "bg-orange-400",
      Kotlin: "bg-purple-400",
      Dart: "bg-blue-400",
      "C#": "bg-green-400",
      HTML: "bg-orange-600",
      CSS: "bg-blue-600",
      Shell: "bg-gray-500",
      Dockerfile: "bg-blue-700",
    };
    return colors[language] || "bg-gray-400";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {repos.map((repo, index) => (
        <div
          key={repo.id}
          className="group relative animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/50 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate pr-2">
                {repo.name}
              </h4>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {repo.description || "No description available"}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {repo.language && (
                <span
                  className={`px-2 py-1 text-xs text-white rounded-full ${getLanguageColor(
                    repo.language
                  )}`}
                >
                  {repo.language}
                </span>
              )}
              {repo.topics &&
                repo.topics.slice(0, 2).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {repo.stargazers_count}
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  {repo.forks_count}
                </div>
              </div>
              <div className="text-xs">
                Updated {formatDate(repo.updated_at)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default RepoCard