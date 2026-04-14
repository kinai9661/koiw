'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = async (locale: string) => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLanguage('zh')}
        className="px-3 py-1 text-sm rounded hover:bg-gray-100"
      >
        中文
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className="px-3 py-1 text-sm rounded hover:bg-gray-100"
      >
        English
      </button>
    </div>
  );
}
