import { useNavigate } from "react-router-dom";
import "./chefDashboard.css";

const dashboardStats = [
  { label: "Draft Recipes", value: "3", tone: "neutral", note: "Ready for refinement" },
  { label: "Pending Review", value: "2", tone: "warning", note: "Awaiting admin approval" },
  { label: "Approved Recipes", value: "15", tone: "success", note: "Available to all users" },
  { label: "Rejected", value: "1", tone: "danger", note: "Needs revision" },
];

const quickActions = [
  {
    title: "Create New Recipe",
    description: "Start a new recipe draft",
    tone: "accent",
    action: "new",
  },
  {
    title: "View Drafts",
    description: "Continue editing drafts",
    tone: "plain",
    action: "drafts",
  },
  {
    title: "Track Pending",
    description: "Check submission status",
    tone: "plain",
    action: "pending",
  },
  {
    title: "Published Recipes",
    description: "View live recipes",
    tone: "plain",
    action: "published",
  },
];

const updates = [
  {
    title: "Submission Guidelines",
    tone: "info",
    items: [
      "Include recipe title and clear instructions",
      "Photo uploads are highly recommended",
      "Add all ingredients with measurements",
      "List every allergy and serving note",
      "Expect review within 24 hours",
    ],
  },
  {
    title: "Approval Tips",
    tone: "success",
    items: [
      "Original recipes get priority",
      "Consistent formatting helps",
      "Clear photos increase approval rate",
      "Detailed descriptions matter",
    ],
  },
  {
    title: "Your Stats",
    tone: "plain",
    items: ["Approval rate: 88%", "Avg review time: 1.8 days", "Recipes live: 15"],
    progress: 88,
  },
];

const recentSubmissions = [
  { title: "Mushroom Risotto", date: "Feb 24, 2026", status: "Pending", tone: "warning" },
  { title: "Beef Wellington", date: "Feb 22, 2026", status: "Approved", tone: "success" },
  { title: "Caesar Salad", date: "Feb 20, 2026", status: "Rejected", tone: "danger" },
];

const systemBehavior = [
  "Dashboard refreshes after new submission actions",
  "Chef can create, edit, and submit recipes for review",
  "Pending submissions remain editable until approved",
  "Approved recipes appear in the public browsing flow",
  "Recent submission cards link to their current status",
  "Drafts auto-save every 30 seconds",
];

function ChefDashboard() {
  const navigate = useNavigate();

  function handleQuickAction(action) {
    if (action === "new") {
      navigate("/chef/create-recipe");
      return;
    }

    if (action === "drafts" || action === "pending") {
      navigate("/chef/submissions");
      return;
    }

    if (action === "published") {
      navigate("/browse");
    }
  }

  return (
    <main className="chef-page">
      <section className="chef-shell">
        <header className="chef-header">
          <div>
            <p className="chef-eyebrow">Chef Dashboard</p>
            <h1>Chef Dashboard</h1>
            <p className="chef-subtitle">
              Manage your recipe contributions and submission pipeline.
            </p>
          </div>
        </header>

        <section className="chef-stat-grid">
          {dashboardStats.map((stat) => (
            <article key={stat.label} className={`chef-card chef-stat chef-tone-${stat.tone}`}>
              <div className="chef-stat-top">
                <span className="chef-dot" />
                <strong>{stat.value}</strong>
              </div>
              <h2>{stat.label}</h2>
              <p>{stat.note}</p>
            </article>
          ))}
        </section>

        <section className="chef-dashboard-grid">
          <div className="chef-dashboard-main">
            <article className="chef-card">
              <div className="chef-card-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="chef-action-grid">
                {quickActions.map((action) => (
                  <button
                    key={action.title}
                    type="button"
                    className={`chef-action-card chef-tone-${action.tone}`}
                    onClick={() => handleQuickAction(action.action)}
                  >
                    <span className="chef-action-icon">{action.title.charAt(0)}</span>
                    <strong>{action.title}</strong>
                    <span>{action.description}</span>
                  </button>
                ))}
              </div>
            </article>

            <article className="chef-card">
              <div className="chef-card-header">
                <h2>Recent Submissions</h2>
              </div>
              <div className="chef-list">
                {recentSubmissions.map((submission) => (
                  <div key={submission.title} className="chef-list-row">
                    <div className="chef-list-thumb" />
                    <div className="chef-list-copy">
                      <strong>{submission.title}</strong>
                      <span>{submission.date}</span>
                    </div>
                    <span className={`chef-badge chef-tone-${submission.tone}`}>
                      {submission.status}
                    </span>
                    <button
                      type="button"
                      className="chef-inline-button"
                      onClick={() => navigate("/chef/submissions")}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="chef-dashboard-side">
            {updates.map((panel) => (
              <article key={panel.title} className={`chef-card chef-info-panel chef-tone-${panel.tone}`}>
                <h2>{panel.title}</h2>
                <ul className="chef-mini-list">
                  {panel.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {panel.progress ? (
                  <div className="chef-progress">
                    <div className="chef-progress-bar" style={{ width: `${panel.progress}%` }} />
                  </div>
                ) : null}
              </article>
            ))}
          </aside>
        </section>

        <section className="chef-card chef-system-note">
          <h2>System Behavior</h2>
          <ul className="chef-mini-list">
            {systemBehavior.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default ChefDashboard;