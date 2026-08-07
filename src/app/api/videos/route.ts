import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

// Helper to extract YouTube video ID
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function GET(request: Request) {
  try {
    const querySnapshot = await getDocs(collection(db, "videos"));
    const videosList: any[] = [];
    querySnapshot.forEach((doc) => {
      videosList.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json(videosList);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to read Firestore videos collection: " + error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, videoUrl, category = "Corporate Video", date } = body;

    // Validation
    if (!title || !videoUrl) {
      return NextResponse.json(
        { error: "Missing required fields. Required: title, videoUrl." },
        { status: 400 }
      );
    }

    // Process YouTube Url
    let finalVideoUrl = videoUrl;
    let thumbnail = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"; // fallback

    const ytId = getYouTubeId(videoUrl);
    if (ytId) {
      finalVideoUrl = `https://www.youtube.com/embed/${ytId}`;
      thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
    }

    // Retrieve existing IDs to perform slug de-duplication
    const querySnapshot = await getDocs(collection(db, "videos"));
    const existingIds: string[] = [];
    querySnapshot.forEach((doc) => {
      existingIds.push(doc.id);
    });

    // Create unique ID / slug
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    slug = slug.replace(/^-+|-+$/g, "");
    if (!slug) slug = "video";
    
    let id = slug;
    let counter = 1;
    const baseId = id;
    while (existingIds.includes(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }

    // Generate readable date if not provided
    const formattedDate = date || new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const newVideo = {
      id,
      title,
      category,
      videoUrl: finalVideoUrl,
      thumbnail,
      date: formattedDate
    };

    // Save to Firestore
    await setDoc(doc(db, "videos", id), newVideo);

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to save Firestore document: " + error.message }, { status: 500 });
  }
}
