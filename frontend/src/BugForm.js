import { useState } from "react";
import axios from "axios";

const BugForm = ({ addBug }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBug = { title, description };
    const res = await axios.post("http://localhost:5000/api/bugs", newBug);
    addBug(res.data);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Bug Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Bug Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Report Bug</button>
    </form>
  );
};

export default BugForm;
