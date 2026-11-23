/** Pointer state shared between the DOM wrapper and the R3F scene. */
export type PodInput = {
  px: number; // -1..1 horizontal pointer position over the card
  py: number; // -1..1 vertical pointer position
  hover: boolean;
  dragging: boolean;
  dx: number; // accumulated horizontal drag (px) since last frame
  lastX: number;
};

export type PodSceneProps = {
  input: { current: PodInput };
  imageUrl: string | null;
  flavor: string;
  brand: string;
  model: string;
  puffs: number;
  visible: boolean;
  detail?: boolean;
};
