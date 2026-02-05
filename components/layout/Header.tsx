export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-indigo-600">
              Rolling Story
            </a>
          </div>
          <nav className="flex gap-4">
            <a href="/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </a>
            <a href="/register" className="text-gray-700 hover:text-indigo-600">
              Sign Up
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
