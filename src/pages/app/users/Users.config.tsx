import Link from 'next/link'
import React from 'react';
import {ROUTER} from '@/constants'

export const BreakcrumbUsers = [
    {
        title: <Link href="/">Home</Link>,
    },
    {
        title: <Link href={ROUTER.USERS}>Users</Link>,
    },

]