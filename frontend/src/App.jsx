import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

function App() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const getLevelColor = (level) => {
  if (level === "INFO") return "green";
  if (level === "WARNING") return "orange";
  if (level === "ERROR") return "red";
  return "black";
};

  useEffect(() => {
  const fetchLogs = () => {
    fetch("http://127.0.0.1:8000/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error(err));
  };

  fetchLogs();

  const interval = setInterval(fetchLogs, 5000);

  return () => clearInterval(interval);
}, []);
  const errorCount = logs.filter(log => log.log_level === "ERROR").length;
const warningCount = logs.filter(log => log.log_level === "WARNING").length;
const chartData = [
  { name: "INFO", count: logs.filter(log => log.log_level === "INFO").length },
  { name: "WARNING", count: warningCount },
  { name: "ERROR", count: errorCount }
];
const pieData = [
  { name: "INFO", value: logs.filter(log => log.log_level === "INFO").length },
  { name: "WARNING", value: warningCount },
  { name: "ERROR", value: errorCount }
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

const filteredLogs =
  filter === "ALL"
    ? logs
    : logs.filter(log => log.log_level === filter);
const searchedLogs = filteredLogs.filter(
  (log) =>
    log.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.log_level.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div
    style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "0 auto",
        backgroundColor: darkMode ? "#1e1e1e" : "white",
        color: darkMode ? "white" : "black",
        minHeight: "100vh"
    }}
>
      <h1>Cloud Log Analytics Dashboard</h1>
      <button
    onClick={() => setDarkMode(!darkMode)}
    style={{
        marginBottom: "20px",
        padding: "10px 15px",
        cursor: "pointer"
    }}
>
    {darkMode ? "Light Mode" : "Dark Mode"}
</button>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
  <div style={{
    backgroundColor: darkMode ? "#333" : "#e3f2fd",
color: darkMode ? "white" : "black",
padding: "20px",
    borderRadius: "12px",
    minWidth: "140px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  }}>
    <h3>Total Logs</h3>
    <h1>{logs.length}</h1>
  </div>

  <div style={{
    backgroundColor: darkMode ? "#333" : "#fff3e0",
color: darkMode ? "white" : "black",
padding: "20px",
    borderRadius: "12px",
    minWidth: "140px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  }}>
    <h3>Errors</h3>
    <h1>{errorCount}</h1>
  </div>

  <div style={{
    backgroundColor: darkMode ? "#333" : "#fff3e0",
color: darkMode ? "white" : "black",
padding: "20px",
    borderRadius: "12px",
    minWidth: "140px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  }}>
    <h3>Warnings</h3>
    <h1>{warningCount}</h1>
  </div>
</div>
      <div style={{ marginBottom: "20px" }}>
  <button onClick={() => setFilter("ALL")}>All</button>

  <button
    onClick={() => setFilter("INFO")}
    style={{ marginLeft: "10px" }}
  >
    INFO
  </button>

  <button
    onClick={() => setFilter("WARNING")}
    style={{ marginLeft: "10px" }}
  >
    WARNING
  </button>

  <button
    onClick={() => setFilter("ERROR")}
    style={{ marginLeft: "10px" }}
  >
    ERROR
  </button>
</div>
<input
  type="text"
  placeholder="Search logs..."
  value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    padding: "8px",
    marginBottom: "20px",
    width: "250px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  }}
/>
      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
      <BarChart width={500} height={300} data={chartData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="count" fill="#4f46e5" />
</BarChart>
</div>
<div style={{ marginBottom: "30px" }}>
  <PieChart width={400} height={300}>
    <Pie
      data={pieData}
      cx="50%"
      cy="50%"
      outerRadius={100}
      dataKey="value"
      label
    >
      {pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</div>
      {searchedLogs.length === 0 && (
    <p style={{ color: "red", marginBottom: "10px" }}>
        No logs found
    </p>
)}
      <table
  border="1"
  cellPadding="10"
  style={{
    width: "100%",
    tableLayout: "auto",
    borderCollapse: "collapse"
  }}
>
        <thead>
          <tr>
  <th style={{backgroundColor: darkMode ? "#333" : "#f3f4f6", color: darkMode ? "white" : "black"}}>ID</th>

  <th style={{backgroundColor: darkMode ? "#333" : "#f3f4f6", color: darkMode ? "white" : "black"}}>Service</th>

  <th style={{backgroundColor: darkMode ? "#333" : "#f3f4f6", color: darkMode ? "white" : "black"}}>Level</th>

  <th style={{backgroundColor: darkMode ? "#333" : "#f3f4f6", color: darkMode ? "white" : "black"}}>Message</th>

  <th style={{backgroundColor: darkMode ? "#333" : "#f3f4f6", color: darkMode ? "white" : "black"}}>Timestamp</th>
</tr>
        </thead>
  <tbody>
          {searchedLogs.map((log) => (
            <tr
    key={log.id}
    style={{ cursor: "pointer" }}
    onClick={() => setSelectedLog(log)}
            >
              <td>{log.id}</td>
              <td>{log.service_name}</td>
              <td style={{ color: getLevelColor(log.log_level), fontWeight: "bold" }}>
  {log.log_level}
</td>
              <td>{log.message}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedLog && (
    <div
        style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9"
        }}
    >
        <h3>Selected Log Details</h3>
        <p><b>ID:</b> {selectedLog.id}</p>
        <p><b>Service:</b> {selectedLog.service_name}</p>
        <p><b>Level:</b> {selectedLog.log_level}</p>
        <p><b>Message:</b> {selectedLog.message}</p>
        <p><b>Timestamp:</b> {selectedLog.timestamp}</p>
    </div>
)}
    </div>
  );
}

export default App;