import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const [pingStatus, setPingStatus] = useState("Idle");
  const [logs, setLogs] = useState([
    { id: 1, time: "10:00:01", text: "EC2 instance initialized successfully." },
    { id: 2, time: "10:00:05", text: "Nginx reverse proxy attached on port 80." },
    { id: 3, time: "10:00:12", text: "React production build served." },
  ]);

  // Track page / session uptime
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const handleHealthCheck = () => {
    setPingStatus("Pinging...");
    setTimeout(() => {
      setPingStatus("Healthy (200 OK)");
      const now = new Date().toLocaleTimeString();
      setLogs((prev) => [
        ...prev,
        { id: Date.now(), time: now, text: "Manual health check passed (Status: 200 OK)" },
      ]);
    }, 600);
  };

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="logo-icon">☁️</span>
          <span className="logo-text">DevOps<b>Sandbox</b></span>
        </div>
        <div className="nav-badge">
          <span className="pulse-dot"></span>
          EC2 Connected
        </div>
      </nav>

      {/* Main Content */}
      <main className="container">
        {/* Hero Section */}
        <header className="hero">
          <h1>AWS EC2 Deployment Dashboard</h1>
          <p>
            Your React application is live on your cloud instance. Use this demo
            to inspect deployment status, server stats, and track DevOps progress.
          </p>
        </header>

        {/* Metrics Overview Cards */}
        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Instance Status</span>
            <div className="stat-value text-success">Active & Running</div>
            <span className="stat-sub">HTTP 200 OK</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Web Server</span>
            <div className="stat-value">Nginx / Port 80</div>
            <span className="stat-sub">Reverse Proxy</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Session Uptime</span>
            <div className="stat-value text-accent">{formatUptime(uptimeSeconds)}</div>
            <span className="stat-sub">Timer Active</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Environment</span>
            <div className="stat-value">Production</div>
            <span className="stat-sub">Ubuntu / Amazon Linux</span>
          </div>
        </section>

        {/* Two-Column Detail Layout */}
        <section className="content-grid">
          {/* Left Column: DevOps Roadmap / Checklist */}
          <div className="card">
            <div className="card-header">
              <h3>DevOps Learning Progress</h3>
              <span className="badge">Checklist</span>
            </div>
            <p className="card-subtitle">Track your server setup steps:</p>

            <div className="checklist">
              <label className="check-item">
                <input type="checkbox" defaultChecked />
                <span>Launch EC2 instance (Ubuntu / Linux)</span>
              </label>

              <label className="check-item">
                <input type="checkbox" defaultChecked />
                <span>Configure Security Groups (Port 22 SSH & Port 80 HTTP)</span>
              </label>

              <label className="check-item">
                <input type="checkbox" defaultChecked />
                <span>Install Node.js & run <code>npm run build</code></span>
              </label>

              <label className="check-item">
                <input type="checkbox" />
                <span>Serve build with Nginx at <code>/var/www/html</code></span>
              </label>

              <label className="check-item">
                <input type="checkbox" />
                <span>Containerize with Docker</span>
              </label>

              <label className="check-item">
                <input type="checkbox" />
                <span>Automate deployment using GitHub Actions CI/CD</span>
              </label>
            </div>
          </div>

          {/* Right Column: Server Health & Logs */}
          <div className="card">
            <div className="card-header">
              <h3>Server Actions & Event Log</h3>
              <button className="btn-ping" onClick={handleHealthCheck}>
                Test Health
              </button>
            </div>
            <div className="health-bar">
              <span>Health Status:</span>
              <strong className={pingStatus.includes("Healthy") ? "text-success" : ""}>
                {pingStatus}
              </strong>
            </div>

            <div className="terminal-window">
              <div className="terminal-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-title">deployment-events.log</span>
              </div>
              <div className="terminal-body">
                {logs.map((log) => (
                  <div key={log.id} className="log-line">
                    <span className="log-time">[{log.time}]</span>{" "}
                    <span className="log-text">{log.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>DevOps Learning Sandbox • Hosted on Amazon EC2</p>
      </footer>
    </div>
  );
}