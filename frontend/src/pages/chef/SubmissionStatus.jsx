const submissionTabs = [
  { label: "Drafts", count: 3, tone: "accent" },
  { label: "Pending", count: 2, tone: "warning" },
  { label: "Approved", count: 1, tone: "success" },
  { label: "Rejected", count: 0, tone: "danger" },
];

const submissions = [
  {
    title: "Homemade Pizza Dough",
    updated: "Last saved 2 days ago",
    progress: 70,
  },
  {
    title: "Thai Green Curry",
    updated: "Last saved 1 day ago",
    progress: 45,
  },
  {
    title: "Chocolate Chip Cookies",
    updated: "Last saved 5 days ago",
    progress: 90,
  },
];

const systemBehavior = [
  "Drafts resume editing from the last saved version",
  "Pending items show status updates automatically",
  "Approved recipes appear in public browsing after sync",
  "Rejected recipes include revision feedback",
  "Chefs can continue editing draft submissions",
  "Progress bars reflect completed required fields",
  "Inline actions forward to the proper recipe editor",
];

function SubmissionStatus() {
  return (
    <main className="chef-page">
      <section className="chef-shell">
        <header className="chef-header">
          <div>
            <p className="chef-eyebrow">Submission Status</p>
            <h1>My Submissions</h1>
            <p className="chef-subtitle">Track and manage your recipe submissions.</p>
          </div>
        </header>

        <section className="chef-card">
          <div className="chef-tabs">
            {submissionTabs.map((tab, index) => (
              <button
                key={tab.label}
                type="button"
                className={`chef-tab ${index === 0 ? "is-active" : ""} chef-tone-${tab.tone}`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <div className="chef-submission-list">
            {submissions.map((submission) => (
              <article key={submission.title} className="chef-submission-row">
                <div className="chef-list-thumb" />
                <div className="chef-submission-copy">
                  <strong>{submission.title}</strong>
                  <span>{submission.updated}</span>
                  <div className="chef-progress chef-progress-submission">
                    <div
                      className="chef-progress-bar"
                      style={{ width: `${submission.progress}%` }}
                    />
                  </div>
                </div>
                <span className="chef-progress-text">{submission.progress}% complete</span>
                <button type="button" className="chef-primary-button chef-small-button">
                  Continue Editing
                </button>
                <button type="button" className="chef-icon-button" aria-label="Delete draft">
                  ×
                </button>
              </article>
            ))}
          </div>
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

export default SubmissionStatus;
