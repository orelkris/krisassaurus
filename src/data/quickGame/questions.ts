import type { HandoutQuestion } from '@/types/quickGame'

// Each game's handout, in the order it is printed (ask-yourself.pdf)
export const handoutQuestions: Record<string, HandoutQuestion[]> = {
  'minds-on': [
    {
      id: 'best-interests',
      text: 'Is your conduct in the best interests of the student and connected to your professional duties?',
    },
    {
      id: 'known-approved',
      text: 'Are your activities known to and/or approved by supervisors and/or parents?',
    },
    {
      id: 'approved-platforms',
      text: 'Are you using board/employer approved communication platforms and following approved policies?',
    },
    {
      id: 'observed',
      text: 'Are you working with students in areas that can be observed by others (that is, not behind closed doors)? Is a third party present or aware of the meeting?',
    },
    {
      id: 'vulnerable-students',
      text: 'Do I know what my employer’s policy is with respect to getting help for vulnerable students and am I mindful of the need to respect professional boundaries?',
    },
    {
      id: 'transporting',
      text: 'Are you transporting students in emergency circumstances only?',
    },
    {
      id: 'discomfort',
      text: 'Would your actions contribute to their level of discomfort or pose a risk to the personal integrity or security of a student?',
    },
    {
      id: 'professional-relationship',
      text: 'Can your actions reasonably be regarded as conduct that maintains your professional relationship with your students?',
    },
  ],
}
