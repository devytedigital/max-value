import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

async function resolveId(params: Promise<{ id: string }> | { id: string }): Promise<string> {
  const resolved = typeof (params as any)?.then === "function" ? await params : params;
  return (resolved as { id: string }).id;
}

async function handleUpdate(id: string, body: any) {
  const docRef = doc(db, "directors", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return NextResponse.json({ error: "Director not found" }, { status: 404 });
  }

  const updates: any = {
    updatedAt: new Date().toISOString()
  };

  const fieldsToProcess = ["name", "role", "category", "image", "bio", "quote"];
  fieldsToProcess.forEach((field) => {
    if (body[field] !== undefined) {
      updates[field] = typeof body[field] === "string" ? body[field].trim() : body[field];
    }
  });

  if (body.highlights !== undefined) {
    updates.highlights = Array.isArray(body.highlights)
      ? body.highlights.map((h: any) => typeof h === "string" ? h.trim() : h).filter(Boolean)
      : [];
  }

  if (body.order !== undefined) {
    updates.order = typeof body.order === "number" ? body.order : Number(body.order) || 999;
  }

  await updateDoc(docRef, updates);

  return NextResponse.json({ id, ...docSnap.data(), ...updates });
}

async function handleDeleteDoc(id: string) {
  const docRef = doc(db, "directors", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return NextResponse.json({ error: "Director not found" }, { status: 404 });
  }

  await deleteDoc(docRef);

  return NextResponse.json({
    success: true,
    message: `Director ${id} successfully deleted from Firestore.`
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const id = await resolveId(params);
    const docRef = doc(db, "directors", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Director not found" }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch director from Firestore: " + error.message },
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
      { error: "Failed to update Firestore director document: " + error.message },
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
      { error: "Failed to delete Firestore director document: " + error.message },
      { status: 500 }
    );
  }
}

// POST handler to support servers/proxies (like LiteSpeed) that block PUT/DELETE requests
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
      { error: "Failed to process director request: " + error.message },
      { status: 500 }
    );
  }
}
