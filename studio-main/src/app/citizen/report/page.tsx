
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Wrench,
  Trash2,
  Droplets,
  Lightbulb,
  ParkingCircle,
  Trees,
  Shield,
  Accessibility,
  School,
  Megaphone,
  Camera,
  Upload,
  ArrowLeft,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

const issueTypes = [
  { value: 'roads', label: 'Roads & Infrastructure', icon: Wrench },
  { value: 'sanitation', label: 'Sanitation & Cleanliness', icon: Trash2 },
  { value: 'water', label: 'Water Supply & Drainage', icon: Droplets },
  { value: 'electricity', label: 'Electricity & Street Lighting', icon: Lightbulb },
  { value: 'traffic', label: 'Traffic & Parking', icon: ParkingCircle },
  { value: 'environment', label: 'Environment & Public Spaces', icon: Trees },
  { value: 'safety', label: 'Safety & Security', icon: Shield },
  { value: 'accessibility', label: 'Accessibility', icon: Accessibility },
  { value: 'public-services', label: 'Public Services', icon: School },
  { value: 'grievances', label: 'Civic Grievances & Corruption', icon: Megaphone },
];

const reportSchema = z.object({
  issueType: z.string().min(1, 'Please select an issue type.'),
  photoDataUri: z.string().optional(),
  description: z.string().min(10, 'Please provide a detailed description of at least 10 characters.'),
  location: z.string().min(3, 'Please specify the location.'),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export default function ReportIssuePage() {
  const [step, setStep] = useState(1);
  const [useWebcam, setUseWebcam] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { toast } = useToast();

  const methods = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      issueType: '',
      description: '',
      location: '',
      photoDataUri: '',
    },
  });
  
  const { trigger, getValues, setValue } = methods;

  useEffect(() => {
    if (useWebcam) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
          });
          setUseWebcam(false);
        }
      };
      getCameraPermission();
    } else {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }
  }, [useWebcam, toast]);


  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger('issueType');
    } else if (step === 2) {
      isValid = true; // Photo is optional
    } else if (step === 3) {
      isValid = await trigger(['description', 'location']);
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUri = canvas.toDataURL('image/jpeg');
      setPhoto(dataUri);
      setValue('photoDataUri', dataUri);
      setUseWebcam(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        setPhoto(dataUri);
        setValue('photoDataUri', dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ReportFormValues) => {
    console.log(data);
    toast({
      title: 'Issue Reported Successfully!',
      description: 'Thank you for your contribution to the community.',
    });
    // Here you would typically call an AI flow or API
    // await verifyCitizenIssueReport(data);
    router.push('/citizen/dashboard');
  };
  
  const progress = Math.round(((step -1) / 3) * 100);

  return (
    <div className="flex min-h-screen flex-col items-center bg-muted/40 p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        <header className="mb-6">
            <Button asChild variant="ghost" size="sm" className="mb-4">
                <Link href="/citizen/dashboard"><ArrowLeft className="mr-2" /> Back to Dashboard</Link>
            </Button>
            <Progress value={progress} className="mb-2" />
            <h1 className="text-2xl font-bold">Report a New Civic Issue</h1>
            <p className="text-muted-foreground">
                Follow the steps to help us understand the problem.
            </p>
        </header>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Step 1: What type of issue is it?</CardTitle>
                  <CardDescription>Select the category that best describes the problem.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={methods.control}
                    name="issueType"
                    render={({ field }) => (
                      <FormItem>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                               <SelectTrigger>
                                <SelectValue placeholder="Select an issue type..." />
                               </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {issueTypes.map(type => (
                                    <SelectItem key={type.value} value={type.value}>
                                        <div className="flex items-center gap-2">
                                            <type.icon className="h-4 w-4" />
                                            {type.label}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                         </Select>
                         <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button onClick={handleNextStep} className="mt-6 w-full">Next</Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Add a Photo</CardTitle>
                  <CardDescription>A picture helps us understand the issue better. You can use your camera or upload a file.</CardDescription>
                </CardHeader>
                <CardContent>
                    {useWebcam ? (
                         <>
                            <div className="relative mb-4">
                                <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted playsInline />
                                {hasCameraPermission === false && (
                                     <Alert variant="destructive" className="mt-4">
                                        <AlertTitle>Camera Access Required</AlertTitle>
                                        <AlertDescription>
                                            Please allow camera access to use this feature. You might need to change permissions in your browser settings.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleCapture} className="w-full" disabled={!hasCameraPermission}>Capture Photo</Button>
                                <Button variant="secondary" onClick={() => setUseWebcam(false)} className="w-full">Cancel</Button>
                            </div>
                         </>
                    ) : photo ? (
                        <div className="mb-4 text-center">
                            <p className="font-semibold mb-2">Photo Preview:</p>
                            <img src={photo} alt="Issue" className="rounded-md w-full max-w-sm mx-auto" />
                            <Button variant="link" onClick={() => { setPhoto(null); setValue('photoDataUri', undefined)}}>Remove Photo</Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button variant="outline" onClick={() => setUseWebcam(true)}><Camera className="mr-2"/> Use Webcam</Button>
                            <Button variant="outline" onClick={() => fileInputRef.current?.click()}><Upload className="mr-2"/> Upload from Device</Button>
                            <Input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                        </div>
                    )}
                  <canvas ref={canvasRef} className="hidden"></canvas>
                  <div className="flex gap-2 mt-6">
                    <Button onClick={handlePrevStep} variant="outline" className="w-full">Back</Button>
                    <Button onClick={handleNextStep} className="w-full">Next</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Step 3: Provide Details</CardTitle>
                        <CardDescription>Describe the issue and tell us where to find it.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                             <FormField
                                control={methods.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="e.g., There's a large pothole on the main road just after the traffic light..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                             <FormField
                                control={methods.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Near 123 Main St, Anytown" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Be as specific as possible. You can provide a street address, cross-streets, or a landmark.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                        <div className="flex gap-2 mt-6">
                            <Button onClick={handlePrevStep} variant="outline" className="w-full">Back</Button>
                            <Button onClick={() => trigger(['description', 'location']).then(isValid => isValid && methods.handleSubmit(onSubmit)())} className="w-full">Submit Report</Button>
                        </div>
                    </CardContent>
                 </Card>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

