import React from 'react'

type BaseTableSkeletonProps = {
    column: any[],
    quantity: number;
}

function BaseTableSkeleton({ column, quantity }: BaseTableSkeletonProps) {
    return (
        <div>BaseTableSkeleton</div>
    )
}

export default BaseTableSkeleton