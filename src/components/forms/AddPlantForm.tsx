"use client"
import { cn } from "@/lib/utils";
import { addNewPlantSchema, AddPlantFormType } from "@/schema/newPlantSchama";
import { zodResolver } from "@hookform/resolvers/zod";
import { LatLng } from "leaflet";
import { ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function AddPlantForm({ position, className, ...rest }: AddPlantFormPropsType) {
    const imageFieldRef = useRef<HTMLInputElement>(null);
    const imagePreviewRef = useRef<HTMLImageElement>(null);
    const router = useRouter();
    const { isAuth } = useAuth();

    const form = useForm<AddPlantFormType>({
        resolver: zodResolver(addNewPlantSchema),
        defaultValues: {
            title: "",
            image: "",
        },
    });

    async function onSubmit(values: AddPlantFormType) {
        if (!values.title) return;
        try {
            console.log(values, position);
            const res = await fetch("/api/plant", {
                method: "POST",
                body: JSON.stringify({
                    title: values.title,
                    coordinates: position,
                })
            });
            const data = await res.json();
            console.log('data', data);
        } catch (error) {
            console.log('error', error);
        }
    }

    function showImagePreview(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target?.files) return;
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            form.setValue("image", url);
            if (imagePreviewRef.current?.src) {
                imagePreviewRef.current.src = url;
            }
        }
    }

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
                    <label htmlFor="image" className="block w-full h-40 bg-slate-300 rounded-md">
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default AddPlantForm;

type AddPlantFormPropsType = {
    position: LatLng;
} & JSX.IntrinsicElements["div"];