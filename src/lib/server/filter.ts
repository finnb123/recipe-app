import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity";

export const profane = async (input: string) => {
  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
  });
  const match = matcher.hasMatch(input);
  return match;
};
