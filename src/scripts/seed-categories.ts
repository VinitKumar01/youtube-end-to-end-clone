import { db } from "@/db";
import { categories } from "@/db/schema";

// TODO: Create a script to seed catagories
const categoryNames = [
  "Cars and vehical",
  "Comedy",
  "Education",
  "Gaming",
  "Entertainment",
  "Films and animations",
  "How-to and style",
  "Music",
  "News and politics",
  "People and blogs",
  "Pets and animals",
  "Science and technology",
  "Sports",
  "Travel and events",
];

async function main() {
  console.log("Seeding Categories...");
  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos related to ${name.toLowerCase()}`,
    }));

    await db.insert(categories).values(values);

    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error while seeding categories:", error);
    process.exit(1);
  }
}

main();
