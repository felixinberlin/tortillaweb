import { describe, it, expect } from "vitest";
import { optimizeSvg } from "../src/domain/svg/svgOptimizer";

describe("SVG Optimizer & Best Practices Engine", () => {
  it("should strip XML comments and empty attributes", () => {
    const rawSvg = `
      <svg viewBox="0 0 100 100">
        <!-- Some internal dev comment -->
        <g class="" style="">
          <circle cx="50" cy="50" r="40" fill="#FFB800" />
        </g>
      </svg>
    `;

    const optimized = optimizeSvg(rawSvg, { minifyWhitespace: true });
    expect(optimized).not.toContain("Some internal dev comment");
    expect(optimized).not.toContain('class=""');
    expect(optimized).not.toContain('style=""');
    expect(optimized).toContain('fill="#FFB800"');
  });

  it("should ensure accessibility and responsive scaling attributes", () => {
    const rawSvg = `<svg width="100" height="100"><circle cx="50" cy="50" r="20" /></svg>`;
    const optimized = optimizeSvg(rawSvg, {
      title: "Tortilla Pan",
      desc: "Detailed scientific illustration of a Spanish tortilla",
    });

    expect(optimized).toContain('role="img"');
    expect(optimized).toContain('focusable="false"');
    expect(optimized).toContain('preserveAspectRatio="xMidYMid meet"');
    expect(optimized).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(optimized).toContain("<title>Tortilla Pan</title>");
    expect(optimized).toContain("<desc>Detailed scientific illustration of a Spanish tortilla</desc>");
  });

  it("should preserve text and tspan contents exactly without collapsing inner spacing", () => {
    const rawSvg = `
      <svg viewBox="0 0 200 60">
        <text x="10" y="30" fill="#000">
          70°C for 2 minutes
        </text>
      </svg>
    `;

    const optimized = optimizeSvg(rawSvg, { minifyWhitespace: true });
    expect(optimized).toContain("70°C for 2 minutes");
  });

  it("should inject prefers-reduced-motion fallback into style blocks with keyframes", () => {
    const animatedSvg = `
      <svg viewBox="0 0 100 100">
        <style>
          @keyframes yolkFloat { 0% { transform: translateY(0); } 100% { transform: translateY(-5px); } }
          .pulsing { animation: yolkFloat 2s infinite; }
        </style>
        <circle class="pulsing" cx="50" cy="50" r="30" />
      </svg>
    `;

    const optimized = optimizeSvg(animatedSvg);
    expect(optimized).toContain("@media (prefers-reduced-motion: reduce)");
    expect(optimized).toContain("animation-duration: 0.01ms !important;");
  });

  it("should optimize excessive decimal precision in paths and transformations", () => {
    const rawSvg = `
      <svg viewBox="0 0 100 100">
        <path d="M 12.3456789 24.8765432 L 85.1111111 90.9999999" />
      </svg>
    `;

    const optimized = optimizeSvg(rawSvg, { decimalPrecision: 2 });
    expect(optimized).toContain('d="M 12.35 24.88 L 85.11 91"');
  });

  it("should handle XML declaration flag cleanly", () => {
    const rawSvg = `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="10" /></svg>`;

    const withXml = optimizeSvg(rawSvg, { xmlDeclaration: true });
    expect(withXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);

    const withoutXml = optimizeSvg(withXml, { xmlDeclaration: false });
    expect(withoutXml.startsWith("<svg")).toBe(true);
  });
});
