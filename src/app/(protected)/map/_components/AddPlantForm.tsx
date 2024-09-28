"use client"
import { cn } from "@/lib/utils";
import { addNewPlantSchema, AddPlantFormType } from "@/schema/newPlantSchama";
import { zodResolver } from "@hookform/resolvers/zod";
import { LatLng } from "leaflet";
import { ChangeEvent, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { addNewPlant } from "@/services/plant.services";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

function AddPlantForm({ position, className, onSubmitCompleted, ...rest }: AddPlantFormPropsType) {
    const imageFieldRef = useRef<HTMLInputElement>(null);
    const imagePreviewRef = useRef<HTMLImageElement>(null);
    const router = useRouter();
    const { isAuth } = useAuth();
    const { toast } = useToast();
    const addPlantMutation = useMutation({ mutationKey: ['addPlant'], mutationFn: addNewPlant });
    
    const form = useForm<AddPlantFormType>({
        resolver: zodResolver(addNewPlantSchema),
        defaultValues: {
            title: "",
            coordinates: { lat: position.lat, lng: position.lng },
            image: null,
            notes: "",
        },
    });

    async function onSubmit(values: AddPlantFormType) {
        try {
            const response = await addPlantMutation.mutateAsync(values);
        } catch (error) {
            console.log('error', error);
        }
    }

    function showImagePreview(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target?.files) return;
        const file = e.target.files[0];
        if (file) {
            form.setValue('image', file);
            const url = URL.createObjectURL(file);
            if (imagePreviewRef.current?.src) {
                imagePreviewRef.current.src = url;
            }
        }
    }

    useEffect(() => {
        // Show tost message on mutation change
        if (addPlantMutation.isPending) {
            toast({
                title: "Planting...",
                description: "Saving Plant Info",
            });
        } else if (addPlantMutation.isSuccess) {
            toast({
                variant: "success",
                title: "Plantd",
                description: "Thank You!",
            });
            onSubmitCompleted();
        } else if (addPlantMutation.isError) {
            toast({
                variant: "destructive",
                title: "Failed",
                description: "Something went wrong, Please try again",
            });
        }
    }, [addPlantMutation.isPending, addPlantMutation.isSuccess, addPlantMutation.isError]);

    if(!isAuth){
        return (
            <div className={cn("p-4 h-full flex justify-center items-center", className)} {...rest}>
                <div className="py-8 flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h3 className="text-2xl font-bold tracking-tight">
                            Signin Required
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Start growing your plant collection by signing in.
                        </p>
                        <Button className="mt-4" onClick={() => router.push('/login')}>Signin</Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={cn("p-4", className)} {...rest}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <label htmlFor="image" className={`block w-full h-40 ${!!form.formState.errors?.image ? 'bg-destructive' : ''} bg-slate-200 rounded-md`}>
                        <img src="" alt="Upload Plant Image" className="w-full h-full object-cover flex justify-center items-center" ref={imagePreviewRef} />
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="hidden"
                            ref={imageFieldRef}
                            onChange={showImagePreview}
                        />
                    </label>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Plant Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Anything that is special to you..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={addPlantMutation.isPending}>
                        {addPlantMutation.isPending ? 'Planting...' : 'Plant'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default AddPlantForm;

type AddPlantFormPropsType = {
    position: LatLng;
    onSubmitCompleted: () => void;
} & JSX.IntrinsicElements["div"];