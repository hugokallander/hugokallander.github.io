/// <reference types="vite/client" />

declare module '*&format=webp' {
  const value: string;
  export default value;
}

declare module '*&quality=100' {
  const value: string;
  export default value;
}

declare module '*?w=800&format=webp' {
  const value: string;
  export default value;
}

declare module '*?as=srcset' {
  const value: string;
  export default value;
}

declare module '*&as=metadata' {
  const value: { src: string; width: number; height: number; format: string }[];
  export default value;
}

declare module '*?w=1600&format=webp&quality=100' {
  const value: string;
  export default value;
}

