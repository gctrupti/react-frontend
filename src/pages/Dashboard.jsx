import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
  try {
    setLoadingTasks(true);
    const res = await API.get("/tasks");
    setTasks(res.data);
  } catch {
    alert("Failed to load tasks");
  } finally {
    setLoadingTasks(false);
  }
};


  const createTask = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } finally {
      setLoading(false);
    }
  };
  const toggleTask = async (id) => {
  try {
    await API.patch(`/tasks/${id}`);
    fetchTasks();
  } catch {
    alert("Failed to update task");
  }
};


  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Task Dashboard
          </h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Add Task */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            className="flex-1 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={createTask}
            disabled={loading}
            className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {/* Task List */}
        {loadingTasks ? (
  // 🔄 Loading skeleton
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="h-12 bg-gray-200 rounded animate-pulse"
      ></div>
    ))}
  </div>
) : tasks.length === 0 ? (
  // 📭 Empty state
  <p className="text-center text-gray-500">
    No tasks yet. Add one above 👆
  </p>
) : (
  // ✅ Task list
  <div className="grid gap-4">
    {tasks.map((task) => (
      <div
        key={task._id}
        className="bg-white p-4 rounded-lg shadow flex justify-between items-center hover:shadow-md transition"
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task._id)}
            className="w-4 h-4"
          />
          <span
            className={`${
              task.completed
                ? "line-through text-gray-400"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </span>
        </div>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
