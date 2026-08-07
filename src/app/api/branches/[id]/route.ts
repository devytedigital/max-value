import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "data", "branches-db.json");

// Helper function to read database
async function getDatabase() {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
}

// Helper function to save database
async function saveDatabase(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const branches = await getDatabase();
    const branch = branches.find((b: any) => b.id === id);

    if (!branch) {
      return NextResponse.json({ error: "Branch not found" }, { status: 404 });
    }

    return NextResponse.json(branch);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch branch: " + error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const branches = await getDatabase();
    
    const index = branches.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Branch not found" }, { status: 404 });
    }

    // Merge updates
    const updatedBranch = {
      ...branches[index],
      ...body,
      id, // Keep the same ID
      name: body.name ? body.name.toUpperCase() : branches[index].name
    };

    branches[index] = updatedBranch;
    await saveDatabase(branches);

    return NextResponse.json(updatedBranch);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update branch: " + error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const branches = await getDatabase();
    
    const index = branches.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Branch not found" }, { status: 404 });
    }

    branches.splice(index, 1);
    await saveDatabase(branches);

    return NextResponse.json({ success: true, message: `Branch ${id} successfully deleted.` });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete branch: " + error.message }, { status: 500 });
  }
}
