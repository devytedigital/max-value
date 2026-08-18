import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const docRef = doc(db, "activities", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 });
    }

    // Prepare updates
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
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update Firestore activity document: " + error.message },
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
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete Firestore activity document: " + error.message },
      { status: 500 }
    );
  }
}
