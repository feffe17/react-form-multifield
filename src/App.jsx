import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    category: "news",
    tags: [],
    status: "draft",
    image: "",
  });

  const [articles, setArticles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const categories = ["news", "tech", "lifestyle"];
  const tagsOptions = ["React", "JavaScript", "CSS", "HTML"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "tags") {
      const newTags = checked
        ? [...formData.tags, value]
        : formData.tags.filter((tag) => tag !== value);
      setFormData({ ...formData, tags: newTags });
    } else if (type === "file") {
      setFormData({ ...formData, image: e.target.files[0]?.name || "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.author.trim()) {
      alert("Il titolo e l'autore sono obbligatori!");
      return;
    }

    // Mostra un alert di conferma prima di aggiungere l'articolo
    const confirmAdd = window.confirm(
      `Sei sicuro di voler aggiungere il seguente post?\n\n` +
      `Titolo: ${formData.title}\n` +
      `Autore: ${formData.author}\n` +
      `Categoria: ${formData.category}\n` +
      `Tags: ${formData.tags.join(", ")}\n`
    );

    if (confirmAdd) {
      setArticles([...articles, formData]);
      setFormData({
        title: "",
        author: "",
        content: "",
        category: "news",
        tags: [],
        status: "draft",
        image: "",
      });
    }
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
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Contenuto dell'articolo"
        ></textarea>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="tags-list">
          <p>Tags:</p>
          {tagsOptions.map((tag, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name="tags"
                value={tag}
                checked={formData.tags.includes(tag)}
                onChange={handleChange}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
        <input type="file" name="image" onChange={handleChange} />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="submit">Aggiungi</button>
      </form>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            {article.image && (
              <img
                src={`path/to/images/${article.image}`}
                alt={article.title}
                className="post-image"
              />
            )}
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
                  <strong>{article.title}</strong> - {article.author} (
                  {article.status})
                  <p>{article.content}</p>
                  <p>Categoria: {article.category}</p>
                  <p>Tags: {article.tags.join(", ")}</p>
                  <p>Immagine: {article.image || "Nessuna immagine"}</p>
                </>
              )}
            </div>
            <div className="post-actions">
              <button onClick={() => handleEdit(index)}>✏️ Modifica</button>
              <button
                className="delete"
                onClick={() => handleDelete(index)}
              >
                🗑️ Elimina
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
