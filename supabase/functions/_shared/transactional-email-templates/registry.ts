import type * as React from 'npm:react@18.3.1'
import { template as submissionNotification } from './submission-notification.tsx'
import { template as submissionConfirmation } from './submission-confirmation.tsx'

export interface TemplateEntry {
  // deno-lint-ignore no-explicit-any
  component: (props: any) => React.ReactElement
  // deno-lint-ignore no-explicit-any
  subject: string | ((data: any) => string)
  displayName?: string
  // deno-lint-ignore no-explicit-any
  previewData?: Record<string, any>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'submission-notification': submissionNotification,
  'submission-confirmation': submissionConfirmation,
}
