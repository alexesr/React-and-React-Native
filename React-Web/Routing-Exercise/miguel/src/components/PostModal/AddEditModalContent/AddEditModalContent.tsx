import React, { FormEventHandler} from 'react';

import Input from '../../UI/Input/Input';
import classes from './AddEditModalContent.module.css';

interface IProps{
    title: string;
    description: string;
    titleHandler: FormEventHandler<HTMLElement>;
    descriptionHandler: FormEventHandler<HTMLElement>;
}

const AddEditModalContent = (props: IProps) =>
    <div className={classes.AddEditModalContent}>
        <Input placeholder="Title" value={props.title} onChange={props.titleHandler}></Input>
        <br/>
        <textarea placeholder="Description" value={props.description} rows={5} onChange={props.descriptionHandler}></textarea>
    </div>

export default AddEditModalContent;