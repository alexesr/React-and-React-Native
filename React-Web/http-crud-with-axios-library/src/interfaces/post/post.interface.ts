interface post{
    userId: number;
    id: string;
    title: string;
    body: string;
    author: string;
}

export const initial:post = {userId:-1,id:'',title:'',body:'',author:''}

export default post;