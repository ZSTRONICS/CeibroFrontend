export interface OptionType {
  label: string;
  value: string;
}

export interface Options {
  allOptions: OptionType[];
  recentOptions: OptionType[];
}
