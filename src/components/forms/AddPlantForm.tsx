import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChangeEvent, useRef, useState } from "react";
import { LatLng } from "leaflet";

const formSchema = z.object({
    title: z.string().min(2).max(50),
    image: z.string().optional(),
})

function AddPlantForm({ position, className, ...rest }: AddPlantFormType) {
    const imageFieldRef = useRef<HTMLInputElement>(null);
    const imagePreviewRef = useRef<HTMLImageElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            image: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values, position)
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

type AddPlantFormType = {
    position: LatLng;
} & JSX.IntrinsicElements["div"];