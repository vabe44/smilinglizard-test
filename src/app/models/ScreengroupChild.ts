import { Screengroup } from './Screengroup';

export interface ScreengroupChild {
    parent: {
        id: number;
        name: string;
        lft: number;
        rgt: number;
        lvl: number;
        children: {};
        root: number;
        parent: any;
        userGroup: number;
    };
    children: Screengroup[];
}
