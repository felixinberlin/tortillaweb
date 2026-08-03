import React, { useState, useEffect, useId } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  HelpCircle,
  MessageSquare,
  Heart,
  Tag,
  Mail,
  User,
  FileText,
  RotateCcw
} from 'lucide-react';
import '@/i18n/config';

export interface ContactFormProps {
  lang?: string;
  currentPath?: string;
  className?: string;
}

export type ContactMessageType = 'help' | 'question' | 'thanks' | 'other';

interface FormState {
  name: string;
  email: string;
  type: ContactMessageType;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  type?: string;
  message?: string;
}

const fallbackTranslations = {
  es: {
    title: 'Contacto & Consultas',
    subtitle: '¿Tienes dudas sobre la enciclopedia, sugerencias de recetas o quieres colaborar?',
    badge: 'Atención al Tortillero',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'Ej. Juan Pérez',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@email.com',
    typeLabel: 'Motivo del mensaje',
    typeOptions: {
      help: 'Necesito ayuda',
      question: 'Tengo una pregunta',
      thanks: '¡Sois los mejores!',
      other: 'Otro asunto'
    },
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Escribe aquí tu consulta o comentario...',
    submitButton: 'Enviar mensaje',
    sending: 'Enviando...',
    successTitle: '¡Mensaje enviado con éxito!',
    successMessage: 'Gracias por contactar con tortilladepatatas.org. Nos pondremos en contacto contigo lo antes posible.',
    sendAnother: 'Enviar otro mensaje',
    errorMessage: 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.',
    errors: {
      nameRequired: 'Por favor, introduce tu nombre.',
      emailRequired: 'Por favor, introduce tu correo electrónico.',
      emailInvalid: 'Por favor, introduce un correo electrónico válido.',
      typeRequired: 'Por favor, selecciona el motivo de tu mensaje.',
      messageRequired: 'Por favor, escribe un mensaje.'
    }
  },
  en: {
    title: 'Contact & Inquiries',
    subtitle: 'Have questions about the encyclopedia, recipe suggestions, or want to collaborate?',
    badge: 'Get in Touch',
    nameLabel: 'Full name',
    namePlaceholder: 'e.g. Jane Doe',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    typeLabel: 'Message reason',
    typeOptions: {
      help: 'I need help',
      question: 'I have a question',
      thanks: 'You are the best!',
      other: 'Other'
    },
    messageLabel: 'Message',
    messagePlaceholder: 'Write your message or inquiry here...',
    submitButton: 'Send message',
    sending: 'Sending...',
    successTitle: 'Message sent successfully!',
    successMessage: 'Thank you for contacting tortilladepatatas.org. We will get back to you as soon as possible.',
    sendAnother: 'Send another message',
    errorMessage: 'Failed to send your message. Please try again.',
    errors: {
      nameRequired: 'Please enter your name.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
      typeRequired: 'Please select a message type.',
      messageRequired: 'Please enter a message.'
    }
  },
  de: {
    title: 'Kontakt & Anfragen',
    subtitle: 'Haben Sie Fragen zur Enzyklopädie, Rezeptvorschläge oder möchten Sie zusammenarbeiten?',
    badge: 'Kontakt',
    nameLabel: 'Vollständiger Name',
    namePlaceholder: 'z.B. Max Mustermann',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'ihre@email.de',
    typeLabel: 'Grund der Anfrage',
    typeOptions: {
      help: 'Ich brauche Hilfe',
      question: 'Ich habe eine Frage',
      thanks: 'Ihr seid die Besten!',
      other: 'Sonstiges'
    },
    messageLabel: 'Nachricht',
    messagePlaceholder: 'Schreiben Sie hier Ihre Nachricht...',
    submitButton: 'Nachricht senden',
    sending: 'Wird gesendet...',
    successTitle: 'Nachricht erfolgreich gesendet!',
    successMessage: 'Vielen Dank für Ihre Anfrage an tortilladepatatas.org. Wir melden uns schnellstmöglich bei Ihnen.',
    sendAnother: 'Weitere Nachricht senden',
    errorMessage: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    errors: {
      nameRequired: 'Bitte geben Sie Ihren Namen ein.',
      emailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
      emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      typeRequired: 'Bitte wählen Sie den Grund Ihrer Anfrage aus.',
      messageRequired: 'Bitte geben Sie eine Nachricht ein.'
    }
  }
};

export default function ContactForm({ lang = 'es', currentPath, className = '' }: ContactFormProps) {
  const currentLang = (['es', 'en', 'de'].includes(lang) ? lang : 'es') as 'es' | 'en' | 'de';
  const { t } = useTranslation(undefined, { lng: currentLang });

  const getTx = (key: string, fallback: string): string => {
    const translated = t(key);
    if (translated && translated !== key) return translated;

    const parts = key.split('.');
    let cur: any = fallbackTranslations[currentLang];
    for (const p of parts) {
      if (cur && typeof cur === 'object' && p in cur) {
        cur = cur[p];
      } else {
        cur = null;
        break;
      }
    }
    return typeof cur === 'string' ? cur : fallback;
  };

  const nameId = useId();
  const emailId = useId();
  const typeId = useId();
  const messageId = useId();
  const hpId = useId();

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    type: 'question',
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [activePathname, setActivePathname] = useState('');

  useEffect(() => {
    if (currentPath) {
      setActivePathname(currentPath);
    } else if (typeof window !== 'undefined') {
      setActivePathname(window.location.pathname);
    }
  }, [currentPath]);

  const typeOptionsList: { value: ContactMessageType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      value: 'help',
      label: getTx('contact.typeOptions.help', fallbackTranslations[currentLang].typeOptions.help),
      icon: HelpCircle
    },
    {
      value: 'question',
      label: getTx('contact.typeOptions.question', fallbackTranslations[currentLang].typeOptions.question),
      icon: MessageSquare
    },
    {
      value: 'thanks',
      label: getTx('contact.typeOptions.thanks', fallbackTranslations[currentLang].typeOptions.thanks),
      icon: Heart
    },
    {
      value: 'other',
      label: getTx('contact.typeOptions.other', fallbackTranslations[currentLang].typeOptions.other),
      icon: Tag
    }
  ];

  const validateField = (name: keyof FormState, value: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === 'name' && !value.trim()) {
      return getTx('contact.errors.nameRequired', fallbackTranslations[currentLang].errors.nameRequired);
    }
    if (name === 'email') {
      if (!value.trim()) {
        return getTx('contact.errors.emailRequired', fallbackTranslations[currentLang].errors.emailRequired);
      }
      if (!emailRegex.test(value.trim())) {
        return getTx('contact.errors.emailInvalid', fallbackTranslations[currentLang].errors.emailInvalid);
      }
    }
    if (name === 'type' && !value) {
      return getTx('contact.errors.typeRequired', fallbackTranslations[currentLang].errors.typeRequired);
    }
    if (name === 'message' && !value.trim()) {
      return getTx('contact.errors.messageRequired', fallbackTranslations[currentLang].errors.messageRequired);
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      const fieldError = validateField(name as keyof FormState, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleTypeSelect = (selectedType: ContactMessageType) => {
    setFormData((prev) => ({ ...prev, type: selectedType }));
    if (errors.type) {
      setErrors((prev) => ({ ...prev, type: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Honeypot check for spam bots
    if (honeypot.trim() !== '') {
      setIsSuccess(true);
      return;
    }

    // Client-side validation
    const newErrors: FormErrors = {};
    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const typeErr = validateField('type', formData.type);
    const messageErr = validateField('message', formData.message);

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (typeErr) newErrors.type = typeErr;
    if (messageErr) newErrors.message = messageErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      type: formData.type,
      message: formData.message.trim(),
      language: currentLang,
      page: activePathname || `/${currentLang}/contacto`
    };

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        let data: any = null;
        try {
          data = await response.json();
        } catch {
          data = { success: true };
        }

        if (data && data.success === false) {
          setServerError(data.message || getTx('contact.errorMessage', fallbackTranslations[currentLang].errorMessage));
        } else {
          setIsSuccess(true);
        }
      } else {
        let errData: any = null;
        try {
          errData = await response.json();
        } catch {
          errData = null;
        }
        setServerError(
          (errData && (errData.message || errData.error)) ||
            getTx('contact.errorMessage', fallbackTranslations[currentLang].errorMessage)
        );
      }
    } catch (err) {
      console.error('Error sending contact message:', err);
      setServerError(getTx('contact.errorMessage', fallbackTranslations[currentLang].errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      type: 'question',
      message: ''
    });
    setErrors({});
    setIsSuccess(false);
    setServerError(null);
  };

  return (
    <div
      className={`card-notebook relative bg-[#FAF6EE] border border-[#8D6E63]/20 rounded-2xl p-6 sm:p-10 shadow-md ${className}`}
    >
      {/* Decorative notebook elements */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FFB800] via-[#F5E6BE] to-[#8D6E63]/40 rounded-t-2xl" />

      {isSuccess ? (
        <div
          role="alert"
          aria-live="polite"
          className="py-8 px-4 text-center space-y-6 animate-in fade-in zoom-in duration-300"
        >
          <div className="w-16 h-16 mx-auto bg-[#2E7D32]/10 border border-[#2E7D32]/30 rounded-full flex items-center justify-center text-[#2E7D32] shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-serif-heading font-extrabold text-[#2A2421]">
              {getTx('contact.successTitle', fallbackTranslations[currentLang].successTitle)}
            </h3>
            <p className="text-sm text-[#4A3B32] leading-relaxed">
              {getTx('contact.successMessage', fallbackTranslations[currentLang].successMessage)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFB800] hover:bg-[#E0A200] text-[#2A2421] font-bold text-sm rounded-xl border border-amber-400 shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-[#FFB800] focus:ring-offset-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{getTx('contact.sendAnother', fallbackTranslations[currentLang].sendAnother)}</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot field (hidden from screen & readers) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={hpId}>Leave this empty</label>
            <input
              type="text"
              id={hpId}
              name="website_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Form Header */}
          <div className="space-y-1.5 border-b border-[#E8E2D5] pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif-heading font-extrabold text-[#2A2421]">
              {getTx('contact.title', fallbackTranslations[currentLang].title)}
            </h2>
            <p className="text-xs sm:text-sm text-[#8D6E63] font-medium leading-relaxed">
              {getTx('contact.subtitle', fallbackTranslations[currentLang].subtitle)}
            </p>
          </div>

          {/* Error Banner */}
          {serverError && (
            <div
              role="alert"
              aria-live="assertive"
              className="p-4 rounded-xl bg-[#D32F2F]/10 border border-[#D32F2F]/30 text-[#D32F2F] text-xs sm:text-sm flex items-start gap-3 shadow-2xs"
            >
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block">Error</span>
                <span>{serverError}</span>
              </div>
            </div>
          )}

          {/* Field 1: Name */}
          <div className="space-y-1.5">
            <label htmlFor={nameId} className="flex items-center gap-1.5 text-xs font-bold text-[#4A3B32] uppercase tracking-wider">
              <User className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{getTx('contact.nameLabel', fallbackTranslations[currentLang].nameLabel)}</span>
              <span className="text-[#D32F2F]" title="Campo obligatorio">*</span>
            </label>
            <input
              type="text"
              id={nameId}
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${nameId}-error` : undefined}
              placeholder={getTx('contact.namePlaceholder', fallbackTranslations[currentLang].namePlaceholder)}
              className={`w-full px-4 py-3 rounded-xl border bg-white/90 text-[#2A2421] text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#FFB800] focus:border-[#8D6E63] ${
                errors.name ? 'border-[#D32F2F] bg-red-50/30' : 'border-[#E8E2D5]'
              }`}
            />
            {errors.name && (
              <p id={`${nameId}-error`} role="alert" className="text-xs text-[#D32F2F] font-medium mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Field 2: Email */}
          <div className="space-y-1.5">
            <label htmlFor={emailId} className="flex items-center gap-1.5 text-xs font-bold text-[#4A3B32] uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{getTx('contact.emailLabel', fallbackTranslations[currentLang].emailLabel)}</span>
              <span className="text-[#D32F2F]" title="Campo obligatorio">*</span>
            </label>
            <input
              type="email"
              id={emailId}
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${emailId}-error` : undefined}
              placeholder={getTx('contact.emailPlaceholder', fallbackTranslations[currentLang].emailPlaceholder)}
              className={`w-full px-4 py-3 rounded-xl border bg-white/90 text-[#2A2421] text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#FFB800] focus:border-[#8D6E63] ${
                errors.email ? 'border-[#D32F2F] bg-red-50/30' : 'border-[#E8E2D5]'
              }`}
            />
            {errors.email && (
              <p id={`${emailId}-error`} role="alert" className="text-xs text-[#D32F2F] font-medium mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Field 3: Message Type Selection */}
          <div className="space-y-2">
            <label htmlFor={typeId} className="flex items-center gap-1.5 text-xs font-bold text-[#4A3B32] uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{getTx('contact.typeLabel', fallbackTranslations[currentLang].typeLabel)}</span>
              <span className="text-[#D32F2F]" title="Campo obligatorio">*</span>
            </label>

            {/* Select fallback for screen-readers & select accessibility */}
            <select
              id={typeId}
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={!!errors.type}
              aria-describedby={errors.type ? `${typeId}-error` : undefined}
              className="sr-only"
            >
              {typeOptionsList.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Visual Choice Cards */}
            <div
              role="radiogroup"
              aria-label={getTx('contact.typeLabel', fallbackTranslations[currentLang].typeLabel)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
            >
              {typeOptionsList.map((opt) => {
                const IconComponent = opt.icon;
                const isSelected = formData.type === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={isSubmitting}
                    onClick={() => handleTypeSelect(opt.value)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#F5E6BE] border-[#FFB800] text-[#2A2421] shadow-2xs ring-2 ring-[#FFB800]/40'
                        : 'bg-white/70 border-[#E8E2D5] text-[#8D6E63] hover:bg-white hover:border-[#8D6E63]/40'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected ? 'bg-[#FFB800] text-[#2A2421]' : 'bg-[#FAF6EE] text-[#8D6E63]'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="flex-1">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {errors.type && (
              <p id={`${typeId}-error`} role="alert" className="text-xs text-[#D32F2F] font-medium mt-1">
                {errors.type}
              </p>
            )}
          </div>

          {/* Field 4: Message */}
          <div className="space-y-1.5">
            <label htmlFor={messageId} className="flex items-center gap-1.5 text-xs font-bold text-[#4A3B32] uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>{getTx('contact.messageLabel', fallbackTranslations[currentLang].messageLabel)}</span>
              <span className="text-[#D32F2F]" title="Campo obligatorio">*</span>
            </label>
            <textarea
              id={messageId}
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? `${messageId}-error` : undefined}
              placeholder={getTx('contact.messagePlaceholder', fallbackTranslations[currentLang].messagePlaceholder)}
              className={`w-full px-4 py-3 rounded-xl border bg-white/90 text-[#2A2421] text-sm transition-colors resize-y min-h-[120px] focus:outline-hidden focus:ring-2 focus:ring-[#FFB800] focus:border-[#8D6E63] ${
                errors.message ? 'border-[#D32F2F] bg-red-50/30' : 'border-[#E8E2D5]'
              }`}
            />
            {errors.message && (
              <p id={`${messageId}-error`} role="alert" className="text-xs text-[#D32F2F] font-medium mt-1">
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FFB800] hover:bg-[#E0A200] disabled:bg-[#E8E2D5] disabled:text-[#8D6E63]/60 text-[#2A2421] font-bold text-sm rounded-xl border border-amber-400 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#FFB800] focus:ring-offset-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#2A2421]" />
                  <span>{getTx('contact.sending', fallbackTranslations[currentLang].sending)}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#2A2421]" />
                  <span>{getTx('contact.submitButton', fallbackTranslations[currentLang].submitButton)}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
