export class Marble {
    private id: number;

    constructor(id: number) {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }
}