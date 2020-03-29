import typescript from "rollup-plugin-typescript";
export default {
  input: "./src/index.ts",
  external: ["axios", "graphql-request"],
  output: {
    file: "./src/bundle.js"
  },
  plugins: [typescript()]
};
