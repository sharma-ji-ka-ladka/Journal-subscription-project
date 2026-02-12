import React, { useState } from "react";

const BrowseJournals = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const articles = [
    {
      id: 1,
      title: "AI is Transforming the Future",
      description: "Artificial Intelligence is reshaping industries.",
      category: "Technology",
    },
    {
      id: 2,
      title: "Champions League Final",
      description: "A thrilling football match analysis.",
      category: "Sports",
    },
    {
      id: 3,
      title: "Political Shifts 2026",
      description: "An overview of global political changes.",
      category: "Politics",
    },
    {
      id: 4,
      title: "Mountain Adventure Guide",
      description: "Explore the best hiking destinations.",
      category: "Adventure",
    },
    {
      id: 5,
      title: "Education in 2030",
      description: "How learning is evolving globally.",
      category: "Education",
    },
    {
      id: 6,
      title: "Cinema & Entertainment Trends",
      description: "Streaming platforms reshaping entertainment.",
      category: "Entertainment",
    },
  ];

  const categories = [
    "All",
    "Sports",
    "Entertainment",
    "Education",
    "Adventure",
    "Technology",
    "Politics",
  ];

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter(
          (article) => article.category === selectedCategory
        );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Browse Journals</h2>

      <div className="mb-6">
        <label className="mr-3 font-medium">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredArticles.length === 0 ? (
        <p>No articles available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white shadow-md p-6 rounded-lg border"
            >
              <h3 className="text-xl font-semibold mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-3">
                {article.description}
              </p>
              <p className="text-sm text-purple-600">
                Category: {article.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseJournals;
