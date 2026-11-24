/**
 * Clean vector redraws of the Type A / B / C floor plans from the client's brochure photos.
 * Coordinates are in drawing units (a rough scale of the brochure plan, which itself says "not to scale").
 * Room names and sizes are the ones printed on the brochure. CONFIRM against the architect's drawings.
 */

export type RoomKind = "bed" | "bath" | "living" | "drawing" | "terrace" | "balcony";

export type Room = {
  id: string;
  name: string;
  size?: string;
  kind: RoomKind;
  /** x, y, width, height */
  r: [number, number, number, number];
  /** Where the label sits (defaults to the room centre). */
  label?: [number, number];
  /** Skip the on-plan label (tiny rooms). */
  hideLabel?: boolean;
  /** Label split over several lines on the plan (the room name stays whole elsewhere). */
  lines?: string[];
};

export type Item =
  | { t: "bed"; x: number; y: number; w: number; h: number; head: "N" | "S" | "E" | "W" }
  | { t: "sofa"; x: number; y: number; w: number; h: number; back: "N" | "S" | "E" | "W" }
  | { t: "table"; x: number; y: number; w: number; h: number; chairs: number }
  | { t: "rug"; x: number; y: number; w: number; h: number }
  | { t: "tub"; x: number; y: number; w: number; h: number }
  | { t: "wc"; x: number; y: number; dir: "N" | "S" | "E" | "W" }
  | { t: "counter"; x: number; y: number; w: number; h: number }
  | { t: "wardrobe"; x: number; y: number; w: number; h: number };

export type Plan = {
  slug: "type-a" | "type-b" | "type-c";
  /** viewBox: x, y, width, height */
  view: [number, number, number, number];
  rooms: Room[];
  items: Item[];
  /** Overall dimensions printed around the plan. */
  dims: { text: string; x: number; y: number; rot?: number }[];
  entrance?: { x: number; y: number; text?: string };
};

export const PLANS: Plan[] = [
  /* ------------------------------------------------ Type A: 3 bedrooms ------------------------------------------------ */
  {
    slug: "type-a",
    view: [40, 280, 480, 600],
    rooms: [
      { id: "terrace", name: "Terrace", kind: "terrace", r: [82, 315, 140, 90] },
      { id: "bath-1", name: "Bath", size: "8' × 7'", kind: "bath", r: [228, 335, 86, 70] },
      { id: "balcony", name: "Balcony", kind: "balcony", r: [318, 315, 32, 80], hideLabel: true },
      { id: "bed-1", name: "Bedroom 1", size: "11'-6\" × 17'-6\"", kind: "bed", r: [82, 407, 140, 178], label: [152, 570] },
      { id: "bed-2", name: "Bedroom 2", size: "11'-6\" × 17'-6\"", kind: "bed", r: [226, 407, 124, 178], label: [288, 570] },
      { id: "bed-3", name: "Bedroom 3", size: "11'-6\" × 17'-6\"", kind: "bed", r: [352, 335, 124, 250], label: [414, 352] },
      { id: "bath-3", name: "Bath", size: "8' × 7'", kind: "bath", r: [390, 508, 86, 77] },
      { id: "bath-2", name: "Bath", size: "8' × 7'", kind: "bath", r: [82, 590, 104, 80] },
      { id: "living", name: "Kitchen, dining & lounge", kind: "living", r: [186, 590, 214, 180], label: [262, 714], lines: ["Kitchen, dining", "& lounge"] },
      { id: "drawing", name: "Drawing room", size: "14' × 14'", kind: "drawing", r: [320, 705, 156, 150], label: [398, 726] },
      { id: "bath-4", name: "Bath", size: "6'-6\" × 7'", kind: "bath", r: [404, 625, 72, 78] },
    ],
    items: [
      { t: "bed", x: 104, y: 470, w: 76, h: 86, head: "W" },
      { t: "sofa", x: 196, y: 478, w: 22, h: 60, back: "E" },
      { t: "wardrobe", x: 96, y: 575, w: 40, h: 10 },
      { t: "bed", x: 240, y: 462, w: 76, h: 86, head: "W" },
      { t: "sofa", x: 322, y: 458, w: 22, h: 60, back: "E" },
      { t: "wardrobe", x: 250, y: 575, w: 60, h: 10 },
      { t: "bed", x: 372, y: 392, w: 76, h: 86, head: "E" },
      { t: "sofa", x: 356, y: 380, w: 20, h: 54, back: "W" },
      { t: "tub", x: 394, y: 512, w: 56, h: 24 },
      { t: "wc", x: 462, y: 560, dir: "W" },
      { t: "tub", x: 232, y: 340, w: 60, h: 24 },
      { t: "wc", x: 300, y: 385, dir: "N" },
      { t: "tub", x: 88, y: 636, w: 54, h: 24 },
      { t: "wc", x: 172, y: 610, dir: "E" },
      { t: "wc", x: 440, y: 650, dir: "N" },
      { t: "table", x: 214, y: 610, w: 76, h: 74, chairs: 8 },
      { t: "counter", x: 186, y: 700, w: 22, h: 70 },
      { t: "counter", x: 186, y: 748, w: 80, h: 22 },
      { t: "sofa", x: 330, y: 622, w: 54, h: 20, back: "N" },
      { t: "rug", x: 362, y: 752, w: 66, h: 66 },
      { t: "sofa", x: 326, y: 722, w: 22, h: 100, back: "W" },
      { t: "sofa", x: 444, y: 736, w: 22, h: 90, back: "E" },
      { t: "sofa", x: 352, y: 826, w: 82, h: 22, back: "S" },
      { t: "sofa", x: 100, y: 345, w: 22, h: 52, back: "W" },
      { t: "sofa", x: 160, y: 345, w: 22, h: 52, back: "E" },
    ],
    dims: [
      { text: "17'-6\"", x: 152, y: 300 },
      { text: "8'-0\"", x: 270, y: 300 },
      { text: "8'-11\"", x: 334, y: 300 },
      { text: "15'-11\"", x: 420, y: 316 },
      { text: "24'-3\"", x: 494, y: 460, rot: 90 },
      { text: "27'-9\"", x: 66, y: 480, rot: -90 },
      { text: "22'-3\"", x: 494, y: 780, rot: 90 },
      { text: "22'-11\"", x: 292, y: 790 },
      { text: "17'-10\"", x: 400, y: 872 },
      { text: "8'-9\"", x: 138, y: 686 },
    ],
    entrance: { x: 226, y: 772 },
  },

  /* ------------------------------------------------ Type B: 2 bedrooms ------------------------------------------------ */
  {
    slug: "type-b",
    view: [60, 280, 460, 670],
    rooms: [
      { id: "bath-1", name: "Bath", size: "7' × 7'", kind: "bath", r: [105, 335, 117, 85] },
      { id: "terrace", name: "Terrace", size: "8'-7\" × 4'-1\"", kind: "terrace", r: [226, 322, 138, 98] },
      { id: "bath-2", name: "Bath", size: "7' × 7'", kind: "bath", r: [368, 335, 117, 85] },
      { id: "bed-1", name: "Bedroom 1", size: "11'-6\" × 16'", kind: "bed", r: [95, 420, 130, 190], label: [160, 592] },
      { id: "hall", name: "Lounge", kind: "living", r: [225, 420, 125, 190], label: [288, 592] },
      { id: "bed-2", name: "Bedroom 2", size: "11'-6\" × 16'", kind: "bed", r: [350, 420, 135, 190], label: [418, 592] },
      { id: "living", name: "Kitchen, dining & lounge", size: "16'-9\" × 11'-6\"", kind: "living", r: [90, 610, 262, 198], label: [250, 758] },
      { id: "bath-3", name: "Bath", size: "7' × 7'", kind: "bath", r: [362, 652, 120, 84] },
      { id: "drawing", name: "Drawing room", size: "12'-6\" × 14'", kind: "drawing", r: [280, 738, 202, 172], label: [380, 898] },
    ],
    items: [
      { t: "tub", x: 110, y: 340, w: 70, h: 24 },
      { t: "wc", x: 128, y: 394, dir: "N" },
      { t: "tub", x: 372, y: 340, w: 70, h: 24 },
      { t: "wc", x: 390, y: 394, dir: "N" },
      { t: "bed", x: 112, y: 466, w: 90, h: 78, head: "W" },
      { t: "bed", x: 378, y: 466, w: 90, h: 78, head: "E" },
      { t: "sofa", x: 250, y: 478, w: 44, h: 22, back: "N" },
      { t: "sofa", x: 304, y: 478, w: 44, h: 22, back: "N" },
      { t: "sofa", x: 250, y: 534, w: 44, h: 22, back: "S" },
      { t: "sofa", x: 304, y: 534, w: 44, h: 22, back: "S" },
      { t: "table", x: 120, y: 640, w: 78, h: 76, chairs: 8 },
      { t: "counter", x: 90, y: 770, w: 90, h: 24 },
      { t: "counter", x: 90, y: 740, w: 24, h: 54 },
      { t: "counter", x: 312, y: 650, w: 40, h: 86 },
      { t: "tub", x: 366, y: 658, w: 74, h: 26 },
      { t: "wc", x: 456, y: 716, dir: "W" },
      { t: "rug", x: 346, y: 770, w: 70, h: 70 },
      { t: "sofa", x: 292, y: 760, w: 22, h: 100, back: "W" },
      { t: "sofa", x: 450, y: 760, w: 24, h: 100, back: "E" },
      { t: "sofa", x: 330, y: 870, w: 100, h: 22, back: "S" },
    ],
    dims: [
      { text: "7'-5\"", x: 160, y: 306 },
      { text: "9'-5\"", x: 296, y: 306 },
      { text: "7'-5\"", x: 428, y: 306 },
      { text: "41'-1\"", x: 76, y: 620, rot: -90 },
      { text: "24'-3\"", x: 502, y: 520, rot: 90 },
      { text: "2'-7\"", x: 502, y: 626, rot: 90 },
      { text: "22'-3\"", x: 502, y: 810, rot: 90 },
      { text: "11'-11\"", x: 186, y: 830 },
      { text: "12'-4\"", x: 380, y: 934 },
    ],
    entrance: { x: 250, y: 812 },
  },

  /* ------------------------------------------------ Type C: 1 bedroom ------------------------------------------------ */
  {
    slug: "type-c",
    view: [40, 285, 480, 650],
    rooms: [
      { id: "bath-1", name: "Bath", size: "7' × 7'", kind: "bath", r: [75, 325, 125, 85] },
      { id: "terrace", name: "Terrace", size: "5'-6\" × 4'-1\"", kind: "terrace", r: [204, 315, 92, 95] },
      { id: "bed", name: "Bedroom", size: "11'-6\" × 16'", kind: "bed", r: [80, 410, 185, 175], label: [172, 570] },
      { id: "wr", name: "Wardrobe", kind: "bed", r: [80, 588, 135, 22], hideLabel: true },
      { id: "bath-2", name: "Bath", size: "7' × 7'", kind: "bath", r: [75, 650, 135, 90] },
      { id: "drawing", name: "Drawing room", size: "12'-4\" × 14'", kind: "drawing", r: [65, 740, 200, 165], label: [165, 762] },
      { id: "living", name: "Kitchen, dining & TV lounge", size: "15' × 11'-6\"", kind: "living", r: [266, 615, 186, 212], label: [340, 744] },
      { id: "hall", name: "Lounge", kind: "living", r: [210, 610, 56, 130] },
    ],
    items: [
      { t: "tub", x: 80, y: 330, w: 28, h: 74 },
      { t: "wc", x: 130, y: 345, dir: "S" },
      { t: "sofa", x: 232, y: 380, w: 50, h: 26, back: "S" },
      { t: "bed", x: 112, y: 440, w: 92, h: 100, head: "N" },
      { t: "sofa", x: 226, y: 450, w: 34, h: 90, back: "E" },
      { t: "wardrobe", x: 82, y: 590, w: 130, h: 18 },
      { t: "tub", x: 86, y: 696, w: 118, h: 36 },
      { t: "wc", x: 136, y: 668, dir: "N" },
      { t: "sofa", x: 214, y: 650, w: 30, h: 70, back: "E" },
      { t: "rug", x: 112, y: 792, w: 82, h: 68 },
      { t: "sofa", x: 74, y: 760, w: 24, h: 120, back: "W" },
      { t: "sofa", x: 236, y: 760, w: 24, h: 120, back: "E" },
      { t: "sofa", x: 112, y: 866, w: 82, h: 22, back: "S" },
      { t: "table", x: 290, y: 624, w: 130, h: 76, chairs: 10 },
      { t: "counter", x: 350, y: 770, w: 100, h: 24 },
      { t: "counter", x: 426, y: 740, w: 24, h: 80 },
    ],
    dims: [
      { text: "7'-5\"", x: 140, y: 300 },
      { text: "6'-4\"", x: 252, y: 300 },
      { text: "5'-10\"", x: 326, y: 372, rot: 90 },
      { text: "24'-3\"", x: 56, y: 500, rot: -90 },
      { text: "19'-5\"", x: 290, y: 600, rot: 0 },
      { text: "8'-5\"", x: 146, y: 625 },
      { text: "24'-3\"", x: 56, y: 820, rot: -90 },
      { text: "17'-3\"", x: 472, y: 720, rot: 90 },
      { text: "11'-11\"", x: 360, y: 600 },
      { text: "11'-11\"", x: 360, y: 850 },
      { text: "12'-4\"", x: 165, y: 926 },
    ],
    entrance: { x: 290, y: 832 },
  },
];

export const planFor = (slug: string) => PLANS.find((p) => p.slug === slug)!;
