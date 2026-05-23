/** Curated Unsplash images for salvage yard UI (hotlink via next/image) */

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80";

export const SIDEBAR_IMAGE =
  "https://images.unsplash.com/photo-1486262715619-67b85e44308a?w=400&q=80";

const DEFAULT_VEHICLE_IMAGE =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80";

/** make|model (lowercase) -> image matched to that vehicle */
const VEHICLE_IMAGES_BY_MAKE_MODEL: Record<string, string> = {
  "honda|accord":
    "https://www.wsupercars.com/wallpapers-regular/Honda/2016-Honda-Accord-Touring-Coupe-001-1080.jpg",
  "toyota|corolla": "https://wallpapercave.com/wp/wp1995359.jpg",
  "volkswagen|jetta":
    "https://www.wsupercars.com/wallpapers-regular/Volkswagen/2021-Volkswagen-Jetta-GLI-001-1080.jpg",
  "ford|f-150": "https://wallpapercave.com/wp/wp15449146.jpg",
  "ford|f150": "https://wallpapercave.com/wp/wp15449146.jpg",
  "tesla|model s":
    "https://www.wsupercars.com/wallpapers-regular/Tesla/2017-Tesla-Model-S-P90D-001-1080.jpg",
  "tesla|models":
    "https://www.wsupercars.com/wallpapers-regular/Tesla/2017-Tesla-Model-S-P90D-001-1080.jpg",
  "bmw|328i":
    "https://www.wsupercars.com/wallpapers-regular/BMW/2015-BMW-M4-Coupe-007-1080.jpg",
  "bmw|3 series":
    "https://www.wsupercars.com/wallpapers-regular/BMW/2015-BMW-M4-Coupe-007-1080.jpg",
};

/** Fallback when model is unknown but make is recognized */
const VEHICLE_IMAGES_BY_MAKE: Record<string, string> = {
  honda:
    "https://www.wsupercars.com/wallpapers-regular/Honda/2016-Honda-Accord-Touring-Coupe-001-1080.jpg",
  toyota: "https://wallpapercave.com/wp/wp1995359.jpg",
  volkswagen:
    "https://www.wsupercars.com/wallpapers-regular/Volkswagen/2021-Volkswagen-Jetta-GLI-001-1080.jpg",
  vw: "https://www.wsupercars.com/wallpapers-regular/Volkswagen/2021-Volkswagen-Jetta-GLI-001-1080.jpg",
  ford: "https://wallpapercave.com/wp/wp15449146.jpg",
  tesla:
    "https://www.wsupercars.com/wallpapers-regular/Tesla/2017-Tesla-Model-S-P90D-001-1080.jpg",
  bmw: "https://www.wsupercars.com/wallpapers-regular/BMW/2015-BMW-M4-Coupe-007-1080.jpg",
  chevrolet:
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
  chevy:
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
  dodge:
    "https://images.unsplash.com/photo-1619767886555-ef069f7ef961?w=800&q=80",
  nissan:
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db8?w=800&q=80",
  mazda:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  hyundai:
    "https://images.unsplash.com/photo-1583121274602-3e2820c50d88?w=800&q=80",
  kia: "https://images.unsplash.com/photo-1583121274602-3e2820c50d88?w=800&q=80",
};

/** SKU -> image for seed / known parts */
const PART_IMAGES_BY_SKU: Record<string, string> = {
  "ENG-HON-2018-001":
    "https://www.jdmorlandoinc.com/wp-content/uploads/2023/02/1746077124-1.jpg",
  "TRN-HON-2018-001":
    "https://global.honda/en/tech/CVT/images/main.webp",
  "BDY-HON-2018-001":
    "https://www.ndestore.com/cdn/shop/files/hyundaisantrogenuinebumperautopartswww.ndestore.comoriginalgenuineautosparepartsmadeinjapanonline.png?v=1773512732&width=713",
  "ENG-TOY-2016-001":
    "https://www.jdmorlandoinc.com/wp-content/uploads/2023/02/1746077124-1.jpg",
  "INT-TOY-2016-001":
    "https://thumbs.dreamstime.com/b/high-quality-studio-image-showcases-modern-car-s-dashboard-steering-wheel-assembly-against-clean-white-background-448528954.jpg?w=768",
  "ELC-VW-2015-001":
    "https://www.momentummotorworks.com/wp-content/uploads/2023/09/Mercedes-Alternator.jpg",
  "SUS-VW-2015-001":
    "https://m.media-amazon.com/images/I/7116edRKOUL._AC_SL1500_.jpg",
  "BDY-FRD-2019-001":
    "https://skl-sklc-tinymce-2021.s3.amazonaws.com/comp/2021/10/mceclip2_1633845961.jpg",
  "WHL-FRD-2019-001":
    "https://cdn.ecommercedns.uk/files/2/235752/6/39783546/mercedes-190-190e-w201-aez-atlanta-titan-17-inch-alloy-wheels.jpg",
};

/** Normalized part name -> image (for matching by display name) */
const PART_IMAGES_BY_NAME: Record<string, string> = {
  "2.4l engine assembly":
    "https://www.jdmorlandoinc.com/wp-content/uploads/2023/02/1746077124-1.jpg",
  "cvt transmission":
    "https://global.honda/en/tech/CVT/images/main.webp",
  "front bumper assembly":
    "https://www.ndestore.com/cdn/shop/files/hyundaisantrogenuinebumperautopartswww.ndestore.comoriginalgenuineautosparepartsmadeinjapanonline.png?v=1773512732&width=713",
  "1.8l engine block":
    "https://www.jdmorlandoinc.com/wp-content/uploads/2023/02/1746077124-1.jpg",
  "dashboard assembly":
    "https://thumbs.dreamstime.com/b/high-quality-studio-image-showcases-modern-car-s-dashboard-steering-wheel-assembly-against-clean-white-background-448528954.jpg?w=768",
  alternator:
    "https://www.momentummotorworks.com/wp-content/uploads/2023/09/Mercedes-Alternator.jpg",
  "front strut pair":
    "https://m.media-amazon.com/images/I/7116edRKOUL._AC_SL1500_.jpg",
  "tailgate assembly":
    "https://skl-sklc-tinymce-2021.s3.amazonaws.com/comp/2021/10/mceclip2_1633845961.jpg",
  '17" alloy wheel set (4)':
    "https://cdn.ecommercedns.uk/files/2/235752/6/39783546/mercedes-190-190e-w201-aez-atlanta-titan-17-inch-alloy-wheels.jpg",
  "17 alloy wheel set (4)":
    "https://cdn.ecommercedns.uk/files/2/235752/6/39783546/mercedes-190-190e-w201-aez-atlanta-titan-17-inch-alloy-wheels.jpg",
};

const PART_IMAGES_BY_CATEGORY: Record<string, string[]> = {
  Engine: [
    "https://images.unsplash.com/photo-1486262715619-67b85e44308a?w=800&q=80",
    "https://images.unsplash.com/photo-1625047509248-74905f97ce2c?w=800&q=80",
  ],
  Transmission: [
    "https://images.unsplash.com/photo-1619642751034-765dfad7ffb0?w=800&q=80",
  ],
  Body: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  ],
  Electrical: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  ],
  Interior: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  ],
  Suspension: [
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  ],
  Brakes: [
    "https://images.unsplash.com/photo-1489824904134-891ab245aafc?w=800&q=80",
  ],
  "Wheels & Tires": [
    "https://images.unsplash.com/photo-1486262715619-67b85e44308a?w=800&q=80",
  ],
  Glass: [
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db8?w=800&q=80",
  ],
  Other: [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
  ],
};

const DEFAULT_PART_IMAGES = [
  "https://images.unsplash.com/photo-1486262715619-67b85e44308a?w=800&q=80",
  "https://images.unsplash.com/photo-1625047509248-74905f97ce2c?w=800&q=80",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function normalizeMake(make: string): string {
  return make.toLowerCase().trim();
}

function normalizeModel(model: string): string {
  return model.toLowerCase().trim().replace(/\s+/g, " ");
}

function normalizePartName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/"/g, "")
    .replace(/\s+/g, " ");
}

export function getHeroImageUrl(): string {
  return HERO_IMAGE;
}

export function getSidebarImageUrl(): string {
  return SIDEBAR_IMAGE;
}

/**
 * Returns an image URL that matches the vehicle make/model when possible.
 */
export function getVehicleImageUrl(make: string, model: string): string {
  const makeKey = normalizeMake(make);
  const modelKey = normalizeModel(model);
  const exactKey = `${makeKey}|${modelKey}`;

  if (VEHICLE_IMAGES_BY_MAKE_MODEL[exactKey]) {
    return VEHICLE_IMAGES_BY_MAKE_MODEL[exactKey];
  }

  // Try without spaces/hyphens variants (e.g. "f150" vs "f-150")
  const compactModel = modelKey.replace(/[\s-]/g, "");
  const compactKey = `${makeKey}|${compactModel}`;
  if (VEHICLE_IMAGES_BY_MAKE_MODEL[compactKey]) {
    return VEHICLE_IMAGES_BY_MAKE_MODEL[compactKey];
  }

  if (VEHICLE_IMAGES_BY_MAKE[makeKey]) {
    return VEHICLE_IMAGES_BY_MAKE[makeKey];
  }

  return DEFAULT_VEHICLE_IMAGE;
}

/**
 * Returns an image URL matched by SKU or part name, then category fallback.
 */
export function getPartImageUrl(
  category: string,
  sku: string,
  name: string,
  partId: string
): string {
  const skuKey = sku.trim().toUpperCase();
  if (PART_IMAGES_BY_SKU[skuKey]) {
    return PART_IMAGES_BY_SKU[skuKey];
  }

  const nameKey = normalizePartName(name);
  if (PART_IMAGES_BY_NAME[nameKey]) {
    return PART_IMAGES_BY_NAME[nameKey];
  }

  const pool = PART_IMAGES_BY_CATEGORY[category] ?? DEFAULT_PART_IMAGES;
  const index = hashString(partId) % pool.length;
  return pool[index];
}
