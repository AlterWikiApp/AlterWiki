import { reactive } from 'vue'

/** Session-only link display options for article content (not persisted). */

export const LINK_COLOR_PRESETS = [
  { id: 'blue', label: 'Blau', value: '#2563eb' },
  { id: 'sky', label: 'Himmel', value: '#0284c7' },
  { id: 'green', label: 'Grün', value: '#059669' },
  { id: 'violet', label: 'Violett', value: '#7c3aed' },
] as const

export interface LinkDisplaySettings {
  /** Custom link color; null = theme-aware accessible default */
  color: string | null
  underline: boolean
  /** Links look like normal text but remain clickable */
  noVisualStyle: boolean
}

export const DEFAULT_LINK_DISPLAY: LinkDisplaySettings = {
  color: null,
  underline: true,
  noVisualStyle: false,
}

export const linkDisplay = reactive<LinkDisplaySettings>({
  ...DEFAULT_LINK_DISPLAY,
})

export function resetLinkDisplay(): void {
  linkDisplay.color = DEFAULT_LINK_DISPLAY.color
  linkDisplay.underline = DEFAULT_LINK_DISPLAY.underline
  linkDisplay.noVisualStyle = DEFAULT_LINK_DISPLAY.noVisualStyle
}

export function setLinkColor(color: string): void {
  linkDisplay.color = color
}

export function setLinkUnderline(underline: boolean): void {
  linkDisplay.underline = underline
}

export function setNoVisualLinkStyle(enabled: boolean): void {
  linkDisplay.noVisualStyle = enabled
}
