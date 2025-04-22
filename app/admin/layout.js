// app/admin/layout.js
export default function AdminLayout({ children }) {
  return (
    <div>
      {/* Admin-specific layout */}

      <main>{children}</main>
    </div>
  );
}
