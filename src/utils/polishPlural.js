export const polishPlural = (
  singularNominativ,
  pluralNominativ,
  pluralGenitive,
  value
) => {
  if (value === 1) {
    return singularNominativ;
  } else if (
    value % 10 >= 2 &&
    value % 10 <= 4 &&
    (value % 100 < 10 || value % 100 >= 20)
  ) {
    return pluralNominativ;
  }
  return pluralGenitive;
};
