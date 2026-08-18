import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const docRef = doc(db, "leaders", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Leader profile not found" }, { status: 404 });
    }

    // Prepare updates
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
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update Firestore leader document: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete Firestore leader document: " + error.message },
      { status: 500 }
    );
  }
}
