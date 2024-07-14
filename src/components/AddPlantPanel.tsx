"use client";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { mediaQuery } from "@/lib/utils";

function AddPlantPanel({ isOpen, onOpenChange }: AddPlantPanelType) {
    const isDesktop = mediaQuery('(min-width: 768px)');
    const handleOpenChange = (open: boolean) => {
        onOpenChange();
    }
    
    return (
        <>
            {
                isDesktop ? (
                    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
                        <SheetContent side="left" className="z-[1000]">
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                ) : (
                    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
                        <DrawerContent className="z-[1000]">
                            <DrawerHeader>
                                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                <DrawerDescription>This action cannot be undone.</DrawerDescription>
                            </DrawerHeader>
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
    onOpenChange: () => void
}