import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

/** Liste d'accordéons « une rubrique ouverte à la fois », avec titre, résumé et contenu. */
export function DisclosureList({ value, onValueChange, children }) {
  return (
    <Accordion.Root type="single" collapsible value={value} onValueChange={onValueChange} className="rule">
      {children}
    </Accordion.Root>
  );
}

export function DisclosureItem({ id, title, summary, children }) {
  return (
    <Accordion.Item value={id} id={`topic-${id}`} className="border-b border-line">
      <Accordion.Header className="m-0">
        <Accordion.Trigger className="group flex min-h-[3.75rem] w-full items-center justify-between gap-4 py-3 text-left">
          <span className="min-w-0">
            <span className="block text-[1.0625rem] font-semibold leading-snug">{title}</span>
            {summary ? <span className="small mt-0.5 block">{summary}</span> : null}
          </span>
          <ChevronDown
            size={20}
            strokeWidth={1.75}
            aria-hidden
            className="shrink-0 text-ink-2 transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="accordion-content overflow-hidden">
        <div className="space-y-3 pb-5 pr-8">{children}</div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
