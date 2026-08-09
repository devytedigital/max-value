import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Query admins collection in Firestore
    const querySnapshot = await getDocs(collection(db, "admins"));
    let authenticatedAdmin: any = null;
    let adminDocId = "";

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.email && data.email.toLowerCase() === normalizedEmail) {
        if (data.password === trimmedPassword) {
          authenticatedAdmin = data;
          adminDocId = docSnap.id;
        }
      }
    });

    if (authenticatedAdmin) {
      // Check active status
      if (authenticatedAdmin.status === "Inactive") {
        return NextResponse.json(
          { error: "Your admin account is currently inactive. Please contact Super Admin." },
          { status: 403 }
        );
      }

      // Update last login timestamp
      try {
        await updateDoc(doc(db, "admins", adminDocId), {
          lastLogin: new Date().toISOString(),
        });
      } catch (err) {
        // Ignore timestamp update error
      }

      return NextResponse.json({
        success: true,
        token: "mv_authenticated_token",
        user: {
          id: adminDocId,
          name: authenticatedAdmin.name || "Administrator",
          email: authenticatedAdmin.email,
          role: authenticatedAdmin.role || "Admin",
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid email or password. Please check your credentials." },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Authentication service error: " + error.message },
      { status: 500 }
    );
  }
}
