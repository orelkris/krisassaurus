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
    <article className="card col-stack text-[14.5px] leading-relaxed">
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
        <ul className="col-tight max-w-[68ch] list-disc pl-[18px] text-sm">
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
