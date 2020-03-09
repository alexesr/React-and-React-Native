interface post{
    userId: number;
    id: number;
    title: string;
    body: string;
    author: string;
}

export const initial:post = {userId:-1,id:-1,title:'',body:'',author:''}

export default post;