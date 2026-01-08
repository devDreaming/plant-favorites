import { useState } from 'react';
import Search from './pages/Search';
import Favorites from './pages/Favorites';

type Tab = 'search' | 'favorites';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('search');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Plant Favorites</h1>
          <p className="text-center text-green-100 mt-1">Discover and save your favorite plants</p>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'search'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Search
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'favorites'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Favorites
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'search' ? <Search /> : <Favorites />}
      </main>
    </div>
  );
}

export default App;
