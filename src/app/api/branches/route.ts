import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { branchDatabase } from "@/data/branchData";

const dbPath = path.join(process.cwd(), "src", "data", "branches-db.json");

// Helper function to get or initialize database
async function getDatabase() {
  try {
    await fs.access(dbPath);
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If database doesn't exist, initialize with default records
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify(branchDatabase, null, 2), "utf-8");
    return branchDatabase;
  }
}

// Helper to save database
async function saveDatabase(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state");
    const district = searchParams.get("district");
    const query = searchParams.get("q");

    let branches = await getDatabase();

    if (state) {
      branches = branches.filter((b: any) => b.state.toLowerCase() === state.toLowerCase());
    }

    if (district) {
      branches = branches.filter((b: any) => b.district.toLowerCase() === district.toLowerCase());
    }

    if (query) {
      const q = query.toLowerCase();
      branches = branches.filter(
        (b: any) =>
          b.name.toLowerCase().includes(q) ||
          b.address.toLowerCase().includes(q) ||
          b.landmark.toLowerCase().includes(q) ||
          b.district.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(branches);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read database: " + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      state,
      district,
      address,
      landmark = "",
      pinCode,
      phone = "",
      mobile,
      email = "",
      location = "",
      workingHours = "9:30 AM - 5:30 PM (Mon-Sat)"
    } = body;

    // Validation
    if (!name || !state || !district || !address || !pinCode || !mobile) {
      return NextResponse.json(
        { error: "Missing required fields. Required: name, state, district, address, pinCode, mobile." },
        { status: 400 }
      );
    }

    const branches = await getDatabase();

    // Create unique ID / slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    let id = `${slug}-${district.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    
    // De-duplicate ID just in case
    let counter = 1;
    const baseId = id;
    while (branches.some((b: any) => b.id === id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }

    const newBranch = {
      id,
      name: name.toUpperCase(),
      state,
      district,
      address,
      landmark,
      pinCode,
      phone,
      mobile,
      email,
      location,
      workingHours
    };

    branches.push(newBranch);
    await saveDatabase(branches);

    return NextResponse.json(newBranch, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to create branch: " + error.message }, { status: 500 });
  }
}
