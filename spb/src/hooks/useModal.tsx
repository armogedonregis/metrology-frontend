import { useState } from "react";

type DeleteProps<T> = {
    open: boolean;
    modalChoise: T | undefined;
    onOpenModal: (e?: T) => void;
    onCloseModal: () => void;
}

export function useModal<T>(): DeleteProps<T> {
    const [open, setOpen] = useState<boolean>(false);
    const [modalChoise, setModalChoise] = useState<T | undefined>();

    const onOpenModal = (item: T | undefined) => {
        setOpen(true)
        setModalChoise(item)
    };

    const onCloseModal = () => setOpen(false);

    return {
        open, modalChoise, onOpenModal, onCloseModal
    }
};