import { defineConfig } from 'orval';

export default defineConfig({
  orval: {
    input: './build/openapi/output.swagger.json',
    output: {
      mock: true,
      mode: "split",
      target: "./orval.ts"
    }
  }
});