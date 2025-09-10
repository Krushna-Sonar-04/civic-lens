
'use client';

import {
  Bell,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users,
  Users2,
  Wrench,
  ClipboardList,
  CheckCheck,
  Trash2,
  Droplets,
  Lightbulb,
  ParkingCircle,
  Trees,
  Shield,
  Accessibility,
  School,
  Megaphone,
} from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { useEffect, useState } from 'react';


const reports = [
  {
    id: 1,
    date: '2024-05-20',
    location: '123 Main St, Anytown',
    description: 'Large pothole causing traffic issues.',
    issueType: 'Roads & Infrastructure',
    priority: 'High',
    status: 'Pending',
    contractor: 'Unassigned',
    imageUrl: 'https://picsum.photos/seed/pothole/40/40',
  },
  {
    id: 2,
    date: '2024-05-18',
    location: 'Elm Street Park',
    description: 'Broken swing in the playground area.',
    issueType: 'Environment & Public Spaces',
    priority: 'Medium',
    status: 'In Progress',
    contractor: 'GreenScape Inc.',
    imageUrl: 'https://picsum.photos/seed/swing/40/40',
  },
  {
    id: 3,
    date: '2024-05-15',
    location: 'Oak Avenue & 4th St',
    description: 'Streetlight is out, area is very dark at night.',
    issueType: 'Electricity & Street Lighting',
    priority: 'High',
    status: 'Resolved',
    contractor: 'Spark Electrical',
    imageUrl: 'https://picsum.photos/seed/streetlight/40/40',
  },
  {
    id: 4,
    date: '2024-05-21',
    location: 'Central Market',
    description: 'Overflowing trash can, needs immediate attention.',
    issueType: 'Sanitation & Cleanliness',
    priority: 'Medium',
    status: 'Pending',
    contractor: 'Unassigned',
    imageUrl: 'https://picsum.photos/seed/trash/40/40',
  },
    {
    id: 5,
    date: '2024-05-22',
    location: 'Community Hospital',
    description: 'Lack of wheelchair ramp at the main entrance.',
    issueType: 'Accessibility',
    priority: 'High',
    status: 'In Progress',
    contractor: 'BuildRight',
    imageUrl: 'https://picsum.photos/seed/ramp/40/40',
  },
];

const statusVariant: {[key: string]: "default" | "secondary" | "destructive"} = {
  Pending: 'secondary',
  'In Progress': 'default',
  Resolved: 'destructive'
}

export default function AdminDashboard() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null;
  }

  const totalReports = reports.length;
  const pendingReports = reports.filter((r) => r.status === 'Pending').length;
  const inProgressReports = reports.filter((r) => r.status === 'In Progress').length;
  const resolvedReports = reports.filter((r) => r.status === 'Resolved').length;
  const completedReports = reports.filter((r) => r.status === 'Completed').length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-full items-center justify-start rounded-lg px-3 text-lg font-bold text-primary-foreground "
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/255px-Flag_of_India.svg.png"
              alt="Indian Flag"
              width={24}
              height={24}
              className="mr-2"
            />
            Civic Admin IN
          </Link>
          <Button
            variant="primary"
            className="w-full justify-start mt-5 bg-primary text-primary-foreground"
            asChild
          >
            <Link href="#">
              <ClipboardList className="mr-2 h-4 w-4" /> Reports
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            asChild
          >
            <Link href="#">
              <Users className="mr-2 h-4 w-4" /> Contractors
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            asChild
          >
            <Link href="#">
              <CheckCheck className="mr-2 h-4 w-4" /> Finished Work
            </Link>
          </Button>
           <Button
            variant="ghost"
            className="w-full justify-start"
            asChild
          >
            <Link href="#">
              <Users2 className="mr-2 h-4 w-4" /> Users
            </Link>
          </Button>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Button
              variant="ghost"
              className="w-full justify-start"
              asChild
            >
              <Link href="#">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Link>
            </Button>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Civic Admin</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ClipboardList className="h-5 w-5" />
                  Reports
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Contractors
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <CheckCheck className="h-5 w-5" />
                  Finished Work
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Users
                </Link>
                <Link
                  href="#"
                  className="mt-auto flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter by location or keyword..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="https://picsum.photos/36/36"
                  width={36}
                  height={36}
                  alt="Avatar"
                  data-ai-hint="user avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-5">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Reports</CardDescription>
                <CardTitle className="text-4xl">{totalReports}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pending</CardDescription>
                <CardTitle className="text-4xl">{pendingReports}</CardTitle>
              </CardHeader>
            </Card>
             <Card>
              <CardHeader className="pb-2">
                <CardDescription>In Progress</CardDescription>
                <CardTitle className="text-4xl">{inProgressReports}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Resolved</CardDescription>
                <CardTitle className="text-4xl">{resolvedReports}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Completed</CardDescription>
                <CardTitle className="text-4xl">{completedReports}</CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Card>
             <CardHeader className="px-7">
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                A comprehensive list of all reported civic issues.
              </CardDescription>
               <div className="flex items-center gap-2 pt-4">
                <Button variant="outline" size="sm" className='h-8 gap-1'>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Create New Report
                    </span>
                </Button>
                <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className='h-8 gap-1'>
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter by issue
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem><Wrench className="mr-2 h-4 w-4" />Roads & Infrastructure</DropdownMenuItem>
                    <DropdownMenuItem><Trash2 className="mr-2 h-4 w-4" />Sanitation & Cleanliness</DropdownMenuItem>
                    <DropdownMenuItem><Droplets className="mr-2 h-4 w-4" />Water Supply & Drainage</DropdownMenuItem>
                    <DropdownMenuItem><Lightbulb className="mr-2 h-4 w-4" />Electricity & Street Lighting</DropdownMenuItem>
                    <DropdownMenuItem><ParkingCircle className="mr-2 h-4 w-4" />Traffic & Parking</DropdownMenuItem>
                    <DropdownMenuItem><Trees className="mr-2 h-4 w-4" />Environment & Public Spaces</DropdownMenuItem>
                    <DropdownMenuItem><Shield className="mr-2 h-4 w-4" />Safety & Security</DropdownMenuItem>
                    <DropdownMenuItem><Accessibility className="mr-2 h-4 w-4" />Accessibility</DropdownMenuItem>
                    <DropdownMenuItem><School className="mr-2 h-4 w-4" />Public Services</DropdownMenuItem>
                    <DropdownMenuItem><Megaphone className="mr-2 h-4 w-4" />Civic Grievances & Corruption</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className='h-8 gap-1'>
                      <ListFilter className="h-3.5 w-3.5" />
                       <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter by priority
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>High</DropdownMenuItem>
                    <DropdownMenuItem>Medium</DropdownMenuItem>
                    <DropdownMenuItem>Low</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className='h-8 gap-1'>
                      <ListFilter className="h-3.5 w-3.5" />
                       <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter by status
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>In Progress</DropdownMenuItem>
                    <DropdownMenuItem>Resolved</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Issue Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contractor</TableHead>
                    <TableHead><span className='sr-only'>Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Image
                          src={report.imageUrl}
                          width={40}
                          height={40}
                          alt="Issue image"
                          className="rounded-md"
                        />
                      </TableCell>
                      <TableCell>{report.location}</TableCell>
                      <TableCell>{report.description}</TableCell>
                      <TableCell>{report.issueType}</TableCell>
                      <TableCell>
                        <Badge variant={report.priority === 'High' ? 'destructive' : 'secondary'}>{report.priority}</Badge>
                      </TableCell>
                       <TableCell>
                        <Badge variant={statusVariant[report.status]}>{report.status}</Badge>
                      </TableCell>
                      <TableCell>{report.contractor}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Assign Contractor</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{reports.length}</strong> of <strong>{reports.length}</strong> reports
                </div>
            </CardFooter>
          </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
