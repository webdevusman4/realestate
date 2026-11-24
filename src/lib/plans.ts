/**
 * Floor-plan renders for Type A / B / C: the full plan plus one close-up per room.
 * Images live in public/plans/ and are cut by scripts/plan-crops.py.
 * Room names and sizes are the ones printed on the plan images. CONFIRM against the architect's drawings.
 */

export type PlanRoom = { id: string; name: string; size?: string };

export type PlanSet = {
  image: string;
  /** Pixel size of the full plan image (for the aspect ratio). */
  w: number;
  h: number;
  rooms: PlanRoom[];
};

export const PLANS: Record<"type-a" | "type-b" | "type-c", PlanSet> = {
  "type-a": {
    image: "/plans/type-a.jpg",
    w: 1560,
    h: 1116,
    rooms: [
      { id: "bed-1", name: "Bedroom 1", size: "11'-6\" × 13'-4\"" },
      { id: "bed-2", name: "Bedroom 2", size: "11'-6\" × 13'-4\"" },
      { id: "bed-3", name: "Bedroom 3", size: "11'-6\" × 13'-4\"" },
      { id: "living", name: "Kitchen, dining & lounge" },
      { id: "drawing", name: "Drawing room", size: "14' × 14'" },
      { id: "bath-1", name: "Bath 1", size: "8' × 5'" },
      { id: "bath-2", name: "Bath 2", size: "8' × 5'" },
      { id: "bath-3", name: "Bath 3", size: "8' × 5'" },
      { id: "bath-4", name: "Bath 4", size: "5'-6\" × 7'" },
      { id: "terrace", name: "Terrace" },
      { id: "balcony", name: "Balcony", size: "8' × 3'" },
    ],
  },
  "type-b": {
    image: "/plans/type-b.jpg",
    w: 1564,
    h: 1116,
    rooms: [
      { id: "bed-1", name: "Bedroom 1", size: "11'-6\" × 16'" },
      { id: "bed-2", name: "Bedroom 2", size: "11'-6\" × 16'" },
      { id: "living", name: "Kitchen, dining & lounge", size: "16'-5\" × 11'-6\"" },
      { id: "lounge", name: "Lounge" },
      { id: "drawing", name: "Drawing room", size: "12'-6\" × 14'" },
      { id: "bath-1", name: "Bath 1", size: "7' × 5'" },
      { id: "bath-2", name: "Bath 2", size: "7' × 5'" },
      { id: "bath-3", name: "Bath 3", size: "7' × 5'" },
      { id: "terrace", name: "Terrace", size: "8'-7\" × 4'-1\"" },
    ],
  },
  "type-c": {
    image: "/plans/type-c.jpg",
    w: 1580,
    h: 1116,
    rooms: [
      { id: "bed", name: "Bedroom", size: "11'-6\" × 16'" },
      { id: "living", name: "Kitchen, dining & TV lounge", size: "15' × 11'-6\"" },
      { id: "drawing", name: "Drawing room", size: "12'-4\" × 13'-6\"" },
      { id: "lounge", name: "Lounge" },
      { id: "bath-1", name: "Bath 1", size: "5' × 7'" },
      { id: "bath-2", name: "Bath 2", size: "7' × 7'" },
      { id: "terrace", name: "Terrace", size: "5' × 5'-6\"" },
    ],
  },
};

export type RoomKind = "bed" | "bath" | "drawing" | "living" | "lounge" | "terrace" | "balcony";

export const roomKind = (id: string): RoomKind =>
  id.startsWith("bed") ? "bed" : id.startsWith("bath") ? "bath" : (id as RoomKind);

/**
 * Stock photos shown for each kind of room (representative only, see public/renders and public/rooms CREDITS.md).
 * When several rooms of one kind exist (3 bedrooms, 4 baths) the photos are used in turn.
 */
export const ROOM_PHOTOS: Record<RoomKind, string[]> = {
  bed: ["/renders/bedroom.jpg", "/rooms/bedroom-2.jpg", "/rooms/bedroom-3.jpg"],
  bath: ["/renders/washroom.jpg", "/rooms/bath-2.jpg", "/rooms/bath-3.jpg", "/rooms/bath-4.jpg"],
  drawing: ["/renders/drawing.jpg"],
  living: ["/renders/kitchen.jpg", "/rooms/kitchen-2.jpg"],
  lounge: ["/renders/living.jpg", "/rooms/lounge-2.jpg"],
  terrace: ["/rooms/terrace.jpg"],
  balcony: ["/rooms/balcony.jpg"],
};
