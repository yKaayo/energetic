export const FLAVOR_IDS = [1, 2, 3, 4, 5] as const;

export type FlavorId = (typeof FLAVOR_IDS)[number];
export type FlavorKey = `texture${FlavorId}`;

export type FlavorConfig = {
  key: FlavorKey;
  id: FlavorId;
  label: string;
  texture: string;
  bg: string;
  accent: string;
};

export const FLAVORS: FlavorConfig[] = [
  {
    key: "texture1",
    id: 1,
    label: "Comida de Vó",
    texture: "/textures/texture1.png",
    bg: "#e4d763",
    accent: "#61400f",
  },
  {
    key: "texture2",
    id: 2,
    label: "Arco-Íris",
    texture: "/textures/texture2.png",
    bg: "#b56dd1",
    accent: "#280341",
  },
  {
    key: "texture3",
    id: 3,
    label: "Madrugada",
    texture: "/textures/texture3.png",
    bg: "#1e1ca1",
    accent: "#180a4b",
  },
  {
    key: "texture4",
    id: 4,
    label: "Nostalgia",
    texture: "/textures/texture4.png",
    bg: "#df8613",
    accent: "#be4c00",
  },
  {
    key: "texture5",
    id: 5,
    label: "Amor Recíproco",
    texture: "/textures/texture5.png",
    bg: "#f162c2",
    accent: "#7d118b",
  },
];

export const FLAVOR_TEXTURES = Object.fromEntries(
  FLAVORS.map((f) => [f.key, f.texture]),
) as Record<FlavorKey, string>;

export const getFlavorConfig = (key: FlavorKey) =>
  FLAVORS.find((f) => f.key === key)!;
