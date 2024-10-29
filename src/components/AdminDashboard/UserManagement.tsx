const UserManagement = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="p-3 text-left">User Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row, replace with dynamic data */}
          <tr className="border-b">
            <td className="p-3">John Doe</td>
            <td className="p-3">john@example.com</td>
            <td className="p-3">User</td>
            <td className="p-3 flex space-x-2">
              <button className="text-blue-500">Edit Role</button>
              <button className="text-red-500">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
