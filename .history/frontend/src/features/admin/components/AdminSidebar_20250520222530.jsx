import { Home, Users, ShoppingCart, FileText, BarChart2, PieChart, Settings, UserCog } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const menu = [
  { label: "Dashboard", icon: <Home />, path: "/dashboard" },
  { label: "Client Facing", path: "/client-facing" },
  { label: "Products", icon: <ShoppingCart />, path: "/products" },
  { label: "Customers", icon: <Users />, path: "/customers" },
  { label: "Transactions", icon: <FileText />, path: "/transactions" },
  { label: "Sales", children: [
    { label: "Overview", icon: <BarChart2 />, path: "/sales/overview" },
    { label: "Breakdown", icon: <PieChart />, path: "/sales/breakdown" },
  ]},
  { label: "Management", path: "/management" },
  { label: "Admin", icon: <UserCog />, path: "/admin" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold text-yellow-700 mb-8">ADMIN MARKET</h1>

        <nav className="space-y-2">
          {menu.map((item, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 text-yellow-800 hover:bg-yellow-100 p-2 rounded cursor-pointer transition">
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </div>

              {item.children && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 text-yellow-700 hover:bg-yellow-50 p-2 rounded cursor-pointer text-sm"
                    >
                      {child.icon && <span>{child.icon}</span>}
                      <span>{child.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex items-center justify-between px-2 mt-10">
        <Avatar>
          <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
        </Avatar>
        <Settings className="text-yellow-800 cursor-pointer" />
      </div>
    </aside>
  );
}
