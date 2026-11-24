#!/usr/bin/env python3
"""
Cuts the full-plan image and one close-up per room out of the three floor-plan renders.

Usage: python3 scripts/plan-crops.py <type-a.jpg> <type-b.jpg> <type-c.jpg>
Boxes are (left, top, right, bottom) in pixels of the 2000x1116 source renders. Re-run after replacing a render
(adjust the boxes if the layout moves). Output goes to public/plans/.
"""
import os
import sys
from PIL import Image

# Plan area of each render (drops the grey side bands, the "Type-X" label and the "Individual Plan" script).
PLAN_BOX = {"type-a": (112, 0, 1672, 1116), "type-b": (108, 0, 1672, 1116), "type-c": (92, 0, 1672, 1116)}

ROOMS = {
    "type-a": {
        "terrace": (1315, 140, 1580, 450),
        "bed-1": (868, 140, 1335, 445),
        "bath-1": (640, 140, 872, 360),
        "living": (380, 355, 870, 885),
        "bed-2": (858, 440, 1330, 745),
        "bath-2": (1318, 445, 1530, 655),
        "balcony": (1395, 650, 1570, 745),
        "bed-3": (1080, 740, 1530, 1070),
        "bath-3": (855, 815, 1090, 1070),
        "drawing": (175, 665, 565, 1040),
        "bath-4": (555, 855, 780, 1035),
    },
    "type-b": {
        "living": (450, 145, 925, 585),
        "bed-1": (915, 145, 1360, 450),
        "bath-1": (1350, 160, 1565, 440),
        "terrace": (1350, 415, 1605, 760),
        "lounge": (915, 450, 1450, 745),
        "bed-2": (910, 725, 1360, 1030),
        "bath-2": (1350, 750, 1565, 1030),
        "drawing": (228, 570, 645, 1030),
        "bath-3": (630, 750, 850, 1030),
    },
    "type-c": {
        "drawing": (250, 165, 630, 565),
        "bath-1": (620, 165, 835, 455),
        "lounge": (620, 448, 900, 580),
        "bed": (895, 160, 1350, 570),
        "bath-2": (1340, 170, 1555, 420),
        "terrace": (1335, 420, 1590, 630),
        "living": (440, 570, 905, 965),
    },
}

def main(a, b, c):
    out = os.path.join(os.path.dirname(__file__), "..", "public", "plans")
    for slug, src in (("type-a", a), ("type-b", b), ("type-c", c)):
        im = Image.open(src).convert("RGB")
        os.makedirs(os.path.join(out, slug), exist_ok=True)
        plan = im.crop(PLAN_BOX[slug])
        plan.save(os.path.join(out, f"{slug}.jpg"), quality=86, optimize=True)
        print(slug, "plan", plan.size)
        for rid, box in ROOMS[slug].items():
            crop = im.crop(box)
            crop.save(os.path.join(out, slug, f"{rid}.jpg"), quality=86, optimize=True)
            print("  ", rid, crop.size)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    main(*sys.argv[1:])
