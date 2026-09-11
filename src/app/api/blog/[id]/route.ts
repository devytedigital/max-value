import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

async function resolveId(params: Promise<{ id: string }> | { id: string }): Promise<string> {
  const resolved = typeof (params as any)?.then === "function" ? await params : params;
  return (resolved as { id: string }).id;
}

async function handleUpdate(id: string, body: any) {
  if (id === "gold-rate-settings") {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }
  
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }

  const updates = {
    ...body,
    updatedAt: new Date().toISOString()
  };

  // Remove undefined properties to prevent Firestore payload errors
  Object.keys(updates).forEach((key) => {
    if (updates[key] === undefined) {
      delete updates[key];
    }
  });

  await updateDoc(docRef, updates);

  return NextResponse.json({ id, ...docSnap.data(), ...updates });
}

async function handleDeleteDoc(id: string) {
  if (id === "gold-rate-settings") {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }
  const docRef = doc(db, "blogs", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }

  await deleteDoc(docRef);

  return NextResponse.json({
    success: true,
    message: `Blog post ${id} successfully deleted from Firestore.`
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const id = await resolveId(params);
    if (id === "gold-rate-settings") {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch blog post from Firestore: " + error.message },
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
      { error: "Failed to update Firestore blog document: " + error.message },
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
      { error: "Failed to delete Firestore blog document: " + error.message },
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
      { error: "Failed to process blog post request: " + error.message },
      { status: 500 }
    );
  }
}
