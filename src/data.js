export const landmarks = Array.from({ length: 256 }, (_, i) => ({
  id: i + 1,
  name: `Landmark ${i + 1}`,
  description: `This is a placeholder for Landmark ${i + 1}.`,
  image: `${import.meta.env.BASE_URL}tiles/tile_${i + 1}.png`,
  link: "https://example.com", // Replace with real link later
}));
