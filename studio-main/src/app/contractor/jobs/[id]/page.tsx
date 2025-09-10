
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Camera, CheckCircle, Upload } from 'lucide-react';
import Link from 'next/link';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const job = {
    id: 'JOB-101',
    type: 'Pothole',
    location: '123 Main St, Anytown',
    status: 'In Progress',
    description: 'A large and deep pothole is causing significant traffic disruption and potential vehicle damage on a busy main road. It needs urgent repair.',
    reportedBy: 'Citizen-007',
    reportedDate: '2024-05-20',
    priority: 'High',
    citizenImage: 'https://picsum.photos/seed/pothole/600/400'
};

const statusStyles: { [key: string]: string } = {
    New: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Resolved: 'bg-orange-100 text-orange-800',
    Completed: 'bg-green-100 text-green-800',
};

export default function JobDetailsPage({ params }: { params: { id: string } }) {
    const [status, setStatus] = useState(job.status);
    const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
    const [afterPhoto, setAfterPhoto] = useState<string | null>(null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setter(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    }


  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/40 p-4 sm:p-6">
        <div className="w-full max-w-4xl">
             <header className="mb-6">
                <Button asChild variant="ghost" size="sm" className="mb-4">
                    <Link href="/contractor/dashboard"><ArrowLeft className="mr-2" /> Back to Dashboard</Link>
                </Button>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Job Details: {job.id}</h1>
                        <p className="text-muted-foreground">Review the details and update the status of the job.</p>
                    </div>
                    <Badge variant="outline" className={`${statusStyles[status]} text-lg px-4 py-2`}>{status}</Badge>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Issue Information</CardTitle>
                        <CardDescription>Details of the reported civic issue.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div>
                            <h3 className="font-semibold">Type</h3>
                            <p>{job.type}</p>
                       </div>
                        <div>
                            <h3 className="font-semibold">Location</h3>
                            <p>{job.location}</p>
                       </div>
                       <div>
                            <h3 className="font-semibold">Description</h3>
                            <p>{job.description}</p>
                       </div>
                        <div>
                            <h3 className="font-semibold">Priority</h3>
                            <Badge variant={job.priority === 'High' ? 'destructive' : 'secondary'}>{job.priority}</Badge>
                       </div>
                       <div>
                            <h3 className="font-semibold">Reported By</h3>
                            <p>{job.reportedBy} on {job.reportedDate}</p>
                       </div>
                        <div>
                            <h3 className="font-semibold">Photo from Citizen</h3>
                            <Image src={job.citizenImage} alt="Citizen's photo of the issue" width={600} height={400} className="rounded-md mt-2" />
                       </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Your Actions</CardTitle>
                        <CardDescription>Update job status and upload proof of work.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label className="font-semibold" htmlFor="status-select">Update Status</label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="status-select" className="mt-2">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Resolved">Mark as Resolved</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                             <h3 className="font-semibold">Upload Work Photos</h3>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-muted-foreground">Before Photo</label>
                                    {beforePhoto ? (
                                        <div className="mt-2">
                                            <Image src={beforePhoto} alt="Before work" width={300} height={200} className="rounded-md" />
                                            <Button variant="link" size="sm" onClick={() => setBeforePhoto(null)}>Remove</Button>
                                        </div>
                                    ) : (
                                         <label className="mt-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 hover:bg-gray-100">
                                            <Camera className="h-8 w-8 text-gray-400" />
                                            <span className="text-sm text-gray-500">Click to upload</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setBeforePhoto)} />
                                        </label>
                                    )}
                                </div>
                                 <div>
                                    <label className="text-sm text-muted-foreground">After Photo</label>
                                    {afterPhoto ? (
                                        <div className="mt-2">
                                            <Image src={afterPhoto} alt="After work" width={300} height={200} className="rounded-md" />
                                            <Button variant="link" size="sm" onClick={() => setAfterPhoto(null)}>Remove</Button>
                                        </div>
                                    ) : (
                                         <label className="mt-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 hover:bg-gray-100">
                                            <Camera className="h-8 w-8 text-gray-400" />
                                            <span className="text-sm text-gray-500">Click to upload</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setAfterPhoto)} />
                                        </label>
                                    )}
                                </div>
                             </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full" disabled={status !== 'Resolved' || !beforePhoto || !afterPhoto}>
                           <CheckCircle className="mr-2 h-4 w-4" />
                           Submit for Review
                         </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}
