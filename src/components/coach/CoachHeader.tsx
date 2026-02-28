export default function CoachHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{title}</h1>
        </div>
    )
}