export function getLabelById<
  T extends Record<string, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any  
  >,
  IDKey extends keyof T,
  LangKey extends keyof T
>(
  array: T[],
  id: T[IDKey],
  idKey: IDKey,
  langKey: LangKey
): T[LangKey] | null {
  const found = array.find((item) => item[idKey] === id);
  return found ? found[langKey] : null;
}

export const conditions = [
  { condition_id: 1, cs: "Nové", en: "New" },
  { condition_id: 2, cs: "Ojeté", en: "Used" },
  { condition_id: 3, cs: "Havarované", en: "Damaged" },
  { condition_id: 4, cs: "Předváděcí", en: "Demo" },
  { condition_id: 5, cs: "Veterán", en: "Classic car" },
];

export const fuelList = [
  { fuel_id: 1, cs: "Benzín", en: "Petrol" },
  { fuel_id: 2, cs: "Nafta", en: "Diesel" },
  { fuel_id: 3, cs: "LPG + benzín", en: "LPG + petrol" },
  { fuel_id: 4, cs: "Elektro", en: "Electric" },
  { fuel_id: 5, cs: "Hybridní", en: "Hybrid" },
  { fuel_id: 6, cs: "CNG + benzín", en: "CNG + petrol" },
  { fuel_id: 7, cs: "Ethanol", en: "Ethanol" },
  { fuel_id: 8, cs: "Jiné", en: "Other" },
  { fuel_id: 9, cs: "Vodík", en: "Hydrogen" },
];

export const colorList = [
  { color_id: 1, cs: "Bílá", en: "White" },
  { color_id: 2, cs: "Žlutá", en: "Yellow" },
  { color_id: 3, cs: "Oranžová", en: "Orange" },
  { color_id: 4, cs: "Červená", en: "Red" },
  { color_id: 5, cs: "Vínová", en: "Burgundy" },
  { color_id: 6, cs: "Růžová", en: "Pink" },
  { color_id: 7, cs: "Fialová", en: "Purple" },
  { color_id: 8, cs: "Modrá", en: "Blue" },
  { color_id: 9, cs: "Zelená", en: "Green" },
  { color_id: 10, cs: "Hnědá", en: "Brown" },
  { color_id: 11, cs: "Šedá", en: "Gray" },
  { color_id: 12, cs: "Černá", en: "Black" },
  { color_id: 13, cs: "Béžová", en: "Beige" },
  { color_id: 14, cs: "Stříbrná", en: "Silver" },
  { color_id: 15, cs: "Zlatá", en: "Gold" },
  { color_id: 16, cs: "Jiná", en: "Other" },
  { color_id: 17, cs: "Bronzová", en: "Bronze" },
];

export const airbagList = [
  { airbag_id: 1, cs: "1", en: "1" },
  { airbag_id: 2, cs: "2", en: "2" },
  { airbag_id: 3, cs: "4", en: "4" },
  { airbag_id: 4, cs: "6", en: "6" },
  { airbag_id: 5, cs: "7", en: "7" },
  { airbag_id: 6, cs: "8", en: "8" },
  { airbag_id: 7, cs: "9", en: "9" },
  { airbag_id: 8, cs: "10", en: "10" },
  { airbag_id: 9, cs: "12", en: "12" },
  { airbag_id: 10, cs: "14", en: "14" },
];

export const airconditionList = [
  { aircondition_id: 1, cs: "Bez klimatizace", en: "No air conditioning" },
  { aircondition_id: 2, cs: "Manuální", en: "Manual" },
  { aircondition_id: 3, cs: "Automatická", en: "Automatic" },
  { aircondition_id: 4, cs: "Dvouzónová automatická", en: "Dual-zone automatic" },
  { aircondition_id: 5, cs: "Třízónová automatická", en: "Tri-zone automatic" },
  { aircondition_id: 6, cs: "Čtyřzónová automatická", en: "Four-zone automatic" },
];

export const stateList = [
  { id: 1, cs: "Česká republika", en: "Czech Republic" },
  { id: 2, cs: "Slovenská republika", en: "Slovakia" },
  { id: 3, cs: "Francie", en: "France" },
  { id: 4, cs: "Itálie", en: "Italy" },
  { id: 5, cs: "Německo", en: "Germany" },
  { id: 6, cs: "Rakousko", en: "Austria" },
  { id: 7, cs: "Švýcarsko", en: "Switzerland" },
  { id: 8, cs: "Holandsko", en: "Netherlands" },
  { id: 9, cs: "Lucembursko", en: "Luxembourg" },
  { id: 10, cs: "Jiná", en: "Other" },
  { id: 11, cs: "Belgie", en: "Belgium" },
  { id: 12, cs: "Španělsko", en: "Spain" },
  { id: 13, cs: "Dánsko", en: "Denmark" },
  { id: 14, cs: "Nedohledatelný původ", en: "Unknown origin" },
  { id: 15, cs: "USA", en: "USA" },
  { id: 16, cs: "Švédsko", en: "Sweden" },
  { id: 17, cs: "Polsko", en: "Poland" },
];

export const serviceBookList = [
  { id: 1, cs: "Ano", en: "Yes" },
  { id: 2, cs: "Ne", en: "No" },
];

export const gearboxLevelList = [
  { id: 3, cs: "3 stupňová a méně", en: "3-speed and less" },
  { id: 4, cs: "4 stupňová", en: "4-speed" },
  { id: 5, cs: "5 stupňová", en: "5-speed" },
  { id: 6, cs: "6 stupňová", en: "6-speed" },
  { id: 7, cs: "7 stupňová", en: "7-speed" },
  { id: 8, cs: "8 stupňová a více", en: "8-speed and more" },
];

export const gearboxAutoTypeList = [
  { id: 1, cs: "automatická", en: "automatic" },
  { id: 2, cs: "dvouspojková (DSG)", en: "dual-clutch (DSG)" },
  { id: 3, cs: "hydrodynamická", en: "hydrodynamic" },
  { id: 4, cs: "variátor (CVT)", en: "continuously variable (CVT)" },
];

export const gearboxList = [
  { id: 1, cs: "Manuální", en: "Manual" },
  { id: 2, cs: "Poloautomatická", en: "Semi-automatic" },
  { id: 3, cs: "Automatická", en: "Automatic" },
];

export const firstOwnerList = [
  { id: 1, cs: "Ano", en: "Yes" },
  { id: 2, cs: "Ne", en: "No" },
];

