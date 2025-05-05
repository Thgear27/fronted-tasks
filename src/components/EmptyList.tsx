import ClipboardListIcon from "./svgs/ClipboardListIcon";

function EmptyList() {
  return (
    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
      <ClipboardListIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-700">No tasks yet</h3>
      <p className="mt-1 text-gray-500">Add a new task to get started</p>
    </div>
  );
}

export default EmptyList;
