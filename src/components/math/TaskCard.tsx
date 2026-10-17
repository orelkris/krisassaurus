import type { SampleTask } from '@/types/math'
import MathText from './MathText'

interface TaskCardProps {
  task: SampleTask
  number: number
  color: string
}

// A ministry sample task as plain text, before it is rewritten as an activity
function TaskCard({ task, number, color }: TaskCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-[14px] border border-gray-200 px-5 pt-4 pb-[18px] text-[14.5px] leading-relaxed">
      <span
        className="text-[11px] font-bold uppercase tracking-wider"
        style={{ color }}
      >
        Activity {String(number).padStart(2, '0')}
      </span>
      {task.text && (
        <p className="max-w-[68ch]">
          <MathText text={task.text} />
        </p>
      )}
      {task.items.length > 0 && (
        <ul className="flex max-w-[68ch] list-disc flex-col gap-1 pl-[18px] text-sm">
          {task.items.map((item) => (
            <li key={item}>
              <MathText text={item} />
            </li>
          ))}
        </ul>
      )}
      {task.after && (
        <p className="max-w-[68ch]">
          <MathText text={task.after} />
        </p>
      )}
    </article>
  )
}

export default TaskCard
