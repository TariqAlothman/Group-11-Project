import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cookingHistory.css";

const stats = [
  { label: "Total Recipes", value: "17", note: "All time completed", icon: "chef" },
  { label: "This Week", value: "3", note: "Keep up the streak", icon: "calendar" },
  { label: "Avg Cook Time", value: "32 min", note: "All recipes", icon: "clock" },
  { label: "Top Cuisine", value: "Italian", note: "Most cooked", icon: "trend" },
];

const historyItems = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    meta: "30 min | 4.8 | 4 servings",
    cuisine: "Italian",
    when: "1 week ago",
    rating: 5,
  },
  {
    id: 2,
    title: "Chicken Teriyaki",
    meta: "25 min | 4.7 | 30 min",
    cuisine: "Japanese",
    when: "2 weeks ago",
    rating: 4,
  },
  {
    id: 3,
    title: "Greek Salad",
    meta: "15 min | 4.6 | 15 min",
    cuisine: "Greek",
    when: "3 weeks ago",
    rating: 5,
  },
  {
    id: 4,
    title: "Beef Tacos",
    meta: "20 min | 4.5 | 3 servings",
    cuisine: "Mexican",
    when: "1 month ago",
    rating: 4,
  },
  {
    id: 5,
    title: "Tomato Soup",
    meta: "35 min | 4.2 | 4 servings",
    cuisine: "American",
    when: "5 weeks ago",
    rating: 4,
  },
];

const achievements = [
  {
    title: "First Recipe",
    description: "Completed your first recipe",
    tone: "warm",
  },
  {
    title: "3-Day Streak",
    description: "Cooked 3 days in a row",
    tone: "green",
  },
  {
    title: "Master Chef",
    description: "Complete 50 recipes to unlock",
    tone: "muted",
    progress: 34,
  },
];

const systemBehavior = [
  "History updated automatically after cooking flow completed",
  "Recipe detail from history keeps previous rating",
  "Filters let users browse weekly, monthly, yearly",
  "Achievements unlock based on cooking milestones",
  "Users can rate recipes after completion",
  "Cook Again re-adds recipe to Ready-to-Cook flow",
  "Time spent tracked with cooking events",
];

function HistoryIcon({ type }) {
  const icons = {
    chef: (
      <>
        <path d="M8 10h8v3a4 4 0 0 1-8 0v-3Z" />
        <path d="M7 10a3 3 0 1 1 1.5-5.6A3.5 3.5 0 0 1 15.5 4 3 3 0 1 1 17 10Z" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3v3" />
        <path d="M17 3v3" />
        <path d="M4 8h16" />
        <rect x="4" y="5" width="16" height="15" rx="1" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    trend: (
      <>
        <path d="m4 16 5-5 4 4 7-8" />
        <path d="M14 7h6v6" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[type]}
    </svg>
  );
}

function CookingHistory() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <section className="history-page">
      <div className="history-shell">
        <header className="history-header">
          <h1>Cooking History</h1>
          <p>Track your culinary journey and cooking achievements</p>
        </header>

        <section className="history-stats-grid">
          {stats.map((stat) => (
            <article className="history-stat-card" key={stat.label}>
              <div className="history-stat-top">
                <HistoryIcon type={stat.icon} />
                <strong>{stat.value}</strong>
              </div>
              <h2>{stat.label}</h2>
              <p>{stat.note}</p>
            </article>
          ))}
        </section>

        <div className="history-main-layout">
          <section className="history-main-card">
            <div className="history-main-header">
              <h2>Recent Activity</h2>
              <div className="history-filter-tabs">
                {[
                  ["all", "All"],
                  ["week", "This Week"],
                  ["month", "This Month"],
                  ["year", "This Year"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={`history-filter-tab ${
                      activeFilter === value ? "history-filter-tab-active" : ""
                    }`}
                    onClick={() => setActiveFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="history-list">
              {historyItems.map((item) => (
                <article className="history-row" key={item.id}>
                  <div className="history-thumb" />
                  <div className="history-copy">
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <div className="history-row-meta">
                      <span className="history-stars">{"★".repeat(item.rating)}</span>
                      <span>{item.when}</span>
                      <span className="history-cuisine-tag">{item.cuisine}</span>
                    </div>
                  </div>
                  <div className="history-row-actions">
                    <button
                      type="button"
                      className="history-secondary-button"
                      onClick={() => navigate(`/recipes/${item.id}`)}
                    >
                      View Recipe
                    </button>
                    <button
                      type="button"
                      className="history-primary-button"
                      onClick={() => navigate(`/recipes/${item.id}`)}
                    >
                      Cook Again
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="history-pagination">
              <button type="button">Previous</button>
              <button type="button" className="is-active">
                1
              </button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">Next</button>
            </div>
          </section>

          <aside className="history-side-column">
            <section className="history-side-card">
              <h2>Achievements</h2>
              <div className="history-achievement-list">
                {achievements.map((item) => (
                  <article
                    className={`history-achievement-card history-achievement-${item.tone}`}
                    key={item.title}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.progress ? (
                      <div className="history-progress">
                        <div className="history-progress-bar" style={{ width: `${item.progress}%` }} />
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="history-tip-card">
              <h2>Cooking Insights</h2>
              <ul>
                <li>You cook most on weekends</li>
                <li>Italian is your favorite cuisine</li>
                <li>Average cooking time: 32 min</li>
                <li>You've cooked 3x this month</li>
              </ul>
            </section>
          </aside>
        </div>


      </div>
    </section>
  );
}

export default CookingHistory;
