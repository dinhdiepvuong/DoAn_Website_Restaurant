import { Icon } from '@iconify/react'
import React, { useRef } from 'react'

type UploadImageType = {
    onChooseAvatar: (e: any) => void;
}

function UploadImage({ onChooseAvatar }: UploadImageType) {
    const chooseAvatarRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <div className="font_family_bold_italic font14 mt-4">Ảnh đại diện</div>
            <div
                onClick={() => chooseAvatarRef.current?.click()}
                className="choose_image_large cursor_pointer py-2 d-flex align-items-center flex-column mt-2"
            >
                <Icon
                    className="color_888 icon30x30"
                    icon="bi:cloud-arrow-up-fill"
                />
                <div className="font_family_regular">
                    <span className="color_primary">Chọn hình ảnh tải lên</span>
                </div>
                <div className="font_family_italic font12 mt-2">PNG, JPG</div>
            </div>
            <input
                hidden
                ref={chooseAvatarRef}
                type="file"
                onClick={(e: any) => {
                    e.target.value = null;
                }}
                accept=".png, .jpg"
                onChange={onChooseAvatar}
            />
        </>
    )
}

export default UploadImage