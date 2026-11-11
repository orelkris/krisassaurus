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
    <article className="card col-stack text-sm leading-relaxed">
      <span
        className="text-xs font-bold uppercase tracking-wider"
        style={{ color }}
      >
        Activity {String(number).padStart(2, '0')}
      </span>
      {task.text && (
        <p className="max-w-read">
          <MathText text={task.text} />
        </p>
      )}
      {task.items.length > 0 && (
        <ul className="col-tight max-w-read list-disc pl-md text-sm">
          {task.items.map((item) => (
            <li key={item}>
              <MathText text={item} />
            </li>
          ))}
        </ul>
      )}
      {task.after && (
        <p className="max-w-read">
          <MathText text={task.after} />
        </p>
      )}
    </article>
  )
}

export default TaskCard
