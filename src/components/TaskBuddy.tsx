import { LuClipboardList } from 'react-icons/lu';

interface TaskBuddyProps {
    className?: string;
}

export const TaskBuddy = ({ className }: TaskBuddyProps) => {
    return (
        <div className={className}>
            <LuClipboardList size={27} />
            <h1>TaskBuddy</h1>
        </div>
    )
}


