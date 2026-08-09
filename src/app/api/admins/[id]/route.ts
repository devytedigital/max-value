import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, deleteDoc, getDocs, collection } from "firebase/firestore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docRef = doc(db, "admins", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    const data = docSnap.data();
    return NextResponse.json({
      id: docSnap.id,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
      createdAt: data.createdAt,
      lastLogin: data.lastLogin,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to read admin user: " + error.message },
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
    const docRef = doc(db, "admins", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    const body = await request.json();
    const { name, role, status, password } = body;

    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (name && name.trim()) updates.name = name.trim();
    if (role && role.trim()) updates.role = role.trim();
    if (status && status.trim()) updates.status = status.trim();
    if (password && password.trim()) {
      if (password.trim().length < 6) {
        return NextResponse.json(
          { error: "Password must be at least 6 characters long." },
          { status: 400 }
        );
      }
      updates.password = password.trim();
    }

    await updateDoc(docRef, updates);

    const updatedSnap = await getDoc(docRef);
    const data = updatedSnap.data()!;

    return NextResponse.json({
      id,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
      createdAt: data.createdAt,
      lastLogin: data.lastLogin,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update admin user: " + error.message },
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

    // Safety check: Count total admins
    const allAdminsSnap = await getDocs(collection(db, "admins"));
    if (allAdminsSnap.size <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the last remaining administrator account." },
        { status: 400 }
      );
    }

    const docRef = doc(db, "admins", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    await deleteDoc(docRef);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete admin user: " + error.message },
      { status: 500 }
    );
  }
}
