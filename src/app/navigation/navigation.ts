import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sales',
                title    : 'Sales Module',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'home',
                url      : 'sales',
            },
            {
                id       : 'project',
                title    : 'Project Module',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : 'project',
                /*badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }*/
            },
            {
                id       : 'payment',
                title    : 'Payment',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'attach_money',
                url      : 'payment',
                /*badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }*/
            },
            
        ]
    }
];
