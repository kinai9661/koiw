export const MODELS = [
  {
    id: 'zimage-uncensored',
    name: 'ZImage Uncensored',
    description: 'High quality uncensored image generation',
  },
  {
    id: 'flux-uncensored',
    name: 'Flux Uncensored',
    description: 'Fast and flexible image generation',
  },
  {
    id: 'qwen-uncensored',
    name: 'Qwen Uncensored',
    description: 'Advanced AI image generation',
  },
  {
    id: 'provider-2/imagen-4',
    name: 'Imagen 4',
    description: 'Google Imagen 4 model',
  },
  {
    id: 'provider-2/flux-2-pro',
    name: 'Flux 2 Pro',
    description: 'Professional grade Flux model',
  },
  {
    id: 'provider-2/flux-klein-4b',
    name: 'Flux Klein 4B',
    description: 'Compact 4B parameter model',
  },
  {
    id: 'provider-2/flux-klein-9b',
    name: 'Flux Klein 9B',
    description: 'Enhanced 9B parameter model',
  },
  {
    id: 'nanobanana-pro',
    name: 'Nanobanana Pro',
    description: 'Professional nanobanana model',
  },
  {
    id: 'nanobanana-2',
    name: 'Nanobanana 2',
    description: 'Second generation nanobanana',
  },
  {
    id: 'gpt-image-1.5',
    name: 'GPT Image 1.5',
    description: 'GPT-powered image generation',
  },
] as const;

export type ModelId = typeof MODELS[number]['id'];
