import React, { useState, useEffect, useCallback } from 'react';

// --- Mock API Data Simulation ---
// In a real application, replace these mock objects with actual fetch calls
// to your Drupal JSON:API endpoints.

const mockMenuResponse = {
  data: [
    { id: 1, title: "Home", url: "#home" },
    { id: 2, title: "About Us", url: "#about" },
    { id: 3, title: "Services", url: "#services" },
    { id: 4, title: "Blog", url: "#blog" },
  ],
};

const mockArticlesResponse = {
  data: [
    {
      id: "a1",
      title: "The Future of Headless Drupal",
      bodySnippet: "Leveraging the JSON:API, Drupal acts as a powerful content repository, enabling modern frontends to consume data efficiently and build dynamic experiences.",
      date: "2025-09-25",
      author: "Jane Doe"
    },
    {
      id: "a2",
      title: "Getting Started with React and Tailwind",
      bodySnippet: "A quick guide to setting up a high-performance frontend using the most popular tools in modern web development.",
      date: "2025-09-24",
      author: "John Smith"
    },
    {
      id: "a3",
      title: "Community Events This Quarter",
      bodySnippet: "Don't miss the upcoming virtual and in-person events focused on open-source CMS and digital transformation.",
      date: "2025-09-23",
      author: "Community Team"
    },
  ],
};


// Utility component for a loading spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    <p className="ml-4 text-gray-600 font-semibold">Loading content from Drupal...</p>
  </div>
);


// Header Component
const Header = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-indigo-700 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <h1 className="text-white text-xl font-extrabold tracking-tight">
              Headless Central
            </h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  className="text-indigo-200 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
            >
              {isOpen ? (
                // Close icon (X)
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Menu icon (Hamburger)
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className="block text-white hover:bg-indigo-600 px-3 py-2 rounded-md text-base font-medium transition duration-150"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};


// Article Card Component
const ArticleCard = ({ article }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100">
    <h3 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h3>
    <p className="text-sm text-indigo-600 font-medium mb-4">
      {article.author} on {new Date(article.date).toLocaleDateString()}
    </p>
    <p className="text-gray-600 leading-relaxed">
      {article.bodySnippet}
      <a href={`#article-${article.id}`} className="text-indigo-500 hover:text-indigo-700 font-semibold ml-2">
        Read More
      </a>
    </p>
  </div>
);


// Main Application Component
export default function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to simulate fetching data from two endpoints
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // Simulated network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // --- Simulate Menu Fetch ---
      // In a real scenario: const menuResponse = await fetch('YOUR_DRUPAL_MENU_API_URL');
      // const menuData = await menuResponse.json();
      setMenuItems(mockMenuResponse.data);

      // --- Simulate Articles Fetch ---
      // In a real scenario: const articleResponse = await fetch('YOUR_DRUPAL_ARTICLES_API_URL');
      // const articleData = await articleResponse.json();
      setArticles(mockArticlesResponse.data);

    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load content. Please check the API endpoints.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* Set up Tailwind for the whole app */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      
      {/* Header with Menu */}
      <Header menuItems={menuItems} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
          Latest Content (Powered by Drupal)
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative mb-6" role="alert">
            <strong className="font-bold">API Error: </strong>
            <span className="block sm:inline">{error}</span>
            <p className="text-sm mt-1">Using mock data for demonstration.</p>
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.length > 0 ? (
              articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 p-12 bg-white rounded-xl shadow-inner">
                No articles found. Check your Drupal API configuration.
              </p>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Headless CMS Demo. Data provided by simulated Drupal API.</p>
        </div>
      </footer>
    </div>
  );
}