import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { ProductUploadForm } from "@/components/admin/product-upload-form";
import { AdminShell } from "@/components/dashboard/admin-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { orders, products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const metrics = [
  { icon: DollarSign, label: "Revenue", value: "$42,800" },
  { icon: ShoppingCart, label: "Orders", value: "1,846" },
  { icon: Users, label: "Users", value: "9,420" },
  { icon: Package, label: "Products", value: String(products.length) }
];
const chart = [42, 56, 34, 78, 64, 92, 81, 105, 98, 128, 116, 142];

export default function AdminPage() {
  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-4xl font-black">Admin dashboard</h1>
        <p className="mt-2 text-muted-foreground">Upload products, manage users/orders/categories/coupons, and track revenue.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="p-5">
            <Icon className="h-6 w-6 text-purple-300" />
            <p className="mt-4 text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-black">{value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-6">
        <h2 className="text-2xl font-bold">Revenue graph</h2>
        <div className="mt-6 flex h-56 items-end gap-2">
          {chart.map((value, index) => <div key={index} className="flex-1 rounded-t-xl bg-gradient-to-t from-purple-600 to-fuchsia-400" style={{ height: `${value}px` }} />)}
        </div>
      </Card>

      <section id="products" className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-2xl font-bold">Upload product</h2>
          <ProductUploadForm />
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-bold">Products</h2>
          <div className="mt-5 grid gap-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
                <span>{product.title}</span>
                <span>{formatCurrency(product.price)}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section id="orders" className="mt-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold">Orders & users</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-muted-foreground">
                <tr><th className="p-3">Order</th><th>Product</th><th>Status</th><th>Total</th></tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-white/10">
                    <td className="p-3 font-mono">{order.id}</td><td>{order.productTitle}</td><td>{order.status}</td><td>{formatCurrency(order.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section id="coupons" className="mt-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold">Discount coupon system</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Input placeholder="Code: LAUNCH30" />
            <Input placeholder="30" />
            <Button>Create coupon</Button>
          </div>
        </Card>
      </section>
    </AdminShell>
  );
}
