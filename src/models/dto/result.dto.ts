export class Result<T> {
    constructor(public status: RStatus, public data: T) {}
}

export class RStatus {
    public code!: string;
    public description!: string;
}