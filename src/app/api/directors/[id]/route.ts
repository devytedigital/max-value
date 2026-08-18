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
