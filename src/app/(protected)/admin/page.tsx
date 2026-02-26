export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">👨‍🎓 Students: 156</div>
        <div className="card">📘 Courses: 24</div>
        <div className="card">💰 Revenue: ฿485,200</div>
        <div className="card">📉 Expense: ฿182,500</div>
      </div>
    </div>
  )
}