import { Hono } from "hono";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "./db/schema";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL!;
const app = new Hono();
const queryClient = postgres(DATABASE_URL);
const db = drizzle(queryClient, { schema: { ...schema } });

const checkPolicy = (policyName: string) => {
  return async (c: any, next: any) => {
    const userId = Number(c.req.headers["user-id"]);

    if (!userId) {
      return c.text("Unauthorized: Missing user-id header", 401);
    }

    try {
      const user = await db.query.users.findFirst({ });

      if (!user) {
        return c.text("Unauthorized: User not found", 403);
      }


      const rolePolicies = await db
        .query.rolePolicies.findMany();

      const userPolicies = rolePolicies.map(rp => );

     
      if (!userPolicies.includes(policyName)) {
        return c.text("Forbidden: You do not have permission to access this resource", 403);
      }

      await next();
    } catch (error) {
      console.error("Error during authorization:", error);
      return c.text("Internal Server Error", 500);
    }
  };
};

app.get("/admin", checkPolicy("edit_users"), (c) => {
  return c.text("Welcome to the admin panel!");
});

if (process.env.NODE_ENV === "development") {
  console.log(`Server is running at http://localhost:3000`);
}
