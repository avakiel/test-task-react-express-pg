import React, { useEffect, useState } from "react";
import { fetcher } from "../helpers/fetcher";

interface Topic {
  id: string;
  title: string;
  parentId: string | null;
}

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");

  // Fetch topics from backend
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const data = await fetcher("/api/topics");
      setTopics(data);
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new topic
  const addTopic = async () => {
    if (!newTopicTitle) return alert("Topic title cannot be empty.");

    try {
      const newTopic = await fetcher("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTopicTitle }),
      });
      setTopics((prev) => [...prev, newTopic]);
      setNewTopicTitle("");
    } catch (error) {
      console.error("Failed to add topic:", error);
    }
  };

  // Edit a topic
  const editTopic = async (id: string, newTitle: string) => {
    try {
      await fetcher(`/api/topics/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      setTopics((prev) =>
        prev.map((topic) => (topic.id === id ? { ...topic, title: newTitle } : topic))
      );
    } catch (error) {
      console.error("Failed to edit topic:", error);
    }
  };

  // Delete a topic
  const deleteTopic = async (id: string) => {
    try {
      await fetcher(`/api/topics/${id}`, { method: "DELETE" });
      setTopics((prev) => prev.filter((topic) => topic.id !== id));
    } catch (error) {
      console.error("Failed to delete topic:", error);
    }
  };

  // Fetch topics on component mount
  useEffect(() => {
    fetchTopics();
  }, []);

  if (loading) return <div className="text-center mt-10 text-white">Loading topics...</div>;

  return (
    <div className="flex w-full h-screen bg-black text-white">
      {/* Left Sidebar: Online Users */}
      <aside className="w-1/12 bg-black p-4 flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Online Users</h2>
        <ul className="space-y-4">
          {["User 1", "User 2", "User 3"].map((user, index) => (
            <li
              key={index}
              className="bg-gray-800 text-gray-300 p-4 rounded shadow hover:bg-gray-700 transition"
            >
              {user}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content: Topics */}
      <main className="flex-1 bg-gray-800 rounded-lg p-3 pt-10 shadow-lg overflow-x-auto">
        <div className="flex justify-center items-center gap-2">
          <h1 className="text-xl font-bold">Topics</h1>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              placeholder="Topic Title"
              className="p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
            />
            <button
              onClick={addTopic}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Topic
            </button>
          </div>
        </div>

        <ul className="space-y-4 p-8 px-2">
          {topics.map((topic) => (
            <li
              key={topic.id}
              className="bg-gray-700 text-white p-4 rounded shadow flex justify-between items-center"
            >
              <span>{topic.title}</span>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    editTopic(
                      topic.id,
                      prompt("New Title", topic.title) || topic.title
                    )
                  }
                  className="text-blue-400 hover:text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTopic(topic.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {/* Right Sidebar: Current User */}
      <div className="absolute top-1 right-1 flex items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/40"
            alt="User Icon"
            className="w-10 h-10 rounded-full bg-gray-700"
          />
          <div>
            <p className="text-sm font-medium">CurrentUserEmail@example.com</p>
          </div>
        </div>
        <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Logout</button>
      </div>
    </div>
  );
};

export default Topics;
