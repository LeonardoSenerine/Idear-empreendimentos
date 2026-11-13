/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 90 nas fotos grandes da casa; 75 é o padrão do Next para o resto
    qualities: [75, 90],
  },
};

export default nextConfig;
