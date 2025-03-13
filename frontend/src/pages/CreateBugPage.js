import { useEffect, useState } from "react";
import axios from "axios";

const CreateBugPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cve, setCVE] = useState(""); // New state for CVE
  const [severity, setSeverity] = useState(""); // New state for Severity
  const [bugs, setBugs] = useState([]);

  // Fetch all bugs on component load
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bugs");
        setBugs(res.data);
      } catch (error) {
        console.error("Error fetching bugs:", error.response || error.message);
      }
    };
    fetchBugs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !cve || !severity) return alert("Please fill all fields!");
  
    console.log("Submitting:", { title, description, cve, severity }); // ✅ Check data before sending
  
    try {
      const res = await axios.post("http://localhost:5000/api/bugs", {
        title,
        description,
        cve,
        severity,
      });
  
      console.log("Response:", res.data); // ✅ Check the backend response
  
      // Fetch the updated list after adding a bug
      const updatedBugs = await axios.get("http://localhost:5000/api/bugs");
      setBugs(updatedBugs.data);
  
      // Clear the form
      setTitle("");
      setDescription("");
      setCVE("");
      setSeverity("");
    } catch (error) {
      console.error("Error creating bug:", error);
      alert("Failed to submit bug");
    }
  };
  

  return (
    <div className="create-bug-container">
      <h2>Report a New Bug</h2>
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

        {/* CVE Dropdown */}
        <select value={cve} onChange={(e) => setCVE(e.target.value)}>
          <option value="">Select CVE</option>
          <option value="CVE-2024-1234">CVE-2024-1234</option>
          <option value="CVE-2024-5678">CVE-2024-5678</option>
          <option value="CVE-2024-9101">CVE-2024-9101</option>
        </select>

        {/* Severity Dropdown */}
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="">Select Severity</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        <button type="submit">Submit Bug</button>
      </form>

      <h3>All Reported Bugs:</h3>
      {bugs.length > 0 ? (
        bugs.map((bug) => (
          <div key={bug._id} className="bug-item">
            <strong>{bug.title}</strong> - {bug.description} | CVE: {bug.cve} | Severity:{" "}
            <span style={{ color: bug.severity === "Critical" ? "red" : "orange" }}>
              {bug.severity}
            </span>
          </div>
        ))
      ) : (
        <p>No bugs reported yet.</p>
      )}
    </div>
  );
};

export default CreateBugPage;
