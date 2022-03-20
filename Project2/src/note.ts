
export class note {
    id: number;
    title: string;
    content: string;

    constructor(title: string, content: string, id: number)
    {
        this.id = id;
        this.title = title;
        this.content = content;
    }

}