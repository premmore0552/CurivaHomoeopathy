import React from 'react';
import ModalityPill from '../components/ModalityPill';

// Helper to replace specific text patterns with ModalityPills
export function renderWithModalities(text: string) {
  if (typeof text !== 'string') return text;

  // Regex to match "Worse from/worse by/etc" or "Better from" or "Ailments from"
  // case insensitive.
  
  const regex = /(worse|better|ailments\sfrom)([\s\w]*)/gi;
  // This might be too broad.
  // We just want to highlight the phrases "Worse from cold", "Better by rest".
  // A better approach is to match the sentences or phrases that start with these.
  // Actually, the user asked to tag/pill "Worse from cold", etc. or left border highlight.
  return text;
}
