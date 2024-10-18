import {
  doublePrecision,
  pgTableCreator,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `hono_${name}`);

