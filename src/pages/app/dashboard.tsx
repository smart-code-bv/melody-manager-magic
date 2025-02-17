import { FC } from 'react'
import Calendar from '@/components/calendar/Calendar'

export const Dashboard: FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>

            {/* Dashboard Content */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Quick Stats */}
                <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium">Upcoming Lessons</h3>
                    <p className="mt-2 text-2xl font-bold">0</p>
                </div>
                <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium">Active Students</h3>
                    <p className="mt-2 text-2xl font-bold">0</p>
                </div>
                <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium">This Week's Income</h3>
                    <p className="mt-2 text-2xl font-bold">$0</p>
                </div>
                <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium">Pending Tasks</h3>
                    <p className="mt-2 text-2xl font-bold">0</p>
                </div>
            </div>

            {/* Calendar */}
            <div className="rounded-lg border">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Schedule</h2>
                </div>
                <div className="p-4">
                    <Calendar />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
