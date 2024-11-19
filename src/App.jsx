import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    status: "draft",
  });
  const [articles, setArticles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) return;
    setArticles([...articles, formData]);
    setFormData({ title: "", author: "", status: "draft" });
  };

  const handleDelete = (index) => {
    setArticles(articles.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingTitle(articles[index].title);
  };

  const handleSaveEdit = (index) => {
    const updatedArticles = articles.map((article, i) =>
      i === index ? { ...article, title: editingTitle } : article
    );
    setArticles(updatedArticles);
    setEditingIndex(null);
    setEditingTitle("");
  };

  return (
    <div className="container">
      <h1>Gestione Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Titolo dell'articolo"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Autore dell'articolo"
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="submit">Aggiungi</button>
      </form>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <div>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    placeholder="Modifica il titolo"
                  />
                  <button onClick={() => handleSaveEdit(index)}>Salva</button>
                </>
              ) : (
                <>
                  <strong>{article.title}</strong> - {article.author} ({article.status})
                  <button onClick={() => handleEdit(index)}>✏️</button>
                </>
              )}
            </div>
            <button className="delete" onClick={() => handleDelete(index)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
