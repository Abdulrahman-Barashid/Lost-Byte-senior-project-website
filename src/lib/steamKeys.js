// All Firestore Steam key.
//   steamKeys/   → stores all keys. type="kau" or "paid"
//   claimedKeys/ → log of every claim. used to block duplicates.

import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";


// Find next unused key by type
async function getAvailableKey(type) {
  try {
    const q = query(
      collection(db, "steamKeys"),
      where("used", "==", false),
      where("type", "==", type)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const keyDoc = snapshot.docs[0];
    return { id: keyDoc.id, key: keyDoc.data().key };
  } catch (error) {
    console.error("getAvailableKey failed:", error);
    throw new Error("Could not fetch key from database.");
  }
}


// Mark a key as used in steamKeys
async function markKeyUsed(keyId, email) {
  try {
    await updateDoc(doc(db, "steamKeys", keyId), {
      used:      true,
      email:     email,
      claimedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("markKeyUsed failed:", error);
    throw new Error("Could not mark key as used.");
  }
}


// Write a claim record to claimedKeys
async function recordClaim(email, key, type) {
  try {
    await addDoc(collection(db, "claimedKeys"), {
      email,
      key,
      type,
      claimedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("recordClaim failed:", error);
    throw new Error("Could not record claim.");
  }
}


// Check if KAU email already claimed a free key
export async function checkKauEmailUsed(email) {
  try {
    const q = query(
      collection(db, "claimedKeys"),
      where("email", "==", email),
      where("type",  "==", "kau")
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error("checkKauEmailUsed failed:", error);
    throw new Error("Could not check email status.");
  }
}

// Give a KAU student their one free key
export async function giveKauKey(email) {
  try {
    const alreadyClaimed = await checkKauEmailUsed(email);
    if (alreadyClaimed) return { status: "already_claimed" };

    const keyDoc = await getAvailableKey("kau");
    if (!keyDoc) return { status: "no_keys" };

    await markKeyUsed(keyDoc.id, email);
    await recordClaim(email, keyDoc.key, "kau");

    return { status: "ok", key: keyDoc.key };
  } catch (error) {
    console.error("giveKauKey failed:", error);
    return { status: "error", message: error.message };
  }
}


// Give a PayPal buyer a key (one per payment)
export async function givePaypalKey(email) {
  try {
    // each verified payment gets one key
    const keyDoc = await getAvailableKey("paid");
    if (!keyDoc) return { status: "no_keys" };

    await markKeyUsed(keyDoc.id, email);
    await recordClaim(email, keyDoc.key, "paid");

    return { status: "ok", key: keyDoc.key };
  } catch (error) {
    console.error("givePaypalKey failed:", error);
    return { status: "error", message: error.message };
  }
}