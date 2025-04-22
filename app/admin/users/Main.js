"use client";

const userData = [
  {
    matno: "u2020/3402122",
    username: "Jeremy",
    department: "Computer Science",
  },
  { matno: "u2020/3402123", username: "Alex", department: "Mathematics" },
  { matno: "u2020/3402124", username: "Sarah", department: "Physics" },
  { matno: "u2020/3402125", username: "Michael", department: "Engineering" },
];

export default function DashboardContent() {
  return (
    <div className="space-y-8 mt-[80px] p-8 pt-14 sm:pt-16 md:pl-16">
      {/* Greeting */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          Hello Williams
        </h1>
        <p className="text-2xl sm:text-3xl font-normal text-gray-600">
          View Library Users
        </p>
      </div>

      {/* User List Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-4">Library Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 font-normal text-black text-lg">Matno</th>
                <th className="py-3 font-normal text-black text-lg">
                  Username
                </th>
                <th className="py-3 font-normal text-black text-lg">
                  Department
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 text-black text-base font-normal">
                    {user.matno}
                  </td>
                  <td className="py-3 text-black text-base font-normal">
                    {user.username}
                  </td>
                  <td className="py-3 text-black text-base font-normal">
                    {user.department}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
