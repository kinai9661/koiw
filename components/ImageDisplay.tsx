'use client';

import Image from 'next/image';

interface ImageDisplayProps {
  imageUrl: string | null;
  alt?: string;
  loading?: boolean;
}

export default function ImageDisplay({
  imageUrl,
  alt = 'Generated image',
  loading = false,
}: ImageDisplayProps) {
  if (loading) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">生成中... / Generating...</p>
        </div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">暫無圖片 / No image yet</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-gray-100">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
