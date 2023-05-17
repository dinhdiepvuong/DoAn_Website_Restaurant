import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import themeSlice, { toastSelector } from '../redux/slices/themeSlice';
import showToast from '../utils/toast'

export default function useShowToast() {
    const toast = useSelector(toastSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        if (toast.content.length > 0) {
            showToast(toast.content, toast.type);
            dispatch(
                themeSlice.actions.showToast({
                    content: "",
                    type: "success",
                })
            );
        }
    }, [toast]);
    useEffect(() => {

    })
}