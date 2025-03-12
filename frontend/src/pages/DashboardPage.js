import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [bugs, setBugs] = useState([]);

    useEffect(() => {
        fetchBugs();
    }, []);

    const fetchBugs = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/bugs");
          console.log("Fetched Bugs:", res.data);
          setBugs(res.data);
        } catch (error) {
          console.error("Error fetching bugs:", error.response || error.message);
        }
      };
      

      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/api/bugs/${id}`);
          fetchBugs(); // Refresh bugs after deletion
        } catch (err) {
          console.error("Failed to delete bug:", err.message);
        }
      };
      

      const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "Open" ? "Closed" : "Open";
        try {
          console.log(`Toggling bug ${id} to ${newStatus}`);
          const res = await axios.patch(`http://localhost:5000/api/bugs/${id}`, 
            { status: newStatus },
            { headers: { "Content-Type": "application/json" } }
          );
          console.log("Status updated:", res.data);
          fetchBugs();
        } catch (error) {
          console.error("Failed to update status:", error.response?.data || error.message);
          alert(`Failed to update status: ${error.response?.data || error.message}`);
        }
      };
      
      

    return (
        <div>
            <h1>Reported Bugs</h1>
            {bugs.map((bug) => (
                <div key={bug._id} className="bug-item">
                    <strong>{bug.title}</strong> - {bug.description} | Status:{" "}
                    <span
                        style={{
                            color: bug.status === "Open" ? "red" : "green",
                        }}
                    >
                        {bug.status}
                    </span>
                    <button onClick={() => toggleStatus(bug._id, bug.status)}>
                        {bug.status === "Open" ? "Close Bug" : "Reopen Bug"}
                    </button>
                    <button onClick={() => handleDelete(bug._id)}>❌ Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
