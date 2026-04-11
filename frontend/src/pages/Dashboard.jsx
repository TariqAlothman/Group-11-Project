import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const stats = [
  { label: "Saved Recipes", value: "24", note: "In your favorites", icon: "heart" },
  { label: "Completed Recipes", value: "17", note: "All time", icon: "chef" },
  { label: "Saved Ingredients", value: "15", note: "Ready to cook", icon: "cart" },
  { label: "Day Streak", value: "5", note: "Keep it up", icon: "streak" },
];

const quickActions = [
  {
    title: "Start Ready to Cook",
    description: "Find recipes based on ingredients you have",
    icon: "pot",
    path: "/ready-to-cook",
  },
  {
    title: "View Favorites",
    description: "Browse your saved recipe collection",
    icon: "heart",
    path: "/favorites",
  },
  {
    title: "Manage Shopping List",
    description: "View and edit your shopping list",
    icon: "cart",
    path: "/shopping-list",
  },
  {
    title: "View History",
    description: "See your cooking journey",
    icon: "clock",
    path: "/cooking-history",
  },
];

const recommendations = [
  { title: "Homemade Pizza", meta: "45 min | Italian" },
  { title: "Pad Thai", meta: "30 min | Thai" },
];

const recentActivity = [
  { title: "Spaghetti Carbonara", when: "2 days ago" },
  { title: "Chicken Teriyaki", when: "5 days ago" },
  { title: "Greek Salad", when: "1 week ago" },
];

const systemBehavior = [
  "Dashboard data fetched on login and cached",
  "Stats updated in real-time as user interacts with recipes",
  "Recent activity shows last 3 completed recipes",
  "Recommendations based on user's cooking history and preferences",
  "Cooking streak tracked based on daily activity",
  "Quick actions provide direct navigation to key features",
];

function DashboardIcon({ type }) {
  const icons = {
    heart: (
      <>
        <path d="M12 21.35 10.55 20C5.4 15.24 2 12.09 2 8.25 2 5.1 4.42 2.75 7.5 2.75c1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.35 5.5 5.5 0 3.84-3.4 6.99-8.55 11.76L12 21.35Z" />
      </>
    ),
    chef: (
      <>
        <path d="M8 10h8v3a4 4 0 0 1-8 0v-3Z" />
        <path d="M7 10a3 3 0 1 1 1.5-5.6A3.5 3.5 0 0 1 15.5 4 3 3 0 1 1 17 10Z" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H7" />
        <circle cx="10" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
      </>
    ),
    streak: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M7 21v-2a5 5 0 0 1 10 0v2" />
      </>
    ),
    pot: (
      <>
        <path d="M7 10h10a3 3 0 0 1 3 3v5H4v-5a3 3 0 0 1 3-3Z" />
        <path d="M9 6h6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[type]}
    </svg>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  return (
    <section className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <h1>Welcome back, John!</h1>
          <p>Here's what's cooking in your kitchen</p>
        </header>

        <section className="dashboard-stats-grid">
          {stats.map((stat) => (
            <article className="dashboard-stat-card" key={stat.label}>
              <div className="dashboard-stat-top">
                <DashboardIcon type={stat.icon} />
                <strong>{stat.value}</strong>
              </div>
              <h2>{stat.label}</h2>
              <p>{stat.note}</p>
            </article>
          ))}
        </section>

        <div className="dashboard-main-layout">
          <div className="dashboard-left-column">
            <section className="dashboard-section">
              <h2 className="dashboard-section-title">Quick Actions</h2>
              <div className="dashboard-actions-grid">
                {quickActions.map((action) => (
                  <button
                    key={action.title}
                    type="button"
                    className="dashboard-action-card"
                    onClick={() => navigate(action.path)}
                  >
                    <span className="dashboard-action-icon">
                      <DashboardIcon type={action.icon} />
                    </span>
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="dashboard-section">
              <h2 className="dashboard-section-title">Recent Cooking Activity</h2>
              <div className="dashboard-activity-card">
                {recentActivity.map((item) => (
                  <div className="dashboard-activity-row" key={item.title}>
                    <div className="dashboard-activity-main">
                      <div className="dashboard-activity-image" />
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.when}</p>
                      </div>
                    </div>
                    <div className="dashboard-activity-actions">
                      <span className="dashboard-status-badge">Completed</span>
                      <button type="button" className="dashboard-cook-again-button">
                        Cook Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="dashboard-right-column">
            <section className="dashboard-section">
              <h2 className="dashboard-section-title">Recommended for You</h2>
              <div className="dashboard-recommend-card">
                <p className="dashboard-recommend-label">Popular This Week</p>
                {recommendations.map((recipe) => (
                  <article className="dashboard-recipe-card" key={recipe.title}>
                    <div className="dashboard-recipe-image" />
                    <h3>{recipe.title}</h3>
                    <p>{recipe.meta}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="dashboard-tip-card">
              <p className="dashboard-tip-label">Cooking Tip</p>
              <p>
                Update your ingredient list in "Ready to Cook" for better recipe matches.
              </p>
            </section>
          </aside>
        </div>

        <section className="dashboard-notes-card">
          <h2>SYSTEM BEHAVIOR</h2>
          <ul>
            {systemBehavior.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default Dashboard;
