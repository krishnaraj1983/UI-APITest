export type RootObj = Root[]

export interface Band {
    name: string;
    recordLabel?: string;
}

export interface Root {
    name?: string;
    bands: Band[];
}