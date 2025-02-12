// src/custom.d.ts
declare module "*.jpg" {
  const value: string;
  export default value;
}

// Optionally, add declarations for other image types if needed:
declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}
