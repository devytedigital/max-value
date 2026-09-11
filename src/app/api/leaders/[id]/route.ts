import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

async function resolveId(params: Promise<{ id: string }> | { id: string }): Promise<string> {
  const resolved = typeof (params as any)?.then === "function" ? await params : params;
  return (resolved as { id: string }).id;
}

async function handleUpdate(id: string, body: any) {
  const docRef = doc(db, "leaders", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return NextResponse.json({ error: "Leader profile not found" }, { status: 404 });
  }

  const { name, role, category, image, bio, highlights, order } = body;
  const updates: any = {};

  if (name !== undefined) updates.name = name.trim();
  if (role !== undefined) updates.role = role.trim();
  if (category !== undefined) updates.category = category.trim();
  if (image !== undefined) updates.image = image.trim();
  if (bio !== undefined) updates.bio = bio.trim();
  
  if (highlights !== undefined) {
    updates.highlights = Array.isArray(highlights) 
      ? highlights.map((h: string) => h.trim()).filter(Boolean)
      : [];
  }
  
  if (order !== undefined) {
    updates.order = typeof order === "number" ? order : 999;
  }

  updates.updatedAt = new Date().toISOString();

  await updateDoc(docRef, updates);

  return NextResponse.json({ id, ...docSnap.data(), ...updates });
}

async function handleDeleteDoc(id: string) {
  const docRef = doc(db, "leaders", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return NextResponse.json({ error: "Leader profile not found" }, { status: 404 });
  }

  await deleteDoc(docRef);

  return NextResponse.json({
    success: true,
    message: `Leader profile ${id} successfully deleted from Firestore.`
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const id = await resolveId(params);
    const docRef = doc(db, "leaders", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Leader profile not found" }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch leader from Firestore: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const id = await resolveId(params);
    const body = await request.json();
    return await handleUpdate(id, body);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update Firestore leader document: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const id = await resolveId(params);
    return await handleDeleteDoc(id);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete Firestore leader document: " + error.message },
      { status: 500 }
    );
  }
}

// POST handler to bypass LiteSpeed/proxy PUT/DELETE restrictions
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const id = await resolveId(params);
    const url = new URL(request.url);
    const methodOverride =
      url.searchParams.get("_method") ||
      request.headers.get("x-http-method-override");

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Body may be empty
    }

    if (
      methodOverride?.toUpperCase() === "DELETE" ||
      body?._method?.toUpperCase() === "DELETE" ||
      body?.action === "delete"
    ) {
      return await handleDeleteDoc(id);
    }

    return await handleUpdate(id, body);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to process leader request: " + error.message },
      { status: 500 }
    );
  }
}
