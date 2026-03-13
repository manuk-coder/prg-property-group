import { redirect } from "next/navigation";

export default function AdminPage() {
  // Redirect root admin to properties by default
  redirect("/admin/properties");
}
