'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ModelSelector from '@/components/ModelSelector';
import PromptInput from '@/components/PromptInput';
import ImageDisplay from '@/components/ImageDisplay';

export default function HomePage() {
  const t = useTranslations();
  const [model, setModel] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!model || !prompt) {
      setError('請選擇模型並輸入提示詞 / Please select a model and enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed');
      }

      setImageUrl(data.data.image_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('home.title')}
        </h1>
        <p className="text-xl text-gray-600">
          {t('home.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {t('generate.title')}
            </h2>

            <div className="space-y-4">
              <ModelSelector
                value={model}
                onChange={setModel}
                label={t('generate.model')}
              />

              <PromptInput
                value={prompt}
                onChange={setPrompt}
                label={t('generate.prompt')}
                placeholder={t('generate.promptPlaceholder')}
              />

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading || !model || !prompt}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? t('generate.generating') : t('generate.generate')}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              {t('home.features.title')}
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>✓ {t('home.features.multiModel')} - {t('home.features.multiModelDesc')}</li>
              <li>✓ {t('home.features.fast')} - {t('home.features.fastDesc')}</li>
              <li>✓ {t('home.features.highQuality')} - {t('home.features.highQualityDesc')}</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {t('generate.generatedImage')}
            </h2>
            <ImageDisplay imageUrl={imageUrl} loading={loading} />
            {imageUrl && !loading && (
              <button
                onClick={handleDownload}
                className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                {t('generate.download')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
