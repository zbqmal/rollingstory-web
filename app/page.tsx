export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Rolling Story
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create and collaborate on novels, page by page
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Start Writing
          </a>
          <a
            href="/login"
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
