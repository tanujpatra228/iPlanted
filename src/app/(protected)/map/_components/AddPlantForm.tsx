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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewPlant } from "@/services/plant.services";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { PLANT_TYPE } from "@/consts";
import { getPlantTypeLabel } from "@/helpers";

function AddPlantForm({ position, className, onSubmitCompleted, ...rest }: AddPlantFormPropsType) {
    const imageFieldRef = useRef<HTMLInputElement>(null);
    const imagePreviewRef = useRef<HTMLImageElement>(null);
    const router = useRouter();
    const { isAuth } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const addPlantMutation = useMutation({ mutationKey: ['addPlant'], mutationFn: addNewPlant });
    
    const form = useForm<AddPlantFormType>({
        resolver: zodResolver(addNewPlantSchema),
        defaultValues: {
            title: "",
            coordinates: { lat: position.lat, lng: position.lng },
            image: null,
            notes: "",
            plantType: 'Outdoor',
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
            form.clearErrors("image");
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
                title: "Almost there",
                description: "🌳 Your plant is being added!",
            });
        } else if (addPlantMutation.isSuccess) {
            toast({
                variant: "success",
                title: "Great job!",
                description: "🌱 Keep growing your green collection.",
            });
            queryClient.refetchQueries({ queryKey: ['nearByPlants'] });
            onSubmitCompleted();
        } else if (addPlantMutation.isError) {
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: "🍁 Let's try planting that again.",
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
                    <div>
                        <label htmlFor="image" className={`block w-full h-40 ${!!form.formState.errors?.image ? 'bg-destructive' : ''} bg-slate-200 rounded-md`}>
                            <img src="" alt="Upload Plant Image" className=" w-full h-full object-cover flex justify-center items-center invisible opacity-0 transition duration-300 ease-in-out" ref={imagePreviewRef} style={{ visibility: imagePreviewRef.current?.src ? 'visible' : 'hidden', opacity: imagePreviewRef.current?.src ? 1 : 0 }}/>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                className="hidden"
                                ref={imageFieldRef}
                                onChange={showImagePreview}
                            />
                        </label>
                        {
                            // Image error message
                            (!!form.formState.errors?.image?.message && typeof form.formState.errors?.image?.message === "string")
                            &&
                            <p className="text-sm font-medium text-destructive">{form.formState.errors?.image?.message}</p>
                        }
                    </div>
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
                        name="plantType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={`${field.value}`}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder={'Outdoor'} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="z-[1000]">
                                        {
                                            Object.values(PLANT_TYPE).map((type) => {
                                                return (
                                                    <SelectItem key={type.code} value={`${type.label}`}>{type.label}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectContent>
                                </Select>
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
                        {addPlantMutation.isPending ? 'Taking root...' : 'Plant'}
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