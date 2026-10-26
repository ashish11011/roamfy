import { getServerSession } from "next-auth";
import { authOptions } from "../src/lib/auth";
import { ADMIN_EMAILS } from "../src/const/admin";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!ADMIN_EMAILS.includes(session?.user?.email)) {
    throw new Error("Admin access required.");
  }
}
