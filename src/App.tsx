import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-6">
        <TodoList />
      </main>
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>TaskMaster &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
