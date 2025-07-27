"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { formUrlQuery } from '@/lib/utils';

type Props = {
    currentPage: number;
   // totalPages: number;
}

export default function PaginationComp({ currentPage}: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handlePageChange = (pageNumber: number) => {
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'page',
            value: String(pageNumber),
        });

        router.push(newUrl, { scroll: false });
    };
    return (
        <Pagination className='my-2'>
            <PaginationContent>
                <PaginationItem>
                    {currentPage > 1 && (
                        <PaginationPrevious
                            href="#"
                            onClickCapture={() => handlePageChange(currentPage - 1)}
                        />
                    )}
                </PaginationItem>
                

                <PaginationItem>
                    {currentPage && (
                        <PaginationNext
                            href="#"
                            onClickCapture={() => handlePageChange(currentPage + 1)}
                        />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}