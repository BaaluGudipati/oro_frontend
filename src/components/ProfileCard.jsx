import { MapPin, Calendar, ExternalLink } from "lucide-react";

function ProfileCard({ profile }) {
  if (!profile) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/50 dark:border-gray-700 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/50 dark:border-gray-700 shadow-xl">
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {profile.name || profile.login}
              </h2>
              <p className="text-xl text-purple-600 dark:text-purple-400 mb-4">
                @{profile.login}
              </p>
              {profile.bio && (
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-2xl">
                  {profile.bio}
                </p>
              )}

              {/* Profile Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {profile.public_repos}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Repositories
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {profile.followers}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Followers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {profile.following}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Following
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {profile.public_gists}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Gists
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                )}
                {profile.created_at && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {formatDate(profile.created_at)}
                  </div>
                )}
                {profile.blog && (
                  <a
                    href={
                      profile.blog.startsWith("http")
                        ? profile.blog
                        : `https://${profile.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileCard;
