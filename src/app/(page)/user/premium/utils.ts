function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const updatedHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(updatedHex)!;

  return {
    r: Number.parseInt(result[1], 16),
    g: Number.parseInt(result[2], 16),
    b: Number.parseInt(result[3], 16),
  };
}

function luminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    // biome-ignore lint/style/noParameterAssign: <explanation>
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function allowedContrast(color: string): boolean {
  const colorRgb = hexToRgb(color);
  const colorLuminance = luminance(colorRgb.r, colorRgb.g, colorRgb.b) * 100;

  return colorLuminance > 1.2;
}
