import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Field {
  label?: string
  value?: string
}

interface Props {
  formName?: string
  name?: string
  email?: string
  fields?: Field[]
  message?: string
  submittedAt?: string
}

const Email = ({
  formName = 'Formulier',
  name = 'Onbekend',
  email = '',
  fields = [],
  message = '',
  submittedAt = '',
}: Props) => (
  <Html lang="nl" dir="ltr">
    <Head />
    <Preview>{`Nieuwe inzending via ${formName}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={badge}>
          <Text style={badgeText}>JesusToday</Text>
        </Section>
        <Heading style={heading}>Nieuwe inzending: {formName}</Heading>
        <Text style={intro}>
          Er is een nieuw bericht binnengekomen via de website.
        </Text>

        <Section style={card}>
          <Text style={row}>
            <span style={label}>Naam</span>
            <br />
            {name}
          </Text>
          {email ? (
            <Text style={row}>
              <span style={label}>E-mail</span>
              <br />
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
          ) : null}
          {fields
            .filter((f) => f && f.value)
            .map((f, i) => (
              <Text key={`${f.label}-${i}`} style={row}>
                <span style={label}>{f.label}</span>
                <br />
                {f.value}
              </Text>
            ))}
          {message ? (
            <Text style={row}>
              <span style={label}>Bericht</span>
              <br />
              {message}
            </Text>
          ) : null}
        </Section>

        <Text style={hint}>
          Antwoord rechtstreeks door te mailen naar{' '}
          {email ? (
            <Link href={`mailto:${email}`} style={link}>
              {email}
            </Link>
          ) : (
            'het opgegeven adres'
          )}
          .
        </Text>

        <Hr style={hr} />
        <Text style={footer}>
          {submittedAt ? `Ontvangen op ${submittedAt}. ` : ''}
          Automatisch bericht van jesustoday.app
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Props) =>
    `Nieuwe inzending: ${data?.formName ?? 'formulier'}${data?.name ? ` (${data.name})` : ''}`,
  displayName: 'Inzending notificatie',
  to: 'info@jesustoday.nl',
  previewData: {
    formName: 'Contactformulier',
    name: 'Sanne de Vries',
    email: 'sanne@voorbeeld.nl',
    fields: [{ label: 'Onderwerp', value: 'Vraag over jullie werk' }],
    message: 'Hoi, ik zou graag meer willen weten over JesusToday.',
    submittedAt: '25 augustus 2026 09:15',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Helvetica, Arial, sans-serif',
  color: '#2b2b2b',
}
const container = { padding: '28px 24px', maxWidth: '600px' }
const badge = {
  backgroundColor: '#fad150',
  borderRadius: '999px',
  display: 'inline-block',
  padding: '6px 14px',
  marginBottom: '18px',
}
const badgeText = { margin: '0', fontSize: '13px', fontWeight: 'bold', color: '#2b2b2b' }
const heading = { fontSize: '22px', margin: '0 0 8px', color: '#2b2b2b' }
const intro = { fontSize: '15px', margin: '0 0 20px', color: '#555555' }
const card = {
  backgroundColor: '#fdfaf2',
  border: '1px solid #f0e6cf',
  borderRadius: '14px',
  padding: '18px 20px',
}
const row = { fontSize: '15px', margin: '0 0 14px', lineHeight: '1.55' }
const label = { fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '0.04em', color: '#8a7b4e' }
const link = { color: '#8a6d00', textDecoration: 'underline' }
const hint = { fontSize: '14px', color: '#555555', margin: '20px 0 0' }
const hr = { borderColor: '#eeeeee', margin: '24px 0 12px' }
const footer = { fontSize: '12px', color: '#999999', margin: '0' }
