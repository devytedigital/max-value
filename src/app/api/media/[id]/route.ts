import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = doc(db, "media", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Media album not found" }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch media from Firestore: " + error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const docRef = doc(db, "media", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Media album not found" }, { status: 404 });
    }

    // Merge updates
    const updates = {
      ...body
    };

    // Remove undefined properties
    Object.keys(updates).forEach((key) => {
      if (updates[key] === undefined) {
        delete updates[key];
      }
    });

    await updateDoc(docRef, updates);

    return NextResponse.json({ id, ...docSnap.data(), ...updates });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update Firestore media document: " + error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = doc(db, "media", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Media album not found" }, { status: 404 });
    }

    await deleteDoc(docRef);

    return NextResponse.json({ success: true, message: `Media album ${id} successfully deleted from Firestore.` });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete Firestore media document: " + error.message }, { status: 500 });
  }
}
