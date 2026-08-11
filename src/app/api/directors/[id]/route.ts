import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const docRef = doc(db, "directors", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Director not found" }, { status: 404 });
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
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update Firestore director document: " + error.message },
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
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete Firestore director document: " + error.message },
      { status: 500 }
    );
  }
}
