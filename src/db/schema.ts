import { relations } from "drizzle-orm";
import { serial, varchar, text, pgTable, integer } from "drizzle-orm/pg-core";


export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
});

export const policies = pgTable('policies', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  description: text('description'),
});


export const rolePolicies = pgTable('role_policies', {
  roleId: integer("roles.id").references(()=>roles.id), 
  policyId:  integer("policies.id").references(()=>policies.id),
});


export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  roleId: integer("roles.id").references(()=>roles.id),
});


export const rolePoliciesRelations = relations(rolePolicies, ({ one }) => ({
  role: one(roles, { fields: [rolePolicies.roleId], references: [roles.id] }),
  policy: one(policies, { fields: [rolePolicies.policyId], references: [policies.id] }),
}));


export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, { fields: [users.roleId], references: [roles.id] }),
}));
