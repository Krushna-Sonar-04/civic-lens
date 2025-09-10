
'use client';

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
import { Badge } from '@/components/ui/badge';
import { PlusCircle, BarChart, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '@/components/footer';

const issues = [
  {
    id: 'IS-1',
    title: 'Large Pothole',
    type: 'Pothole',
    status: 'In Progress',
    date: '2023-10-27',
  },
  {
    id: 'IS-2',
    title: 'Flickering Streetlight',
    type: 'Streetlight',
    status: 'Resolved',
    date: '2023-10-25',
  },
  {
    id: 'IS-3',
    title: 'Graffiti on Park Bench',
    type: 'Graffiti',
    status: 'Reported',
    date: '2023-10-28',
  },
   {
    id: 'IS-4',
    title: 'Broken Swing at Playground',
    type: 'Park Maintenance',
    status: 'Resolved',
    date: '2023-09-15',
  },
];

const statusStyles: { [key: string]: string } = {
  Reported: 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Resolved: 'bg-green-100 text-green-800',
};


export default function CitizenDashboard() {

  const totalIssues = issues.length;
  const inProgressIssues = issues.filter(issue => issue.status === 'In Progress').length;
  const resolvedIssues = issues.filter(issue => issue.status === 'Resolved').length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-2xl font-bold">Welcome, Citizen!</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild size="sm" className="h-8 gap-1">
              <Link href="/citizen/report">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Report New Issue
                </span>
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
                <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Reports
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalIssues}</div>
                <p className="text-xs text-muted-foreground">
                  Your contribution to the community
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  In Progress
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inProgressIssues}</div>
                <p className="text-xs text-muted-foreground">
                  Issues currently being addressed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resolvedIssues}</div>
                <p className="text-xs text-muted-foreground">
                    Issues you helped fix
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>My Reported Issues</CardTitle>
              <CardDescription>
                A list of all the civic issues you've reported.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues.map(issue => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium">{issue.title}</TableCell>
                      <TableCell>{issue.type}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusStyles[issue.status] || ''}>{issue.status}</Badge>
                      </TableCell>
                      <TableCell>{issue.date}</TableCell>
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
