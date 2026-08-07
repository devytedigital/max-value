import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = (typeof (params as any).then === "function" ? await params : params) as any;
    const { id } = resolvedParams;
    const docSnap = await getDoc(doc(db, "documents", id));

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read Firestore document: " + error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = (typeof (params as any).then === "function" ? await params : params) as any;
    const { id } = resolvedParams;
    const body = await request.json();
    const { name, href, type, size } = body;

    const docRef = doc(db, "documents", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (href !== undefined) updates.href = href;
    if (type !== undefined) updates.type = type;
    if (size !== undefined) updates.size = size;

    await updateDoc(docRef, updates);

    return NextResponse.json({ success: true, updates });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update Firestore document: " + error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = (typeof (params as any).then === "function" ? await params : params) as any;
    const { id } = resolvedParams;
    const docRef = doc(db, "documents", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    await deleteDoc(docRef);

    return NextResponse.json({ success: true, message: "Document deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete Firestore document: " + error.message }, { status: 500 });
  }
}
