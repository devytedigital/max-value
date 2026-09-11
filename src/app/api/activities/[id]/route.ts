import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

async function resolveId(params: Promise<{ id: string }> | { id: string }): Promise<string> {
  const resolved = typeof (params as any)?.then === "function" ? await params : params;
  return (resolved as { id: string }).id;
}

async function handleUpdate(id: string, body: any) {
  const docRef = doc(db, "activities", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return NextResponse.json({ error: "Activity not found" }, { status: 404 });
  }

  const {
    title,
    category,
    date,
    location,
    bannerImage,
    summary,
    content,
    organizer,
    participantsCount,
    tags,
    isFeatured
  } = body;

  const updates: any = {};

  if (title !== undefined) updates.title = title.trim();
  if (category !== undefined) updates.category = category.trim();
  if (date !== undefined) updates.date = date.trim();
  if (location !== undefined) updates.location = location.trim();
  if (bannerImage !== undefined) updates.bannerImage = bannerImage.trim();
  if (summary !== undefined) updates.summary = summary.trim();
  if (content !== undefined) updates.content = content.trim();
  if (organizer !== undefined) updates.organizer = organizer.trim();
  if (participantsCount !== undefined) updates.participantsCount = participantsCount.trim();
  
  if (tags !== undefined) {
    updates.tags = Array.isArray(tags) 
      ? tags.map((t: string) => t.trim()).filter(Boolean)
      : [];
  }
  
  if (isFeatured !== undefined) {
    updates.isFeatured = Boolean(isFeatured);
  }

  updates.updatedAt = new Date().toISOString();

  await updateDoc(docRef, updates);

  return NextResponse.json({ id, ...docSnap.data(), ...updates });
}

async function handleDeleteDoc(id: string) {
  const docRef = doc(db, "activities", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return NextResponse.json({ error: "Activity not found" }, { status: 404 });
  }

  await deleteDoc(docRef);

  return NextResponse.json({
    success: true,
    message: `Activity ${id} successfully deleted from Firestore.`
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const id = await resolveId(params);
    const docRef = doc(db, "activities", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch activity from Firestore: " + error.message },
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
      { error: "Failed to update Firestore activity document: " + error.message },
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
      { error: "Failed to delete Firestore activity document: " + error.message },
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
      { error: "Failed to process activity request: " + error.message },
      { status: 500 }
    );
  }
}
