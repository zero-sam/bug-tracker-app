import { useState, useEffect } from "react";
import axios from "axios";

const CreateBugPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bugs, setBugs] = useState([]); // Track bugs from backend

  // Fetch all bugs when page loads
  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bugs");
      setBugs(res.data);
    } catch (error) {
      console.error("Error fetching bugs:", error.response || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ensure form doesn’t reload page

    // Input validation
    if (!title || !description) return alert("Please enter both title and description!");

    try {
      // Send new bug to the backend
      await axios.post("http://localhost:5000/api/bugs", { title, description });

      // Clear form fields
      setTitle("");
      setDescription("");

      // Fetch updated list of bugs (includes the new one)
      fetchBugs();
    } catch (error) {
      console.error("Error creating bug:", error);
      alert("Failed to submit bug");
    }
  };

  return (
    <div className="create-bug-container">
      <h2>Report a New Bug</h2>

      {/* Form to submit new bug */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bug Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit Bug</button>
      </form>

      {/* Display all reported bugs */}
      <h3>Reported Bugs:</h3>
      {bugs.length > 0 ? (
        bugs.map((bug) => (
          <div key={bug._id} className="bug-item">
            <strong>{bug.title}</strong> - {bug.description} | Status:{" "}
            <span style={{ color: bug.status === "Open" ? "red" : "green" }}>{bug.status}</span>
          </div>
        ))
      ) : (
        <p>No bugs reported yet.</p>
      )}
    </div>
  );
};

export default CreateBugPage;
