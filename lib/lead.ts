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
  // honeypot
  website: z.string().max(0).optional().or(z.literal(''))
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
  website: ''
};
