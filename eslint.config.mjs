import { fixupConfigRules } from "@eslint/compat";
import nextPlugin from "eslint-config-next";

const config = [
  ...fixupConfigRules(nextPlugin),
];

export default config;
