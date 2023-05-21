import { Icon } from '@iconify/react';
import React, { useMemo } from 'react'
import styled from 'styled-components';
import { currencyFormat } from '../../utils/format';

type ProductItemProps = {
    product: any;
    chosenProducts: any[];
    handleChoose: (product: any, quantity: number) => void;
};

const Container = styled.div`
    background-color: #fff;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;

function ProductItem({ product, chosenProducts, handleChoose }: ProductItemProps) {

    const chosen = useMemo(() => {
        const result = chosenProducts.find((item: any) => item?.product?.id === product.id);

        return {
            isChosen: Boolean(result),
            quantity: result?.quantity,
        }
    }, [chosenProducts])

    return (
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 p-2">
            <Container className="box_shadow_card border_radius_10 product_item_order">
                <img src={product.avatar} style={{ borderRadius: '10px 10px 0px 0px', height: '220px', objectFit: 'cover' }} alt="product" />
                <div className="py-2 px-3">
                    <div className="font16 font_family_bold">
                        {currencyFormat(product.price)}
                    </div>
                    <div className="mt-2 font14 font_family_italic color_888">
                        {product.name}
                    </div>
                </div>

                {chosen?.isChosen ? (
                    <div className="button_change_quantity font_family_bold_italic font18">
                        <button type='button' onClick={() => handleChoose(product, chosen.quantity - 1)} className="btn">
                            <Icon icon="akar-icons:minus" />
                        </button>
                        {chosen.quantity}
                        <button type='button' onClick={() => handleChoose(product, chosen.quantity + 1)} className="btn">
                            <Icon icon="akar-icons:plus" />
                        </button>
                    </div>
                ) : (
                    <button onClick={() => handleChoose(product, 1)} className="btn button_add_to_cart">
                        <div></div>
                        <div className="font14 font_family_bold_italic">Chọn món</div>
                        <Icon icon="akar-icons:plus" />
                    </button>
                )}
            </Container>
        </div>
    )
}

export default ProductItem