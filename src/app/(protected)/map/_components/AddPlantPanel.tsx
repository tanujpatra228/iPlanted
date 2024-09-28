"use client";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { mediaQuery } from "@/lib/utils";
import { LatLng } from "leaflet";
import AddPlantForm from "./AddPlantForm";

function AddPlantPanel({ isOpen, onOpenChange, position }: AddPlantPanelType) {
    const isDesktop = mediaQuery('(min-width: 768px)');
    const handleOpenChange = (open: boolean) => {
        onOpenChange(open);
    }

    return (
        <>
            {
                isDesktop ? (
                    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
                        <SheetContent side="left" className="z-[1000]">
                            <SheetTitle title="Add Plant" />
                            <AddPlantForm position={position} className="p-0 mt-2" onSubmitCompleted={() => handleOpenChange(false)} />
                        </SheetContent>
                    </Sheet>
                ) : (
                    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
                        <DrawerContent className="z-[1000]">
                            <DrawerTitle title="Add Plant" />
                            <AddPlantForm position={position} onSubmitCompleted={() => handleOpenChange(false)} />
                        </DrawerContent>
                    </Drawer>
                )
            }
        </>
    )
}

export default AddPlantPanel;

type AddPlantPanelType = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    position: LatLng
}