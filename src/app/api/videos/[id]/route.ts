import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Helper to extract YouTube video ID
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = (typeof (params as any).then === "function" ? await params : params) as any;
    const { id } = resolvedParams;
    const docSnap = await getDoc(doc(db, "videos", id));

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
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
    const { title, videoUrl, category, date } = body;

    const docRef = doc(db, "videos", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (category !== undefined) updates.category = category;
    if (date !== undefined) updates.date = date;

    if (videoUrl !== undefined) {
      let finalVideoUrl = videoUrl;
      let thumbnail = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"; // fallback

      const ytId = getYouTubeId(videoUrl);
      if (ytId) {
        finalVideoUrl = `https://www.youtube.com/embed/${ytId}`;
        thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
      }
      updates.videoUrl = finalVideoUrl;
      updates.thumbnail = thumbnail;
    }

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
    const docRef = doc(db, "videos", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    await deleteDoc(docRef);

    return NextResponse.json({ success: true, message: "Video deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete Firestore document: " + error.message }, { status: 500 });
  }
}
