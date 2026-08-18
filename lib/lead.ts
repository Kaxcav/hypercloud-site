import { z } from 'zod';

export const companySizeOptions = [
  { value: '1-10', label: '1 a 10 colaboradores' },
  { value: '11-50', label: '11 a 50 colaboradores' },
  { value: '51-200', label: '51 a 200 colaboradores' },
  { value: '200+', label: '200 ou mais colaboradores' }
] as const;

export const sectorOptions = [
  { value: 'privado', label: 'Empresa privada' },
  { value: 'publico', label: 'Setor Público / Governo' },
  { value: 'educacao', label: 'Educação' },
  { value: 'saude', label: 'Saúde' }
] as const;

export const interestOptions = [
  { value: 'workspace', label: 'Google Workspace' },
  { value: 'gemini', label: 'Workspace with Gemini' },
  { value: 'cloud', label: 'Google Cloud' },
  { value: 'appsheet', label: 'AppSheet' }
] as const;

export const leadFormSchema = z.object({
  // step 1
  company: z.string().trim().min(2, 'Informe o nome da empresa'),
  size: z.enum(['1-10', '11-50', '51-200', '200+'], {
    message: 'Selecione o porte da empresa'
  }),
  sector: z.enum(['privado', 'publico', 'educacao', 'saude'], {
    message: 'Selecione o setor'
  }),
  // step 2
  interests: z.array(z.enum(['workspace', 'gemini', 'cloud', 'appsheet'])).min(1, 'Selecione pelo menos uma solução'),
  context: z.string().trim().max(500).optional().or(z.literal('')),
  // step 3
  name: z.string().trim().min(2, 'Informe seu nome'),
  email: z.string().trim().email('E-mail inválido'),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, '').length >= 10, 'Informe um telefone válido'),
  consent: z.literal(true, {
    message: 'Você precisa autorizar o contato para enviar o pedido'
  }),
  // honeypot (afrouxado para aceitar string e filtrar no servidor)
  website: z.string().optional(),
  // atribuição de marketing e navegação (opcionais)
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  gclid: z.string().optional(),
  referrer: z.string().optional(),
  landingPage: z.string().optional()
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const leadDefaults: Partial<LeadFormValues> = {
  company: '',
  size: '' as LeadFormValues['size'],
  sector: '' as LeadFormValues['sector'],
  interests: [],
  context: '',
  name: '',
  email: '',
  phone: '',
  consent: true,
  website: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  gclid: '',
  referrer: '',
  landingPage: ''
};

/* ============================================================
   CAPTURA CURTA — quiz de 2 passos e calculadora FinOps
   ============================================================
   O dialog completo continua governado por `leadFormSchema`. As duas
   superficies curtas pedem menos campos (nao perguntam empresa nem setor),
   entao ganham schema proprio em vez de afrouxar o schema principal.
   A rota aceita os dois via `anyLeadSchema`. */

export const objectiveOptions = [
  { value: 'finops', label: 'Reduzir custos (FinOps)' },
  { value: 'migracao', label: 'Migrar sem parar a operacao' },
  { value: 'ia', label: 'Implementar IA (Gemini)' },
  { value: 'outro', label: 'Outro' }
] as const;

export const userRangeOptions = [
  { value: 'ate-20', label: 'Ate 20' },
  { value: '21-100', label: '21 a 100' },
  { value: '101-500', label: '101 a 500' },
  { value: '500-plus', label: 'Mais de 500' }
] as const;

export const monthlySpendOptions = [
  { value: 'ate-5k', label: 'Ate R$ 5 mil', midpoint: 5000 },
  { value: '5k-15k', label: 'R$ 5 mil a R$ 15 mil', midpoint: 15000 },
  { value: '15k-50k', label: 'R$ 15 mil a R$ 50 mil', midpoint: 50000 },
  { value: '50k-plus', label: 'Mais de R$ 50 mil', midpoint: 80000 }
] as const;

export const providerOptions = [
  { value: 'google-cloud', label: 'Google Cloud' },
  { value: 'aws', label: 'AWS' },
  { value: 'azure', label: 'Azure' },
  { value: 'google-workspace', label: 'Google Workspace' },
  { value: 'outro', label: 'Outro' }
] as const;

export const quickLeadSchema = z.object({
  origin: z.enum(['quiz', 'calculadora']),
  objective: z.enum(['finops', 'migracao', 'ia', 'outro']).optional(),
  userRange: z.enum(['ate-20', '21-100', '101-500', '500-plus']).optional(),
  monthlySpend: z.enum(['ate-5k', '5k-15k', '15k-50k', '50k-plus']).optional(),
  provider: z.enum(['google-cloud', 'aws', 'azure', 'google-workspace', 'outro']).optional(),
  /** Estimativa exibida ao usuario, em BRL/ano. Registrada para conferencia. */
  estimatedAnnualSaving: z.number().nonnegative().optional(),
  name: z.string().trim().min(2, 'Informe seu nome'),
  email: z.string().trim().email('E-mail invalido'),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, '').length >= 10, 'Informe um WhatsApp valido'),
  consent: z.literal(true, {
    message: 'Voce precisa autorizar o contato para enviar o pedido'
  }),
  website: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  gclid: z.string().optional(),
  referrer: z.string().optional(),
  landingPage: z.string().optional()
});

export type QuickLeadValues = z.infer<typeof quickLeadSchema>;

/** Aceita tanto o dialog completo quanto as capturas curtas. */
export const anyLeadSchema = z.union([leadFormSchema, quickLeadSchema]);
export type AnyLeadValues = z.infer<typeof anyLeadSchema>;

export const quickLeadDefaults: Partial<QuickLeadValues> = {
  name: '',
  email: '',
  phone: '',
  consent: true,
  website: '',
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  gclid: '',
  referrer: '',
  landingPage: ''
};
