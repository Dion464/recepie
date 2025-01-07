import Image from 'next/image';

export default function CustomImage({ src, alt, width, height, className }) {
  return (
    <Image
      src={src}
      alt={alt || 'Recipe image'}
      width={width || 500}
      height={height || 300}
      className={className}
      onError={(e) => {
        e.target.src = "/default-recipe.png";
      }}
    />
  );
} 