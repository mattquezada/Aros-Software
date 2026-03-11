export type ProjectType = 'landing' | 'brochure' | 'ecommerce' | 'webapp' | 'custom';
export type Timeline = 'rush' | 'standard' | 'flexible';
export type Feature = 'cms' | 'auth' | 'api_integration' | 'seo' | 'animations' | 'multilingual';

export interface PricingInput {
  projectType: ProjectType;
  pages: number;
  features: Feature[];
  timeline: Timeline;
}

export interface PriceRange {
  low: number;
  high: number;
  label: string;
}

const BASE_PRICE: Record<ProjectType, [number, number]> = {
  landing:   [800,   1500],
  brochure:  [1500,  3000],
  ecommerce: [3000,  6000],
  webapp:    [5000,  12000],
  custom:    [8000,  20000],
};

const PER_PAGE_COST: [number, number] = [150, 300];

const FEATURE_COST: Record<Feature, [number, number]> = {
  cms:             [500,  1000],
  auth:            [800,  1500],
  api_integration: [600,  1200],
  seo:             [300,  600],
  animations:      [400,  800],
  multilingual:    [700,  1400],
};

const TIMELINE_MULTIPLIER: Record<Timeline, number> = {
  rush:     1.35,
  standard: 1.0,
  flexible: 0.90,
};

export function calculateEstimate(input: PricingInput): PriceRange {
  const [baseLow, baseHigh] = BASE_PRICE[input.projectType];

  const extraPages = Math.max(0, input.pages - 3);
  const extraLow  = extraPages * PER_PAGE_COST[0];
  const extraHigh = extraPages * PER_PAGE_COST[1];

  const featureLow  = input.features.reduce((s, f) => s + FEATURE_COST[f][0], 0);
  const featureHigh = input.features.reduce((s, f) => s + FEATURE_COST[f][1], 0);

  const multiplier = TIMELINE_MULTIPLIER[input.timeline];
  const low  = Math.round((baseLow  + extraLow  + featureLow)  * multiplier / 100) * 100;
  const high = Math.round((baseHigh + extraHigh + featureHigh) * multiplier / 100) * 100;

  return {
    low,
    high,
    label: `$${low.toLocaleString()} – $${high.toLocaleString()}`,
  };
}
