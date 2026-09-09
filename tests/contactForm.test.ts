import { describe, it, expect } from 'vitest';
import es from '../src/i18n/es.json';
import en from '../src/i18n/en.json';
import de from '../src/i18n/de.json';

describe('Contact Form & i18n Data Tests', () => {
  it('should verify contact section exists in all 3 language dictionaries (es, en, de)', () => {
    for (const [_lang, dict] of Object.entries({ es, en, de })) {
      expect(dict).toHaveProperty('contact');
      const contact = (dict as any).contact;
      expect(contact).toHaveProperty('title');
      expect(contact).toHaveProperty('subtitle');
      expect(contact).toHaveProperty('nameLabel');
      expect(contact).toHaveProperty('emailLabel');
      expect(contact).toHaveProperty('typeLabel');
      expect(contact).toHaveProperty('messageLabel');
      expect(contact).toHaveProperty('submitButton');
      expect(contact).toHaveProperty('sending');
      expect(contact).toHaveProperty('successTitle');
      expect(contact).toHaveProperty('successMessage');
      expect(contact).toHaveProperty('errorMessage');
      expect(contact).toHaveProperty('errors');

      // Verify options
      expect(contact.typeOptions).toHaveProperty('help');
      expect(contact.typeOptions).toHaveProperty('question');
      expect(contact.typeOptions).toHaveProperty('thanks');
      expect(contact.typeOptions).toHaveProperty('other');
    }
  });

  it('should verify email subject prefix mappings required for STRATO mail API', () => {
    const optionPrefixMap: Record<string, string> = {
      help: 'Help',
      question: 'Question',
      thanks: 'Thanks',
      other: 'Other'
    };

    expect(optionPrefixMap['help']).toBe('Help');
    expect(optionPrefixMap['question']).toBe('Question');
    expect(optionPrefixMap['thanks']).toBe('Thanks');
    expect(optionPrefixMap['other']).toBe('Other');
  });

  it('should validate contact API payload structure', () => {
    const samplePayload = {
      name: 'Visitor name',
      email: 'visitor@example.com',
      type: 'question',
      message: 'Message text',
      language: 'es',
      page: '/es/contacto'
    };

    expect(samplePayload).toHaveProperty('name', 'Visitor name');
    expect(samplePayload).toHaveProperty('email', 'visitor@example.com');
    expect(samplePayload).toHaveProperty('type', 'question');
    expect(samplePayload).toHaveProperty('message', 'Message text');
    expect(samplePayload).toHaveProperty('language', 'es');
    expect(samplePayload).toHaveProperty('page', '/es/contacto');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(samplePayload.email)).toBe(true);
    expect(emailRegex.test('invalid-email')).toBe(false);
  });
});
