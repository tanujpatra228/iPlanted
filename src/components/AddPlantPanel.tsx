"use client";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { mediaQuery } from "@/lib/utils";
import AddPlantForm from "./forms/AddPlantForm";
import { LatLng } from "leaflet";

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
                            <AddPlantForm position={position} className="p-0 mt-2" />
                        </SheetContent>
                    </Sheet>
                ) : (
                    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
                        <DrawerContent className="z-[1000]">
                            <AddPlantForm position={position} />
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