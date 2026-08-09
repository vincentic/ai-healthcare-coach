import fs from 'fs'
import path from 'path'
import { marked } from 'marked'
import PracticeWorkspace from '@/components/PracticeWorkspace'

const DOC_TABS = [
  {
    key: 'mentoring',
    label: 'Mentoring Modules',
    file: 'language-mentoring-modules.md',
  },
  {
    key: 'value',
    label: 'Value Flywheel',
    file: 'value-creation-flywheel.md',
  },
  {
    key: 'guide',
    label: 'Learning Guide',
    file: 'guide.md',
  },
  {
    key: 'origin',
    label: 'Value Notes',
    file: 'value.md',
  },
]

function loadDocTabs() {
  const docsDir = path.join(process.cwd(), '..', 'docs')

  return DOC_TABS.map((tab) => {
    const source = fs.readFileSync(path.join(docsDir, tab.file), 'utf8')
    const firstHeading = source.match(/^#\s+(.+)$/m)

    return {
      ...tab,
      title: firstHeading?.[1] || tab.label,
      html: marked.parse(source, {
        async: false,
        gfm: true,
      }),
    }
  })
}

export default function HomePage() {
  return <PracticeWorkspace docs={loadDocTabs()} />
}
