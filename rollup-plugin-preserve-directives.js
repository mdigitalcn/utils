/**
 * Rollup plugin to preserve "use client" and "use server" directives
 * These directives must be at the top of files for React Server Components
 */
export default function preserveDirectives() {
  const directivePattern = /^['"]use (client|server)['"];?\s*/;
  const fileDirectives = new Map();

  return {
    name: 'preserve-directives',

    // Extract directives before transformation
    transform(code, id) {
      const match = code.match(directivePattern);
      if (match) {
        fileDirectives.set(id, match[0].trim());
      }
      return null;
    },

    // Re-add directives after all transformations (including terser)
    renderChunk(code, chunk) {
      const moduleIds = Object.keys(chunk.modules);

      // Check if any module in this chunk had a directive
      for (const id of moduleIds) {
        const directive = fileDirectives.get(id);
        if (directive) {
          // Add directive at the very top, before any code
          return {
            code: `${directive}\n${code}`,
            map: null
          };
        }
      }

      return null;
    }
  };
}
