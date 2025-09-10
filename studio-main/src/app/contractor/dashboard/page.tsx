
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle, ClipboardList, Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/footer';

const jobs = [
    {
        id: 'JOB-101',
        type: 'Pothole',
        location: '123 Main St',
        status: 'New',
    },
    {
        id: 'JOB-102',
        type: 'Streetlight Repair',
        location: 'Elm & Oak Ave',
        status: 'In Progress',
    },
    {
        id: 'JOB-103',
        type: 'Graffiti Removal',
        location: 'City Park',
        status: 'Completed',
    }
];

const statusStyles: { [key: string]: string } = {
  New: 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-green-100 text-green-800',
};


export default function ContractorDashboard() {
    const assignedJobs = jobs.filter(job => job.status !== 'Completed').length;
    const completedJobs = jobs.filter(job => job.status === 'Completed').length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-2xl font-bold">Welcome, Contractor!</h1>
           <div className="ml-auto flex items-center gap-2">
                <Button asChild size="sm" variant="outline">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assigned Jobs</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignedJobs}</div>
                <p className="text-xs text-muted-foreground">
                  New and in-progress tasks
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedJobs}</div>
                 <p className="text-xs text-muted-foreground">
                  +5 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5.0</div>
                <p className="text-xs text-muted-foreground">
                    Based on citizen feedback
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>My Assigned Jobs</CardTitle>
                    <CardDescription>
                        A list of your current and new job assignments.
                    </CardDescription>
                </div>
                 <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="#">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                     <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map(job => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.id}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusStyles[job.status]}>{job.status}</Badge>
                      </TableCell>
                       <TableCell className="text-right">
                        <Button asChild size="sm" variant="outline">
                            <Link href={`/contractor/jobs/${job.id}`}>View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
}
    
