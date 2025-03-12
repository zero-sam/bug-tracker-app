const BugList = ({ bugs }) => {
    return (
      <div>
        <h2>Reported Bugs</h2>
        {bugs.length === 0 ? (
          <p>No bugs reported yet!</p>
        ) : (
          <ul>
            {bugs.map((bug, index) => (
              <li key={index}>
                <strong>{bug.title}</strong> - {bug.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default BugList;
  