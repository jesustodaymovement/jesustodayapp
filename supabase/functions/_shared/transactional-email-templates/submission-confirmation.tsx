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

interface Props {
  name?: string
  formName?: string
  message?: string
  intro?: string
}

const Email = ({
  name = '',
  formName = 'je bericht',
  message = '',
  intro = '',
}: Props) => (
  <Html lang="nl" dir="ltr">
    <Head />
    <Preview>We hebben je bericht ontvangen, dankjewel</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={badge}>
          <Text style={badgeText}>JesusToday</Text>
        </Section>
        <Heading style={heading}>
          {name ? `Dankjewel ${name},` : 'Dankjewel,'}
        </Heading>
        <Text style={paragraph}>
          {intro ||
            `We hebben ${formName} goed ontvangen. Iemand van ons team leest het persoonlijk en neemt zo snel als het kan contact met je op.`}
        </Text>

        {message ? (
          <Section style={card}>
            <Text style={label}>Wat je ons stuurde</Text>
            <Text style={quote}>{message}</Text>
          </Section>
        ) : null}

        <Text style={paragraph}>
          Heb je in de tussentijd een vraag? Mail ons gerust op{' '}
          <Link href="mailto:info@jesustoday.nl" style={link}>
            info@jesustoday.nl
          </Link>
          .
        </Text>

        <Text style={signature}>
          Hartelijke groet,
          <br />
          Team JesusToday
        </Text>

        <Hr style={hr} />
        <Text style={footer}>
          JesusToday, verhalen over Jezus van mensen van nu.{' '}
          <Link href="https://jesustoday.app" style={link}>
            jesustoday.app
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'We hebben je bericht ontvangen',
  displayName: 'Bevestiging inzending',
  previewData: {
    name: 'Sanne',
    formName: 'je bericht',
    message: 'Hoi, ik zou graag meer willen weten over JesusToday.',
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
const heading = { fontSize: '24px', margin: '0 0 12px', color: '#2b2b2b' }
const paragraph = { fontSize: '15px', lineHeight: '1.6', margin: '0 0 16px', color: '#444444' }
const card = {
  backgroundColor: '#fdfaf2',
  border: '1px solid #f0e6cf',
  borderRadius: '14px',
  padding: '16px 20px',
  margin: '0 0 20px',
}
const label = {
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
  color: '#8a7b4e',
  margin: '0 0 6px',
}
const quote = { fontSize: '15px', lineHeight: '1.6', margin: '0', color: '#444444' }
const link = { color: '#8a6d00', textDecoration: 'underline' }
const signature = { fontSize: '15px', lineHeight: '1.6', margin: '24px 0 0', color: '#444444' }
const hr = { borderColor: '#eeeeee', margin: '24px 0 12px' }
const footer = { fontSize: '12px', color: '#999999', margin: '0' }
