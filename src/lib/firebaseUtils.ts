import { collection, doc, getDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';

// ----------------------------------------------------------------------------
// PROPERTIES (ListINGS) API
// ----------------------------------------------------------------------------

/**
 * Fetch all active properties from Firestore.
 */
export async function getAllProperties() {
  try {
    const propertiesRef = collection(db, 'properties');
    const q = query(propertiesRef, where("status", "==", "Active"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

/**
 * Fetch all properties regardless of status for the Admin Dashboard.
 */
export async function getAdminProperties() {
  try {
    const propertiesRef = collection(db, 'properties');
    const q = query(propertiesRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching admin properties:", error);
    return [];
  }
}

/**
 * Fetch a single property by its ID (slug).
 */
export async function getPropertyBySlug(slug: string) {
  try {
    const docRef = doc(db, 'properties', slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching property ${slug}:`, error);
    return null;
  }
}

// ----------------------------------------------------------------------------
// NEIGHBORHOODS API
// ----------------------------------------------------------------------------

/**
 * Fetch all featured neighborhoods for the Navigation Dropdown.
 */
export async function getFeaturedNeighborhoods() {
  try {
    const neighborhoodsRef = collection(db, 'neighborhoods');
    const q = query(neighborhoodsRef, where("isFeatured", "==", true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching featured neighborhoods:", error);
    return [];
  }
}

/**
 * Check if a neighborhood exists by slug to validate dynamic routing
 */
export async function getNeighborhoodBySlug(slug: string) {
  try {
    const docRef = doc(db, 'neighborhoods', slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching neighborhood ${slug}:`, error);
    return null;
  }
}
