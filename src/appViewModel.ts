export interface JobItem {
    title: string,
    referenceId: string,
    stops: JobStop[],
}

export interface JobStop {
    type: 'PICKUP' | 'DROPOFF',
    address: string,
    cargoDescription?: string,
    arrivalTime: string
}

export type JobItems = JobItem[]


export class AppViewModel {
    jobs: JobItems

    subscribe(fn: Function) {

    }
}