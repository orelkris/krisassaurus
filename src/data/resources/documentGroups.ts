import type { DocumentGroup, DocumentGroupId } from '@/types/resources'

// The sidebar and the Ministry documents page list the groups in this order
export const documentGroups: DocumentGroup[] = [
  { id: 'curriculum', name: 'Curriculum' },
  { id: 'assessment', name: 'Assessment' },
]

export function getDocumentGroup(id: string): DocumentGroup | undefined {
  return documentGroups.find((group) => group.id === id)
}

export function isDocumentGroupId(id: string | null): id is DocumentGroupId {
  return documentGroups.some((group) => group.id === id)
}
